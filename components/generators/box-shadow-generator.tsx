"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { ColorPicker } from "@/components/color-picker"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function BoxShadowGenerator() {
  const [horizontalOffset, setHorizontalOffset] = useState(5)
  const [verticalOffset, setVerticalOffset] = useState(5)
  const [blur, setBlur] = useState(10)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState("rgba(0, 0, 0, 0.2)")
  const [inset, setInset] = useState(false)

  const getBoxShadowCSS = () => {
    return `box-shadow: ${inset ? "inset " : ""}${horizontalOffset}px ${verticalOffset}px ${blur}px ${spread}px ${color};`
  }

  return (
    <ToolContainer title="Box Shadow Generator" description="Create and customize CSS box shadows">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label>Horizontal Offset: {horizontalOffset}px</Label>
            <Slider
              value={[horizontalOffset]}
              min={-50}
              max={50}
              step={1}
              onValueChange={(value) => setHorizontalOffset(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Vertical Offset: {verticalOffset}px</Label>
            <Slider
              value={[verticalOffset]}
              min={-50}
              max={50}
              step={1}
              onValueChange={(value) => setVerticalOffset(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Blur Radius: {blur}px</Label>
            <Slider value={[blur]} min={0} max={100} step={1} onValueChange={(value) => setBlur(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Spread Radius: {spread}px</Label>
            <Slider value={[spread]} min={-50} max={50} step={1} onValueChange={(value) => setSpread(value[0])} />
          </div>

          <ColorPicker label="Shadow Color" value={color} onChange={setColor} />

          <div className="flex items-center space-x-2">
            <Switch id="inset" checked={inset} onCheckedChange={setInset} />
            <Label htmlFor="inset">Inset Shadow</Label>
          </div>

          <CodeBlock code={getBoxShadowCSS()} />
        </div>

        <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4">
          <div
            className="h-32 w-32 rounded-md bg-white dark:bg-gray-800"
            style={{ boxShadow: getBoxShadowCSS().split("box-shadow: ")[1].slice(0, -1) }}
          ></div>
        </div>
      </div>
    </ToolContainer>
  )
}

