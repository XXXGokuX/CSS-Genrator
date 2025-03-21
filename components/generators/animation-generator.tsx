"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Play, Pause, Copy, Check } from "lucide-react"

export function AnimationGenerator() {
  const [animationType, setAnimationType] = useState<
    "fade" | "slide" | "scale" | "rotate" | "bounce" | "pulse" | "custom"
  >("fade")
  const [duration, setDuration] = useState(1)
  const [timingFunction, setTimingFunction] = useState("ease")
  const [delay, setDelay] = useState(0)
  const [iterationCount, setIterationCount] = useState("1")
  const [direction, setDirection] = useState("normal")
  const [fillMode, setFillMode] = useState("forwards")
  const [playing, setPlaying] = useState(false)
  const [copied, setCopied] = useState(false)
  const [customKeyframes, setCustomKeyframes] = useState(
    `@keyframes custom {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}`,
  )

  // Animation presets
  const presets = [
    {
      name: "Fade In",
      type: "fade",
      duration: 1,
      timingFunction: "ease",
      delay: 0,
      iterationCount: "1",
      direction: "normal",
      fillMode: "forwards",
    },
    {
      name: "Slide In",
      type: "slide",
      duration: 0.8,
      timingFunction: "ease-out",
      delay: 0,
      iterationCount: "1",
      direction: "normal",
      fillMode: "forwards",
    },
    {
      name: "Pop",
      type: "scale",
      duration: 0.5,
      timingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      delay: 0,
      iterationCount: "1",
      direction: "normal",
      fillMode: "forwards",
    },
    {
      name: "Spin",
      type: "rotate",
      duration: 1.5,
      timingFunction: "linear",
      delay: 0,
      iterationCount: "infinite",
      direction: "normal",
      fillMode: "none",
    },
    {
      name: "Bounce",
      type: "bounce",
      duration: 1,
      timingFunction: "cubic-bezier(0.28, 0.84, 0.42, 1)",
      delay: 0,
      iterationCount: "infinite",
      direction: "alternate",
      fillMode: "none",
    },
    {
      name: "Pulse",
      type: "pulse",
      duration: 1.5,
      timingFunction: "ease-in-out",
      delay: 0,
      iterationCount: "infinite",
      direction: "normal",
      fillMode: "none",
    },
  ]

  const applyPreset = (preset: (typeof presets)[0]) => {
    setAnimationType(preset.type as any)
    setDuration(preset.duration)
    setTimingFunction(preset.timingFunction)
    setDelay(preset.delay)
    setIterationCount(preset.iterationCount)
    setDirection(preset.direction)
    setFillMode(preset.fillMode)
  }

  const getKeyframes = () => {
    switch (animationType) {
      case "fade":
        return `@keyframes fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`
      case "slide":
        return `@keyframes slide {
  0% { transform: translateX(-50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}`
      case "scale":
        return `@keyframes scale {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}`
      case "rotate":
        return `@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`
      case "bounce":
        return `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}`
      case "pulse":
        return `@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`
      case "custom":
        return customKeyframes
      default:
        return ""
    }
  }

  const getAnimationCSS = () => {
    const animationName = animationType === "custom" ? "custom" : animationType
    return `.element {
  animation-name: ${animationName};
  animation-duration: ${duration}s;
  animation-timing-function: ${timingFunction};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iterationCount};
  animation-direction: ${direction};
  animation-fill-mode: ${fillMode};
}

/* Shorthand version */
.element-shorthand {
  animation: ${animationName} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode};
}

${getKeyframes()}`
  }

  const copyAnimationCSS = () => {
    navigator.clipboard.writeText(getAnimationCSS())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolContainer title="CSS Animation Generator" description="Create CSS animations with keyframes">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Label>Animation Presets</Label>
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

          <Tabs defaultValue="fade" onValueChange={(value) => setAnimationType(value as any)}>
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="fade">Fade</TabsTrigger>
              <TabsTrigger value="slide">Slide</TabsTrigger>
              <TabsTrigger value="scale">Scale</TabsTrigger>
              <TabsTrigger value="rotate">Rotate</TabsTrigger>
              <TabsTrigger value="bounce">Bounce</TabsTrigger>
              <TabsTrigger value="pulse">Pulse</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>

            <TabsContent value="custom" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="custom-keyframes">Custom Keyframes</Label>
                <textarea
                  id="custom-keyframes"
                  value={customKeyframes}
                  onChange={(e) => setCustomKeyframes(e.target.value)}
                  className="h-40 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                  placeholder="@keyframes custom { ... }"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label>Duration: {duration}s</Label>
            <Slider
              value={[duration * 10]}
              min={1}
              max={50}
              step={1}
              onValueChange={(value) => setDuration(value[0] / 10)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timing-function">Timing Function</Label>
            <Select value={timingFunction} onValueChange={setTimingFunction}>
              <SelectTrigger id="timing-function">
                <SelectValue placeholder="Select timing function" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ease">ease</SelectItem>
                <SelectItem value="ease-in">ease-in</SelectItem>
                <SelectItem value="ease-out">ease-out</SelectItem>
                <SelectItem value="ease-in-out">ease-in-out</SelectItem>
                <SelectItem value="linear">linear</SelectItem>
                <SelectItem value="cubic-bezier(0.175, 0.885, 0.32, 1.275)">cubic-bezier (bounce)</SelectItem>
                <SelectItem value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">cubic-bezier (spring)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Delay: {delay}s</Label>
            <Slider value={[delay * 10]} min={0} max={30} step={1} onValueChange={(value) => setDelay(value[0] / 10)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iteration-count">Iteration Count</Label>
            <Select value={iterationCount} onValueChange={setIterationCount}>
              <SelectTrigger id="iteration-count">
                <SelectValue placeholder="Select iteration count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="infinite">infinite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direction">Direction</Label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger id="direction">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">normal</SelectItem>
                <SelectItem value="reverse">reverse</SelectItem>
                <SelectItem value="alternate">alternate</SelectItem>
                <SelectItem value="alternate-reverse">alternate-reverse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fill-mode">Fill Mode</Label>
            <Select value={fillMode} onValueChange={setFillMode}>
              <SelectTrigger id="fill-mode">
                <SelectValue placeholder="Select fill mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">none</SelectItem>
                <SelectItem value="forwards">forwards</SelectItem>
                <SelectItem value="backwards">backwards</SelectItem>
                <SelectItem value="both">both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={copyAnimationCSS} variant="outline" className="gap-2 w-full">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Animation CSS
              </>
            )}
          </Button>

          <CodeBlock code={getAnimationCSS()} />
        </div>

        <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border p-4">
          <div
            className="h-32 w-32 rounded-md bg-primary"
            style={{
              animationName: playing ? animationType : "none",
              animationDuration: `${duration}s`,
              animationTimingFunction: timingFunction,
              animationDelay: `${delay}s`,
              animationIterationCount: iterationCount,
              animationDirection: direction,
              animationFillMode: fillMode,
            }}
          ></div>

          <Button variant="outline" size="sm" onClick={() => setPlaying(!playing)} className="mt-4">
            {playing ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Play
              </>
            )}
          </Button>

          <style jsx global>{`
            @keyframes fade {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            @keyframes slide {
              0% { transform: translateX(-50px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes scale {
              0% { transform: scale(0); }
              100% { transform: scale(1); }
            }
            @keyframes rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            ${animationType === "custom" ? customKeyframes : ""}
          `}</style>
        </div>
      </div>
    </ToolContainer>
  )
}

