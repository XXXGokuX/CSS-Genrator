"use client"

import { useState, useEffect } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/color-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw } from "lucide-react"

export function BlobGenerator() {
  const [complexity, setComplexity] = useState(5)
  const [contrast, setContrast] = useState(50)
  const [size, setSize] = useState(300)
  const [color, setColor] = useState("#8b5cf6")
  const [svgPath, setSvgPath] = useState("")

  const generateBlob = () => {
    const numPoints = complexity
    const angleStep = (Math.PI * 2) / numPoints
    const contrastFactor = contrast / 100

    let path = "M"

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep
      const radius = (size / 2) * (1 - contrastFactor + Math.random() * contrastFactor * 2)
      const x = size / 2 + radius * Math.cos(angle)
      const y = size / 2 + radius * Math.sin(angle)

      if (i === 0) {
        path += `${x},${y}`
      } else {
        const controlX1 = size / 2 + radius * 1.2 * Math.cos(angle - angleStep / 3)
        const controlY1 = size / 2 + radius * 1.2 * Math.sin(angle - angleStep / 3)
        const controlX2 = size / 2 + radius * 1.2 * Math.cos(angle - (angleStep * 2) / 3)
        const controlY2 = size / 2 + radius * 1.2 * Math.sin(angle - (angleStep * 2) / 3)

        path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
      }
    }

    path += " Z"
    setSvgPath(path)
  }

  useEffect(() => {
    generateBlob()
  }, [complexity, contrast, size])

  const getSVGCode = () => {
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <path d="${svgPath}" fill="${color}" />
</svg>`
  }

  const getCSSCode = () => {
    return `.blob {
  width: ${size}px;
  height: ${size}px;
  background: ${color};
  clip-path: path('${svgPath}');
}`
  }

  const downloadSVG = () => {
    const svgContent = getSVGCode()
    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "blob.svg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ToolContainer title="Blob Shape Generator" description="Create organic blob shapes for your designs">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <ColorPicker label="Blob Color" value={color} onChange={setColor} />

          <div className="space-y-2">
            <Label>Complexity: {complexity}</Label>
            <Slider value={[complexity]} min={3} max={12} step={1} onValueChange={(value) => setComplexity(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Contrast: {contrast}%</Label>
            <Slider value={[contrast]} min={0} max={100} step={1} onValueChange={(value) => setContrast(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Size: {size}px</Label>
            <Slider value={[size]} min={100} max={500} step={10} onValueChange={(value) => setSize(value[0])} />
          </div>

          <div className="flex gap-4">
            <Button onClick={generateBlob} variant="outline" className="gap-2">
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
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
            <path d={svgPath} fill={color} />
          </svg>
        </div>
      </div>
    </ToolContainer>
  )
}

