"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function ClipPathGenerator() {
  const [shape, setShape] = useState<"circle" | "ellipse" | "polygon" | "inset">("circle")
  const [circleRadius, setCircleRadius] = useState(50)
  const [ellipseRadiusX, setEllipseRadiusX] = useState(50)
  const [ellipseRadiusY, setEllipseRadiusY] = useState(25)
  const [insetTop, setInsetTop] = useState(10)
  const [insetRight, setInsetRight] = useState(10)
  const [insetBottom, setInsetBottom] = useState(10)
  const [insetLeft, setInsetLeft] = useState(10)
  const [insetRadius, setInsetRadius] = useState(0)
  const [polygonPoints, setPolygonPoints] = useState("50% 0%, 100% 50%, 50% 100%, 0% 50%")

  const getClipPathCSS = () => {
    let clipPath = ""

    switch (shape) {
      case "circle":
        clipPath = `circle(${circleRadius}% at 50% 50%)`
        break
      case "ellipse":
        clipPath = `ellipse(${ellipseRadiusX}% ${ellipseRadiusY}% at 50% 50%)`
        break
      case "inset":
        clipPath = `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}%${
          insetRadius > 0 ? ` round ${insetRadius}px` : ""
        })`
        break
      case "polygon":
        clipPath = `polygon(${polygonPoints})`
        break
    }

    return `clip-path: ${clipPath};
-webkit-clip-path: ${clipPath};`
  }

  return (
    <ToolContainer title="Clip Path Generator" description="Create CSS clip-path shapes for your elements">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="circle" onValueChange={(value) => setShape(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="circle">Circle</TabsTrigger>
              <TabsTrigger value="ellipse">Ellipse</TabsTrigger>
              <TabsTrigger value="inset">Inset</TabsTrigger>
              <TabsTrigger value="polygon">Polygon</TabsTrigger>
            </TabsList>

            <TabsContent value="circle" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Radius: {circleRadius}%</Label>
                <Slider
                  value={[circleRadius]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setCircleRadius(value[0])}
                />
              </div>
            </TabsContent>

            <TabsContent value="ellipse" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Radius X: {ellipseRadiusX}%</Label>
                <Slider
                  value={[ellipseRadiusX]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setEllipseRadiusX(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label>Radius Y: {ellipseRadiusY}%</Label>
                <Slider
                  value={[ellipseRadiusY]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setEllipseRadiusY(value[0])}
                />
              </div>
            </TabsContent>

            <TabsContent value="inset" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Top: {insetTop}%</Label>
                <Slider
                  value={[insetTop]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setInsetTop(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label>Right: {insetRight}%</Label>
                <Slider
                  value={[insetRight]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setInsetRight(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label>Bottom: {insetBottom}%</Label>
                <Slider
                  value={[insetBottom]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setInsetBottom(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label>Left: {insetLeft}%</Label>
                <Slider
                  value={[insetLeft]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setInsetLeft(value[0])}
                />
              </div>
              <div className="space-y-2">
                <Label>Border Radius: {insetRadius}px</Label>
                <Slider
                  value={[insetRadius]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={(value) => setInsetRadius(value[0])}
                />
              </div>
            </TabsContent>

            <TabsContent value="polygon" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="polygon-points">Polygon Points</Label>
                <Input
                  id="polygon-points"
                  value={polygonPoints}
                  onChange={(e) => setPolygonPoints(e.target.value)}
                  placeholder="50% 0%, 100% 50%, 50% 100%, 0% 50%"
                />
                <p className="text-xs text-muted-foreground">Format: x1 y1, x2 y2, x3 y3, ...</p>
              </div>
            </TabsContent>
          </Tabs>

          <CodeBlock code={getClipPathCSS()} />
        </div>

        <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4">
          <div
            className="h-64 w-64 bg-primary"
            style={{
              clipPath: getClipPathCSS().split("clip-path: ")[1].split(";")[0],
              WebkitClipPath: getClipPathCSS().split("-webkit-clip-path: ")[1].split(";")[0],
            }}
          ></div>
        </div>
      </div>
    </ToolContainer>
  )
}

