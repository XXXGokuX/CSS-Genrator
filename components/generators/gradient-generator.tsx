"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { ColorPicker } from "@/components/color-picker"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export function GradientGenerator() {
  const [gradientType, setGradientType] = useState<"linear" | "radial" | "conic">("linear")
  const [color1, setColor1] = useState("#3b82f6")
  const [color2, setColor2] = useState("#ef4444")
  const [angle, setAngle] = useState(90)
  const [position, setPosition] = useState("center")

  const getGradientCSS = () => {
    if (gradientType === "linear") {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`
    } else if (gradientType === "radial") {
      return `background: radial-gradient(circle at ${position}, ${color1}, ${color2});`
    } else {
      return `background: conic-gradient(from ${angle}deg at ${position}, ${color1}, ${color2});`
    }
  }

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
          </Tabs>

          <div className="grid gap-6 sm:grid-cols-2">
            <ColorPicker label="Color 1" value={color1} onChange={setColor1} />
            <ColorPicker label="Color 2" value={color2} onChange={setColor2} />
          </div>

          {gradientType !== "radial" && (
            <div className="space-y-2">
              <Label>Angle: {angle}°</Label>
              <Slider value={[angle]} min={0} max={360} step={1} onValueChange={(value) => setAngle(value[0])} />
            </div>
          )}

          {gradientType !== "linear" && (
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="center"
              />
            </div>
          )}

          <CodeBlock code={getGradientCSS()} />
        </div>

        <div
          className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4"
          style={{ background: getGradientCSS().split("background: ")[1].slice(0, -1) }}
        >
          <div className="rounded-md bg-background/20 p-4 backdrop-blur-sm">
            <p className="text-center font-medium">Preview</p>
          </div>
        </div>
      </div>
    </ToolContainer>
  )
}

