"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [colorValue, setColorValue] = useState(value)

  useEffect(() => {
    setColorValue(value)
  }, [value])

  const handleChange = (newValue: string) => {
    setColorValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={`color-${label}`}>{label}</Label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              id={`color-${label}`}
              className="h-9 w-9 rounded-md border"
              style={{ backgroundColor: colorValue }}
              aria-label={`Pick a ${label.toLowerCase()} color`}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <input
              type="color"
              value={colorValue}
              onChange={(e) => handleChange(e.target.value)}
              className="h-32 w-32 cursor-pointer appearance-none border-0 bg-transparent p-0"
            />
          </PopoverContent>
        </Popover>
        <Input value={colorValue} onChange={(e) => handleChange(e.target.value)} className="font-mono" />
      </div>
    </div>
  )
}

