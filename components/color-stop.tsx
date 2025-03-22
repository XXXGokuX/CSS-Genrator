"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ColorPicker } from "@/components/color-picker"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export interface ColorStop {
  color: string
  position: number
  id: string
}

interface ColorStopProps {
  colorStop: ColorStop
  onChange: (id: string, color: string, position: number) => void
  onRemove: (id: string) => void
  canRemove: boolean
  showPosition?: boolean
}

export function ColorStopComponent({ colorStop, onChange, onRemove, canRemove, showPosition = true }: ColorStopProps) {
  const [position, setPosition] = useState(colorStop.position)

  const handlePositionChange = (value: number) => {
    setPosition(value)
    onChange(colorStop.id, colorStop.color, value)
  }

  const handleColorChange = (color: string) => {
    onChange(colorStop.id, color, colorStop.position)
  }

  return (
    <div className="flex items-end gap-2">
      <ColorPicker label={`Color Stop`} value={colorStop.color} onChange={handleColorChange} />

      {showPosition && (
        <div className="flex flex-col gap-2">
          <Label htmlFor={`position-${colorStop.id}`}>Position (%)</Label>
          <Input
            id={`position-${colorStop.id}`}
            type="number"
            min="0"
            max="100"
            value={position}
            onChange={(e) => handlePositionChange(Number(e.target.value))}
            className="w-20"
          />
        </div>
      )}

      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(colorStop.id)}
          className="mb-0.5"
          aria-label="Remove color stop"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export function ColorStopSlider({
  colorStops,
  onChange,
  onSelect,
  selectedId,
}: {
  colorStops: ColorStop[]
  onChange: (id: string, position: number) => void
  onSelect: (id: string) => void
  selectedId: string | null
}) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragId, setDragId] = useState<string | null>(null)

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragId(id)
    onSelect(id)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragId || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const position = Math.min(Math.max(0, ((e.clientX - rect.left) / rect.width) * 100), 100)

    onChange(dragId, Math.round(position))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragId(null)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragId])

  // Create gradient string for background
  const gradientString = `linear-gradient(to right, ${colorStops
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ")})`

  return (
    <div className="mt-2 mb-6 space-y-2">
      <div
        ref={sliderRef}
        className="h-8 w-full rounded-md relative cursor-pointer"
        style={{ background: gradientString }}
      >
        {colorStops.map((stop) => (
          <div
            key={stop.id}
            className={`absolute w-4 h-4 -ml-2 -mt-1 rounded-full border-2 border-white cursor-move shadow-md top-full transform -translate-y-1/2 ${
              selectedId === stop.id ? "ring-2 ring-primary" : ""
            }`}
            style={{
              left: `${stop.position}%`,
              backgroundColor: stop.color,
            }}
            onMouseDown={(e) => handleMouseDown(stop.id, e)}
            onClick={() => onSelect(stop.id)}
          />
        ))}
      </div>
    </div>
  )
}

