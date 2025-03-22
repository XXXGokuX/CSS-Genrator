"use client"

import { useState, useEffect } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { ColorPicker } from "@/components/color-picker"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Plus, Maximize2, Image, Palette } from "lucide-react"
import { type ColorStop, ColorStopComponent, ColorStopSlider } from "@/components/color-stop"
import { GradientGallery } from "@/components/gradient-gallery"
import { v4 as uuidv4 } from "uuid"

export function GradientGenerator() {
  const [gradientType, setGradientType] = useState<"linear" | "radial" | "conic">("linear")
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: uuidv4(), color: "#3b82f6", position: 0 },
    { id: uuidv4(), color: "#ef4444", position: 100 },
  ])
  const [selectedColorStop, setSelectedColorStop] = useState<string | null>(null)
  const [angle, setAngle] = useState(90)
  const [position, setPosition] = useState("center")
  const [customPosition, setCustomPosition] = useState({ x: 50, y: 50 })
  const [shape, setShape] = useState<"circle" | "ellipse">("circle")
  const [backgroundType, setBackgroundType] = useState<"color" | "image">("color")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [backgroundImage, setBackgroundImage] = useState("/placeholder.svg?height=400&width=600")
  const [showVendorPrefixes, setShowVendorPrefixes] = useState(true)
  const [copied, setCopied] = useState(false)
  const [fullscreenPreview, setFullscreenPreview] = useState(false)

  // Preset angles for linear gradient
  const presetAngles = [0, 45, 90, 135, 180, 225, 270, 315]

  // Preset positions for radial and conic gradients
  const presetPositions = [
    { label: "Center", value: "center" },
    { label: "Top Left", value: "top left" },
    { label: "Top", value: "top" },
    { label: "Top Right", value: "top right" },
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Bottom Left", value: "bottom left" },
    { label: "Bottom", value: "bottom" },
    { label: "Bottom Right", value: "bottom right" },
    { label: "Custom", value: "custom" },
  ]

  // Update selected color stop when color stops change
  useEffect(() => {
    if (colorStops.length > 0 && !selectedColorStop) {
      setSelectedColorStop(colorStops[0].id)
    }

    if (selectedColorStop && !colorStops.some((stop) => stop.id === selectedColorStop)) {
      setSelectedColorStop(colorStops[0]?.id || null)
    }
  }, [colorStops, selectedColorStop])

  const handleColorStopChange = (id: string, color: string, position: number) => {
    setColorStops(colorStops.map((stop) => (stop.id === id ? { ...stop, color, position } : stop)))
  }

  const handleSliderPositionChange = (id: string, position: number) => {
    setColorStops(colorStops.map((stop) => (stop.id === id ? { ...stop, position } : stop)))
  }

  const addColorStop = () => {
    // Find a position between existing stops
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position)
    let newPosition = 50

    if (sortedStops.length >= 2) {
      // Find the largest gap between stops
      let maxGap = 0
      let gapPosition = 50

      for (let i = 0; i < sortedStops.length - 1; i++) {
        const gap = sortedStops[i + 1].position - sortedStops[i].position
        if (gap > maxGap) {
          maxGap = gap
          gapPosition = sortedStops[i].position + gap / 2
        }
      }

      newPosition = gapPosition
    }

    const newStop = {
      id: uuidv4(),
      color: "#4ade80", // Default to a green color
      position: newPosition,
    }

    setColorStops([...colorStops, newStop])
    setSelectedColorStop(newStop.id)
  }

  const removeColorStop = (id: string) => {
    if (colorStops.length <= 2) return // Keep at least 2 color stops
    setColorStops(colorStops.filter((stop) => stop.id !== id))
  }

  const getGradientCSS = () => {
    // Sort color stops by position
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position)
    const colorStopsString = sortedStops.map((stop) => `${stop.color} ${stop.position}%`).join(", ")

    let gradientString = ""

    if (gradientType === "linear") {
      gradientString = `linear-gradient(${angle}deg, ${colorStopsString})`
    } else if (gradientType === "radial") {
      const positionString = position === "custom" ? `at ${customPosition.x}% ${customPosition.y}%` : `at ${position}`
      gradientString = `radial-gradient(${shape} ${positionString}, ${colorStopsString})`
    } else {
      const positionString = position === "custom" ? `at ${customPosition.x}% ${customPosition.y}%` : `at ${position}`
      gradientString = `conic-gradient(from ${angle}deg ${positionString}, ${colorStopsString})`
    }

    let css = `background: ${gradientString};`

    if (showVendorPrefixes) {
      if (gradientType === "linear") {
        css =
          `background: -webkit-linear-gradient(${90 - angle}deg, ${colorStopsString});\n` +
          `background: -moz-linear-gradient(${90 - angle}deg, ${colorStopsString});\n` +
          `background: -o-linear-gradient(${90 - angle}deg, ${colorStopsString});\n` +
          `${css}`
      } else if (gradientType === "radial") {
        const positionString = position === "custom" ? `at ${customPosition.x}% ${customPosition.y}%` : `at ${position}`
        css =
          `background: -webkit-radial-gradient(${positionString}, ${shape}, ${colorStopsString});\n` +
          `background: -moz-radial-gradient(${positionString}, ${shape}, ${colorStopsString});\n` +
          `${css}`
      }
      // Note: Conic gradients don't have widespread vendor prefix support
    }

    return css
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(getGradientCSS())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getColorValues = (color: string) => {
    // Convert hex to RGB
    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    // Convert RGB to HSL
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255

    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    const delta = max - min

    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)

      if (max === rNorm) {
        h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)
      } else if (max === gNorm) {
        h = (bNorm - rNorm) / delta + 2
      } else {
        h = (rNorm - gNorm) / delta + 4
      }

      h *= 60
    }

    return {
      hex: color,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
    }
  }

  const selectedStop = colorStops.find((stop) => stop.id === selectedColorStop)
  const colorValues = selectedStop ? getColorValues(selectedStop.color) : null

  return (
    <ToolContainer title="Gradient Generator" description="Create beautiful CSS gradients for your website">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="linear" onValueChange={(value) => setGradientType(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="linear">Linear</TabsTrigger>
              <TabsTrigger value="radial">Radial</TabsTrigger>
              <TabsTrigger value="conic">Conic</TabsTrigger>
            </TabsList>

            <TabsContent value="linear" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Angle: {angle}°</Label>
                <Slider value={[angle]} min={0} max={360} step={1} onValueChange={(value) => setAngle(value[0])} />

                <div className="flex flex-wrap gap-2 mt-2">
                  {presetAngles.map((presetAngle) => (
                    <Button
                      key={presetAngle}
                      variant={angle === presetAngle ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAngle(presetAngle)}
                    >
                      {presetAngle}°
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="radial" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="shape">Shape</Label>
                <Select value={shape} onValueChange={(value) => setShape(value as "circle" | "ellipse")}>
                  <SelectTrigger id="shape">
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="ellipse">Ellipse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {presetPositions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {position === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>X Position: {customPosition.x}%</Label>
                    <Slider
                      value={[customPosition.x]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setCustomPosition({ ...customPosition, x: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Position: {customPosition.y}%</Label>
                    <Slider
                      value={[customPosition.y]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setCustomPosition({ ...customPosition, y: value[0] })}
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="conic" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Start Angle: {angle}°</Label>
                <Slider value={[angle]} min={0} max={360} step={1} onValueChange={(value) => setAngle(value[0])} />

                <div className="flex flex-wrap gap-2 mt-2">
                  {presetAngles.map((presetAngle) => (
                    <Button
                      key={presetAngle}
                      variant={angle === presetAngle ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAngle(presetAngle)}
                    >
                      {presetAngle}°
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {presetPositions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {position === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>X Position: {customPosition.x}%</Label>
                    <Slider
                      value={[customPosition.x]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setCustomPosition({ ...customPosition, x: value[0] })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Position: {customPosition.y}%</Label>
                    <Slider
                      value={[customPosition.y]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setCustomPosition({ ...customPosition, y: value[0] })}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Color Stops</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addColorStop}
                className="gap-1"
                disabled={colorStops.length >= 10}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Color
              </Button>
            </div>

            <ColorStopSlider
              colorStops={colorStops}
              onChange={handleSliderPositionChange}
              onSelect={setSelectedColorStop}
              selectedId={selectedColorStop}
            />

            {selectedStop && (
              <div className="space-y-4 p-4 border rounded-md">
                <ColorStopComponent
                  colorStop={selectedStop}
                  onChange={handleColorStopChange}
                  onRemove={removeColorStop}
                  canRemove={colorStops.length > 2}
                />

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="space-y-1">
                    <Label className="text-xs">HEX</Label>
                    <div className="flex">
                      <Input value={colorValues?.hex || ""} readOnly className="text-xs font-mono" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2"
                        onClick={() => navigator.clipboard.writeText(colorValues?.hex || "")}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">RGB</Label>
                    <div className="flex">
                      <Input value={colorValues?.rgb || ""} readOnly className="text-xs font-mono" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2"
                        onClick={() => navigator.clipboard.writeText(colorValues?.rgb || "")}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">HSL</Label>
                    <div className="flex">
                      <Input value={colorValues?.hsl || ""} readOnly className="text-xs font-mono" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2"
                        onClick={() => navigator.clipboard.writeText(colorValues?.hsl || "")}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Background</Label>
            <Tabs defaultValue="color" onValueChange={(value) => setBackgroundType(value as "color" | "image")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="color" className="gap-2">
                  <Palette className="h-4 w-4" />
                  Color
                </TabsTrigger>
                <TabsTrigger value="image" className="gap-2">
                  <Image className="h-4 w-4" />
                  Image
                </TabsTrigger>
              </TabsList>

              <TabsContent value="color" className="pt-4">
                <ColorPicker label="Background Color" value={backgroundColor} onChange={setBackgroundColor} />
              </TabsContent>

              <TabsContent value="image" className="pt-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="h-16 w-full p-0 overflow-hidden"
                    onClick={() => setBackgroundImage("/placeholder.svg?height=400&width=600")}
                  >
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Background 1"
                      className="h-full w-full object-cover"
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 w-full p-0 overflow-hidden"
                    onClick={() => setBackgroundImage("/sample-landscape.jpg")}
                  >
                    <img src="/sample-landscape.jpg" alt="Background 2" className="h-full w-full object-cover" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 w-full p-0 overflow-hidden"
                    onClick={() => setBackgroundImage("/sample-portrait.jpg")}
                  >
                    <img src="/sample-portrait.jpg" alt="Background 3" className="h-full w-full object-cover" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="vendor-prefixes" checked={showVendorPrefixes} onCheckedChange={setShowVendorPrefixes} />
            <Label htmlFor="vendor-prefixes">Include vendor prefixes</Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={copyCSS} variant="outline" className="gap-2 flex-1">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy CSS
                </>
              )}
            </Button>
            <Dialog open={fullscreenPreview} onOpenChange={setFullscreenPreview}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Maximize2 className="h-4 w-4" />
                  Fullscreen
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-screen-lg w-[90vw] h-[80vh] p-0">
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      backgroundType === "image" ? `url(${backgroundImage}) center/cover no-repeat` : backgroundColor,
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{ background: getGradientCSS().split("background: ")[1].split(";")[0] }}
                  ></div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <CodeBlock code={getGradientCSS()} />
        </div>

        <div className="flex h-full min-h-[300px] flex-col gap-4">
          <div
            className="flex-1 rounded-lg border overflow-hidden"
            style={{
              background:
                backgroundType === "image" ? `url(${backgroundImage}) center/cover no-repeat` : backgroundColor,
            }}
          >
            <div
              className="h-full w-full flex items-center justify-center"
              style={{ background: getGradientCSS().split("background: ")[1].split(";")[0] }}
            >
              <div className="rounded-md bg-background/20 p-4 backdrop-blur-sm">
                <p className="text-center font-medium">Preview</p>
              </div>
            </div>
          </div>

          <GradientGallery />
        </div>
      </div>
    </ToolContainer>
  )
}

