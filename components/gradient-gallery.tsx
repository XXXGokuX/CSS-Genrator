"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, RefreshCw } from "lucide-react"

// Function to generate a random color
const randomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

// Function to generate a random gradient
const generateRandomGradient = () => {
  const types = ["linear", "radial", "conic"]
  const type = types[Math.floor(Math.random() * types.length)]

  // Generate 2-4 color stops
  const numColors = Math.floor(Math.random() * 3) + 2
  const colors = Array.from({ length: numColors }, () => randomColor())

  let css = ""
  let name = ""

  if (type === "linear") {
    const angle = Math.floor(Math.random() * 360)
    css = `linear-gradient(${angle}deg, ${colors.join(", ")})`
    name = `Linear ${angle}°`
  } else if (type === "radial") {
    const shapes = ["circle", "ellipse"]
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const positions = ["center", "top left", "top right", "bottom left", "bottom right"]
    const position = positions[Math.floor(Math.random() * positions.length)]
    css = `radial-gradient(${shape} at ${position}, ${colors.join(", ")})`
    name = `Radial ${shape} at ${position}`
  } else {
    const angle = Math.floor(Math.random() * 360)
    css = `conic-gradient(from ${angle}deg, ${colors.join(", ")})`
    name = `Conic from ${angle}°`
  }

  return { css, name, colors }
}

export function GradientGallery() {
  const [gradients, setGradients] = useState<Array<{ css: string; name: string; colors: string[]; copied: boolean }>>(
    [],
  )

  const generateGradients = () => {
    const newGradients = Array.from({ length: 20 }, () => {
      const { css, name, colors } = generateRandomGradient()
      return { css, name, colors, copied: false }
    })
    setGradients(newGradients)
  }

  useEffect(() => {
    generateGradients()
  }, [])

  const copyGradient = (index: number) => {
    navigator.clipboard.writeText(`background: ${gradients[index].css};`)

    // Update copied state
    setGradients(gradients.map((gradient, i) => (i === index ? { ...gradient, copied: true } : gradient)))

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setGradients(gradients.map((gradient, i) => (i === index ? { ...gradient, copied: false } : gradient)))
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Random Gradient Gallery</h2>
        <Button onClick={generateGradients} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gradients.map((gradient, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-32 w-full" style={{ background: gradient.css }} />
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{gradient.name}</p>
                <Button variant="ghost" size="sm" onClick={() => copyGradient(index)} className="h-8 px-2 gap-1">
                  {gradient.copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span className="text-xs">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="flex gap-1">
                {gradient.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="h-4 w-4 rounded-full border border-gray-200 dark:border-gray-700"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

