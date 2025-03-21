"use client"

import { useState, useEffect } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/color-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"

export function WaveGenerator() {
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(800)
  const [waves, setWaves] = useState(3)
  const [amplitude, setAmplitude] = useState(40)
  const [color, setColor] = useState("#3b82f6")
  const [direction, setDirection] = useState<"top" | "bottom">("bottom")
  const [svgPath, setSvgPath] = useState("")

  const generateWave = () => {
    const points = []
    const segment = width / waves

    // Start point
    points.push(`M0,${direction === "bottom" ? height : 0}`)

    // Create wave points
    for (let i = 0; i <= waves; i++) {
      const x1 = i * segment - segment / 4
      const y1 =
        direction === "bottom" ? height - amplitude * (i % 2 === 0 ? 1 : 0.5) : amplitude * (i % 2 === 0 ? 1 : 0.5)

      const x2 = i * segment + segment / 4
      const y2 =
        direction === "bottom" ? height - amplitude * (i % 2 === 0 ? 0.5 : 1) : amplitude * (i % 2 === 0 ? 0.5 : 1)

      const x = i * segment

      if (i === 0) {
        points.push(`C${x1},${y1} ${x2},${y2} ${x},${direction === "bottom" ? height - amplitude : amplitude}`)
      } else {
        points.push(
          `S${x2},${y2} ${x},${
            i % 2 === 0
              ? direction === "bottom"
                ? height - amplitude
                : amplitude
              : direction === "bottom"
                ? height - amplitude / 2
                : amplitude / 2
          }`,
        )
      }
    }

    // End point
    points.push(`L${width},${direction === "bottom" ? height : 0}`)

    // Close path
    if (direction === "bottom") {
      points.push(`L${width},${height}`)
      points.push(`L0,${height}`)
    } else {
      points.push(`L${width},0`)
      points.push(`L0,0`)
    }

    points.push("Z")

    setSvgPath(points.join(" "))
  }

  useEffect(() => {
    generateWave()
  }, [height, width, waves, amplitude, direction])

  const getSVGCode = () => {
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <path d="${svgPath}" fill="${color}" />
</svg>`
  }

  const getCSSCode = () => {
    return `.wave-container {
  position: relative;
  height: ${height}px;
  width: 100%;
  overflow: hidden;
}

.wave {
  position: absolute;
  ${direction}: 0;
  left: 0;
  width: 100%;
  height: ${height}px;
  background-image: url("data:image/svg+xml,${encodeURIComponent(`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath}" fill="${color}" /></svg>`)}");
  background-size: ${width}px ${height}px;
  background-repeat: repeat-x;
}`
  }

  const downloadSVG = () => {
    const svgContent = getSVGCode()
    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "wave.svg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolContainer title="Wave Generator" description="Create SVG waves for UI design">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <ColorPicker label="Wave Color" value={color} onChange={setColor} />

          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select value={direction} onValueChange={(value) => setDirection(value as "top" | "bottom")}>
              <SelectTrigger id="direction">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Width: {width}px</Label>
            <Slider value={[width]} min={400} max={1200} step={50} onValueChange={(value) => setWidth(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Height: {height}px</Label>
            <Slider value={[height]} min={50} max={300} step={10} onValueChange={(value) => setHeight(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Waves: {waves}</Label>
            <Slider value={[waves]} min={1} max={10} step={1} onValueChange={(value) => setWaves(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Amplitude: {amplitude}px</Label>
            <Slider value={[amplitude]} min={10} max={100} step={5} onValueChange={(value) => setAmplitude(value[0])} />
          </div>

          <div className="flex gap-4">
            <Button onClick={generateWave} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
            <Button onClick={downloadSVG} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download SVG
            </Button>
          </div>

          <Tabs defaultValue="svg">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="svg">SVG</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="svg">
              <CodeBlock code={getSVGCode()} language="html" />
            </TabsContent>
            <TabsContent value="css">
              <CodeBlock code={getCSSCode()} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4">
          <div className="w-full overflow-hidden">
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
              <path d={svgPath} fill={color} />
            </svg>
          </div>
        </div>
      </div>
    </ToolContainer>
  )
}

