"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { ColorPicker } from "@/components/color-picker"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function TextShadowGenerator() {
  const [horizontalOffset, setHorizontalOffset] = useState(2)
  const [verticalOffset, setVerticalOffset] = useState(2)
  const [blur, setBlur] = useState(3)
  const [color, setColor] = useState("rgba(0, 0, 0, 0.5)")
  const [previewText, setPreviewText] = useState("Text Shadow")
  const [fontSize, setFontSize] = useState(36)

  const getTextShadowCSS = () => {
    return `text-shadow: ${horizontalOffset}px ${verticalOffset}px ${blur}px ${color};`
  }

  return (
    <ToolContainer title="Text Shadow Generator" description="Create and customize CSS text shadows">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="preview-text">Preview Text</Label>
            <Input id="preview-text" value={previewText} onChange={(e) => setPreviewText(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Font Size: {fontSize}px</Label>
            <Slider value={[fontSize]} min={12} max={72} step={1} onValueChange={(value) => setFontSize(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Horizontal Offset: {horizontalOffset}px</Label>
            <Slider
              value={[horizontalOffset]}
              min={-20}
              max={20}
              step={1}
              onValueChange={(value) => setHorizontalOffset(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Vertical Offset: {verticalOffset}px</Label>
            <Slider
              value={[verticalOffset]}
              min={-20}
              max={20}
              step={1}
              onValueChange={(value) => setVerticalOffset(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Blur Radius: {blur}px</Label>
            <Slider value={[blur]} min={0} max={20} step={1} onValueChange={(value) => setBlur(value[0])} />
          </div>

          <ColorPicker label="Shadow Color" value={color} onChange={setColor} />

          <CodeBlock code={getTextShadowCSS()} />
        </div>

        <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4">
          <p
            className="text-center font-bold"
            style={{
              fontSize: `${fontSize}px`,
              textShadow: getTextShadowCSS().split("text-shadow: ")[1].slice(0, -1),
            }}
          >
            {previewText}
          </p>
        </div>
      </div>
    </ToolContainer>
  )
}

