"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "@/components/color-picker"

export function GlassmorphismGenerator() {
  const [blur, setBlur] = useState(10)
  const [transparency, setTransparency] = useState(0.2)
  const [borderOpacity, setBorderOpacity] = useState(0.3)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  const getGlassmorphismCSS = () => {
    const rgba = hexToRgba(backgroundColor, transparency)
    const borderColor = hexToRgba(backgroundColor, borderOpacity)

    return `background: ${rgba};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid ${borderColor};`
  }

  const hexToRgba = (hex: string, alpha: number) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <ToolContainer title="Glassmorphism Generator" description="Create modern glassmorphism UI effects">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <ColorPicker label="Background Color" value={backgroundColor} onChange={setBackgroundColor} />

          <div className="space-y-2">
            <Label>Transparency: {transparency.toFixed(2)}</Label>
            <Slider
              value={[transparency * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setTransparency(value[0] / 100)}
            />
          </div>

          <div className="space-y-2">
            <Label>Blur: {blur}px</Label>
            <Slider value={[blur]} min={0} max={30} step={1} onValueChange={(value) => setBlur(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Border Opacity: {borderOpacity.toFixed(2)}</Label>
            <Slider
              value={[borderOpacity * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setBorderOpacity(value[0] / 100)}
            />
          </div>

          <CodeBlock code={getGlassmorphismCSS()} />
        </div>

        <div
          className="flex h-full min-h-[300px] items-center justify-center rounded-lg p-4"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="h-48 w-64 rounded-xl p-6"
            style={{
              background: hexToRgba(backgroundColor, transparency),
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid ${hexToRgba(backgroundColor, borderOpacity)}`,
            }}
          >
            <h3 className="mb-2 text-lg font-medium">Glassmorphism</h3>
            <p className="text-sm opacity-80">
              This is a preview of the glassmorphism effect with your current settings.
            </p>
          </div>
        </div>
      </div>
    </ToolContainer>
  )
}

