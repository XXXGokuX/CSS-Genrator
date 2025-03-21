"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export function TransformGenerator() {
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [rotate, setRotate] = useState(0)
  const [scaleX, setScaleX] = useState(1)
  const [scaleY, setScaleY] = useState(1)
  const [skewX, setSkewX] = useState(0)
  const [skewY, setSkewY] = useState(0)
  const [perspective, setPerspective] = useState(0)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [rotateZ, setRotateZ] = useState(0)
  const [transformOrigin, setTransformOrigin] = useState("center")
  const [is3D, setIs3D] = useState(false)

  const getTransformCSS = () => {
    let transform = ""

    if (is3D) {
      if (perspective > 0) {
        transform += `perspective(${perspective}px) `
      }
      if (rotateX !== 0) {
        transform += `rotateX(${rotateX}deg) `
      }
      if (rotateY !== 0) {
        transform += `rotateY(${rotateY}deg) `
      }
      if (rotateZ !== 0) {
        transform += `rotateZ(${rotateZ}deg) `
      }
    } else {
      if (rotate !== 0) {
        transform += `rotate(${rotate}deg) `
      }
    }

    if (translateX !== 0 || translateY !== 0) {
      transform += `translate(${translateX}px, ${translateY}px) `
    }

    if (scaleX !== 1 || scaleY !== 1) {
      transform += `scale(${scaleX}, ${scaleY}) `
    }

    if (skewX !== 0 || skewY !== 0) {
      transform += `skew(${skewX}deg, ${skewY}deg) `
    }

    return `.element {
  transform: ${transform.trim()};
  transform-origin: ${transformOrigin};
}`
  }

  return (
    <ToolContainer title="Transform & Skew Generator" description="Create CSS transform effects">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-center space-x-2">
            <Switch id="3d-mode" checked={is3D} onCheckedChange={setIs3D} />
            <Label htmlFor="3d-mode">3D Transform Mode</Label>
          </div>

          {is3D ? (
            <>
              <div className="space-y-2">
                <Label>Perspective: {perspective}px</Label>
                <Slider
                  value={[perspective]}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={(value) => setPerspective(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Rotate X: {rotateX}°</Label>
                <Slider
                  value={[rotateX]}
                  min={-180}
                  max={180}
                  step={1}
                  onValueChange={(value) => setRotateX(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Rotate Y: {rotateY}°</Label>
                <Slider
                  value={[rotateY]}
                  min={-180}
                  max={180}
                  step={1}
                  onValueChange={(value) => setRotateY(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Rotate Z: {rotateZ}°</Label>
                <Slider
                  value={[rotateZ]}
                  min={-180}
                  max={180}
                  step={1}
                  onValueChange={(value) => setRotateZ(value[0])}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>Rotate: {rotate}°</Label>
              <Slider value={[rotate]} min={-180} max={180} step={1} onValueChange={(value) => setRotate(value[0])} />
            </div>
          )}

          <div className="space-y-2">
            <Label>Translate X: {translateX}px</Label>
            <Slider
              value={[translateX]}
              min={-100}
              max={100}
              step={1}
              onValueChange={(value) => setTranslateX(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Translate Y: {translateY}px</Label>
            <Slider
              value={[translateY]}
              min={-100}
              max={100}
              step={1}
              onValueChange={(value) => setTranslateY(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Scale X: {scaleX.toFixed(1)}</Label>
            <Slider
              value={[scaleX * 10]}
              min={0}
              max={30}
              step={1}
              onValueChange={(value) => setScaleX(value[0] / 10)}
            />
          </div>

          <div className="space-y-2">
            <Label>Scale Y: {scaleY.toFixed(1)}</Label>
            <Slider
              value={[scaleY * 10]}
              min={0}
              max={30}
              step={1}
              onValueChange={(value) => setScaleY(value[0] / 10)}
            />
          </div>

          <div className="space-y-2">
            <Label>Skew X: {skewX}°</Label>
            <Slider value={[skewX]} min={-90} max={90} step={1} onValueChange={(value) => setSkewX(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Skew Y: {skewY}°</Label>
            <Slider value={[skewY]} min={-90} max={90} step={1} onValueChange={(value) => setSkewY(value[0])} />
          </div>

          <Tabs defaultValue="center" onValueChange={setTransformOrigin}>
            <Label>Transform Origin</Label>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="top left">Top Left</TabsTrigger>
              <TabsTrigger value="top">Top</TabsTrigger>
              <TabsTrigger value="top right">Top Right</TabsTrigger>
              <TabsTrigger value="left">Left</TabsTrigger>
              <TabsTrigger value="center">Center</TabsTrigger>
              <TabsTrigger value="right">Right</TabsTrigger>
              <TabsTrigger value="bottom left">Bottom Left</TabsTrigger>
              <TabsTrigger value="bottom">Bottom</TabsTrigger>
              <TabsTrigger value="bottom right">Bottom Right</TabsTrigger>
            </TabsList>
          </Tabs>

          <CodeBlock code={getTransformCSS()} />
        </div>

        <div className="flex h-full min-h-[300px] items-center justify-center rounded-lg border p-4">
          <div
            className="h-32 w-32 rounded-md bg-primary"
            style={{
              transform: getTransformCSS().split("transform: ")[1].split(";")[0],
              transformOrigin,
            }}
          ></div>
        </div>
      </div>
    </ToolContainer>
  )
}

