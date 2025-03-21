"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ColorPicker } from "@/components/color-picker"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NeumorphismGenerator() {
  const [size, setSize] = useState(100)
  const [radius, setRadius] = useState(50)
  const [distance, setDistance] = useState(20)
  const [intensity, setIntensity] = useState(0.15)
  const [blur, setBlur] = useState(60)
  const [backgroundColor, setBackgroundColor] = useState("#e0e0e0")
  const [type, setType] = useState<"flat" | "pressed">("flat")

  const getNeumorphismCSS = () => {
    const darkerShadow = getShadowColor(backgroundColor, -intensity)
    const lighterShadow = getShadowColor(backgroundColor, intensity)

    if (type === "flat") {
      return `background: ${backgroundColor};
border-radius: ${radius}px;
box-shadow: ${distance}px ${distance}px ${blur}px ${darkerShadow},
            -${distance}px -${distance}px ${blur}px ${lighterShadow};`
    } else {
      return `background: ${backgroundColor};
border-radius: ${radius}px;
box-shadow: inset ${distance}px ${distance}px ${blur}px ${darkerShadow},
            inset -${distance}px -${distance}px ${blur}px ${lighterShadow};`
    }
  }

  const getShadowColor = (hex: string, intensity: number) => {
    // Convert hex to RGB
    let r = Number.parseInt(hex.slice(1, 3), 16)
    let g = Number.parseInt(hex.slice(3, 5), 16)
    let b = Number.parseInt(hex.slice(5, 7), 16)

    // Adjust the intensity (darken or lighten)
    r = Math.min(255, Math.max(0, r + Math.round(r * intensity)))
    g = Math.min(255, Math.max(0, g + Math.round(g * intensity)))
    b = Math.min(255, Math.max(0, b + Math.round(b * intensity)))

    // Convert back to hex
    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  return (
    <ToolContainer title="Neumorphism Generator" description="Create soft UI neumorphic effects">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="flat" onValueChange={(value) => setType(value as "flat" | "pressed")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="flat">Flat</TabsTrigger>
              <TabsTrigger value="pressed">Pressed</TabsTrigger>
            </TabsList>
          </Tabs>

          <ColorPicker label="Background Color" value={backgroundColor} onChange={setBackgroundColor} />

          <div className="space-y-2">
            <Label>Size: {size}px</Label>
            <Slider value={[size]} min={50} max={300} step={1} onValueChange={(value) => setSize(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Border Radius: {radius}px</Label>
            <Slider value={[radius]} min={0} max={150} step={1} onValueChange={(value) => setRadius(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Distance: {distance}px</Label>
            <Slider value={[distance]} min={5} max={50} step={1} onValueChange={(value) => setDistance(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Intensity: {intensity.toFixed(2)}</Label>
            <Slider
              value={[intensity * 100]}
              min={5}
              max={30}
              step={1}
              onValueChange={(value) => setIntensity(value[0] / 100)}
            />
          </div>

          <div className="space-y-2">
            <Label>Blur: {blur}px</Label>
            <Slider value={[blur]} min={0} max={100} step={1} onValueChange={(value) => setBlur(value[0])} />
          </div>

          <CodeBlock code={getNeumorphismCSS()} />
        </div>

        <div
          className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4"
          style={{ background: backgroundColor }}
        >
          <div
            style={{
              width: `${size}px`,
              height: `${size}px`,
              ...Object.fromEntries(
                getNeumorphismCSS()
                  .split("\n")
                  .map((line) => {
                    const [prop, value] = line.split(": ")
                    return [prop, value?.replace(";", "")]
                  }),
              ),
            }}
          ></div>
        </div>
      </div>
    </ToolContainer>
  )
}

