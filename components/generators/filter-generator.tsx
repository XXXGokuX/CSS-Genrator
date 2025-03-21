"use client"

import type React from "react"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, RefreshCw } from "lucide-react"

export function FilterGenerator() {
  const [blur, setBlur] = useState(0)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [grayscale, setGrayscale] = useState(0)
  const [hueRotate, setHueRotate] = useState(0)
  const [invert, setInvert] = useState(0)
  const [opacity, setOpacity] = useState(100)
  const [saturate, setSaturate] = useState(100)
  const [sepia, setSepia] = useState(0)
  const [dropShadow, setDropShadow] = useState(false)
  const [shadowX, setShadowX] = useState(0)
  const [shadowY, setShadowY] = useState(4)
  const [shadowBlur, setShadowBlur] = useState(4)
  const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.5)")
  const [selectedImage, setSelectedImage] = useState("/sample-image.jpg")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  // Filter presets
  const presets = [
    {
      name: "Normal",
      settings: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0,
        dropShadow: false,
      },
    },
    {
      name: "Vintage",
      settings: {
        blur: 0,
        brightness: 120,
        contrast: 90,
        grayscale: 10,
        hueRotate: 20,
        invert: 0,
        opacity: 100,
        saturate: 85,
        sepia: 30,
        dropShadow: false,
      },
    },
    {
      name: "Grayscale",
      settings: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 100,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0,
        dropShadow: false,
      },
    },
    {
      name: "Dramatic",
      settings: {
        blur: 0,
        brightness: 110,
        contrast: 130,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 140,
        sepia: 0,
        dropShadow: true,
      },
    },
    {
      name: "Blur",
      settings: {
        blur: 5,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0,
        dropShadow: false,
      },
    },
  ]

  const applyPreset = (preset: (typeof presets)[0]) => {
    const { settings } = preset
    setBlur(settings.blur)
    setBrightness(settings.brightness)
    setContrast(settings.contrast)
    setGrayscale(settings.grayscale)
    setHueRotate(settings.hueRotate)
    setInvert(settings.invert)
    setOpacity(settings.opacity)
    setSaturate(settings.saturate)
    setSepia(settings.sepia)
    setDropShadow(settings.dropShadow)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getFilterCSS = () => {
    let filter = ""

    if (blur > 0) {
      filter += `blur(${blur}px) `
    }
    if (brightness !== 100) {
      filter += `brightness(${brightness}%) `
    }
    if (contrast !== 100) {
      filter += `contrast(${contrast}%) `
    }
    if (grayscale > 0) {
      filter += `grayscale(${grayscale}%) `
    }
    if (hueRotate !== 0) {
      filter += `hue-rotate(${hueRotate}deg) `
    }
    if (invert > 0) {
      filter += `invert(${invert}%) `
    }
    if (opacity !== 100) {
      filter += `opacity(${opacity}%) `
    }
    if (saturate !== 100) {
      filter += `saturate(${saturate}%) `
    }
    if (sepia > 0) {
      filter += `sepia(${sepia}%) `
    }
    if (dropShadow) {
      filter += `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}) `
    }

    return `.filtered-image {
  filter: ${filter.trim()};
}`
  }

  const resetFilters = () => {
    applyPreset(presets[0]) // Apply "Normal" preset
  }

  return (
    <ToolContainer title="CSS Filter Generator" description="Create and customize CSS filters for images and elements">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Label>Filter Presets</Label>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset)}
                  className="text-xs"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Image</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedImage("/sample-image.jpg")}
                className={selectedImage === "/sample-image.jpg" && !uploadedImage ? "border-primary" : ""}
              >
                Sample Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedImage("/sample-landscape.jpg")}
                className={selectedImage === "/sample-landscape.jpg" && !uploadedImage ? "border-primary" : ""}
              >
                Landscape
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedImage("/sample-portrait.jpg")}
                className={selectedImage === "/sample-portrait.jpg" && !uploadedImage ? "border-primary" : ""}
              >
                Portrait
              </Button>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-3 w-3" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Blur: {blur}px</Label>
            <Slider value={[blur]} min={0} max={20} step={0.1} onValueChange={(value) => setBlur(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Brightness: {brightness}%</Label>
            <Slider
              value={[brightness]}
              min={0}
              max={200}
              step={1}
              onValueChange={(value) => setBrightness(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Contrast: {contrast}%</Label>
            <Slider value={[contrast]} min={0} max={200} step={1} onValueChange={(value) => setContrast(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Grayscale: {grayscale}%</Label>
            <Slider value={[grayscale]} min={0} max={100} step={1} onValueChange={(value) => setGrayscale(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Hue Rotate: {hueRotate}°</Label>
            <Slider value={[hueRotate]} min={0} max={360} step={1} onValueChange={(value) => setHueRotate(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Invert: {invert}%</Label>
            <Slider value={[invert]} min={0} max={100} step={1} onValueChange={(value) => setInvert(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Opacity: {opacity}%</Label>
            <Slider value={[opacity]} min={0} max={100} step={1} onValueChange={(value) => setOpacity(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Saturate: {saturate}%</Label>
            <Slider value={[saturate]} min={0} max={200} step={1} onValueChange={(value) => setSaturate(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Sepia: {sepia}%</Label>
            <Slider value={[sepia]} min={0} max={100} step={1} onValueChange={(value) => setSepia(value[0])} />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="drop-shadow" checked={dropShadow} onCheckedChange={setDropShadow} />
            <Label htmlFor="drop-shadow">Drop Shadow</Label>
          </div>

          {dropShadow && (
            <>
              <div className="space-y-2">
                <Label>Shadow X: {shadowX}px</Label>
                <Slider value={[shadowX]} min={-20} max={20} step={1} onValueChange={(value) => setShadowX(value[0])} />
              </div>

              <div className="space-y-2">
                <Label>Shadow Y: {shadowY}px</Label>
                <Slider value={[shadowY]} min={-20} max={20} step={1} onValueChange={(value) => setShadowY(value[0])} />
              </div>

              <div className="space-y-2">
                <Label>Shadow Blur: {shadowBlur}px</Label>
                <Slider
                  value={[shadowBlur]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(value) => setShadowBlur(value[0])}
                />
              </div>
            </>
          )}

          <Button onClick={resetFilters} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset Filters
          </Button>

          <CodeBlock code={getFilterCSS()} />
        </div>

        <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={uploadedImage || selectedImage}
              alt="Filter preview"
              className="max-w-full max-h-full rounded-md object-contain"
              style={{
                filter: getFilterCSS().split("filter: ")[1].split(";")[0],
              }}
            />
            <div className="absolute bottom-2 right-2 bg-background/80 text-xs px-2 py-1 rounded">Filtered Image</div>
          </div>
        </div>
      </div>
    </ToolContainer>
  )
}

