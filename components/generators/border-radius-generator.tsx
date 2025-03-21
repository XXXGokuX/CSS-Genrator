"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function BorderRadiusGenerator() {
  const [topLeft, setTopLeft] = useState(10)
  const [topRight, setTopRight] = useState(10)
  const [bottomRight, setBottomRight] = useState(10)
  const [bottomLeft, setBottomLeft] = useState(10)
  const [linkCorners, setLinkCorners] = useState(true)

  const updateAllCorners = (value: number) => {
    setTopLeft(value)
    setTopRight(value)
    setBottomRight(value)
    setBottomLeft(value)
  }

  const getBorderRadiusCSS = () => {
    if (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft) {
      return `border-radius: ${topLeft}px;`
    }
    return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`
  }

  return (
    <ToolContainer title="Border Radius Generator" description="Create and customize CSS border radius">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-center space-x-2">
            <Switch id="link-corners" checked={linkCorners} onCheckedChange={setLinkCorners} />
            <Label htmlFor="link-corners">Link All Corners</Label>
          </div>

          {linkCorners ? (
            <div className="space-y-2">
              <Label>All Corners: {topLeft}px</Label>
              <Slider
                value={[topLeft]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => updateAllCorners(value[0])}
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Top Left: {topLeft}px</Label>
                <Slider value={[topLeft]} min={0} max={100} step={1} onValueChange={(value) => setTopLeft(value[0])} />
              </div>

              <div className="space-y-2">
                <Label>Top Right: {topRight}px</Label>
                <Slider
                  value={[topRight]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setTopRight(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Bottom Right: {bottomRight}px</Label>
                <Slider
                  value={[bottomRight]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setBottomRight(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Bottom Left: {bottomLeft}px</Label>
                <Slider
                  value={[bottomLeft]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setBottomLeft(value[0])}
                />
              </div>
            </>
          )}

          <CodeBlock code={getBorderRadiusCSS()} />
        </div>

        <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4">
          <div
            className="h-64 w-64 bg-primary"
            style={{ borderRadius: getBorderRadiusCSS().split("border-radius: ")[1].slice(0, -1) }}
          ></div>
        </div>
      </div>
    </ToolContainer>
  )
}

