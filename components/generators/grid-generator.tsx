"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check } from "lucide-react"

export function GridGenerator() {
  const [columns, setColumns] = useState("1fr 1fr 1fr")
  const [rows, setRows] = useState("auto auto")
  const [gap, setGap] = useState(16)
  const [items, setItems] = useState(6)
  const [columnCount, setColumnCount] = useState(3)
  const [rowCount, setRowCount] = useState(2)
  const [justifyItems, setJustifyItems] = useState("stretch")
  const [alignItems, setAlignItems] = useState("stretch")
  const [copied, setCopied] = useState(false)

  // Templates for common grid layouts
  const templates = [
    { name: "Basic 3-Column", columns: "1fr 1fr 1fr", rows: "auto", gap: 16 },
    { name: "Responsive Cards", columns: "repeat(auto-fill, minmax(250px, 1fr))", rows: "auto", gap: 20 },
    { name: "Holy Grail Layout", columns: "200px 1fr 200px", rows: "auto 1fr auto", gap: 16 },
    { name: "Dashboard Layout", columns: "repeat(4, 1fr)", rows: "auto auto auto", gap: 16 },
    { name: "Magazine Layout", columns: "repeat(6, 1fr)", rows: "repeat(4, auto)", gap: 12 },
  ]

  const applyTemplate = (template: (typeof templates)[0]) => {
    setColumns(template.columns)
    setRows(template.rows)
    setGap(template.gap)

    // Update column and row count based on template
    if (template.columns.includes("repeat")) {
      const match = template.columns.match(/repeat\((\d+)/)
      if (match) setColumnCount(Number.parseInt(match[1]))
    } else {
      setColumnCount(template.columns.split(" ").length)
    }

    if (template.rows.includes("repeat")) {
      const match = template.rows.match(/repeat\((\d+)/)
      if (match) setRowCount(Number.parseInt(match[1]))
    } else {
      setRowCount(template.rows.split(" ").length)
    }
  }

  const getGridCSS = () => {
    return `.container {
  display: grid;
  grid-template-columns: ${columns};
  grid-template-rows: ${rows};
  gap: ${gap}px;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
}

/* Responsive version */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}

/* Example item styling */
.grid-item {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Example for specific grid item placement */
.grid-item:nth-child(1) {
  grid-column: 1 / 3; /* Spans 2 columns */
}

.grid-item:nth-child(4) {
  grid-row: span 2; /* Spans 2 rows */
}`
  }

  const getHTMLCode = () => {
    return `<div class="container">
  ${Array.from({ length: items })
    .map((_, i) => `  <div class="grid-item">Item ${i + 1}</div>\n`)
    .join("")}</div>`
  }

  const copyFullCode = () => {
    const fullCode = `${getHTMLCode()}\n\n<style>\n${getGridCSS()}\n</style>`
    navigator.clipboard.writeText(fullCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolContainer
      title="CSS Grid Generator"
      description="Create and customize CSS Grid layouts for responsive web design"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Label>Templates</Label>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {templates.map((template) => (
                <Button
                  key={template.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyTemplate(template)}
                  className="text-xs"
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="columns">Grid Template Columns</Label>
            <Input
              id="columns"
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              placeholder="1fr 1fr 1fr"
            />
            <div className="text-xs text-muted-foreground">
              Try: <code>repeat(3, 1fr)</code>, <code>200px 1fr 200px</code>,{" "}
              <code>repeat(auto-fill, minmax(250px, 1fr))</code>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rows">Grid Template Rows</Label>
            <Input id="rows" value={rows} onChange={(e) => setRows(e.target.value)} placeholder="auto auto" />
            <div className="text-xs text-muted-foreground">
              Try: <code>auto</code>, <code>100px 1fr</code>, <code>repeat(3, auto)</code>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gap: {gap}px</Label>
            <Slider value={[gap]} min={0} max={50} step={1} onValueChange={(value) => setGap(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Items: {items}</Label>
            <Slider value={[items]} min={1} max={12} step={1} onValueChange={(value) => setItems(value[0])} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="justify-items">Justify Items</Label>
              <Select value={justifyItems} onValueChange={setJustifyItems}>
                <SelectTrigger id="justify-items">
                  <SelectValue placeholder="Select justify-items" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">start</SelectItem>
                  <SelectItem value="end">end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="stretch">stretch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="align-items">Align Items</Label>
              <Select value={alignItems} onValueChange={setAlignItems}>
                <SelectTrigger id="align-items">
                  <SelectValue placeholder="Select align-items" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">start</SelectItem>
                  <SelectItem value="end">end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="stretch">stretch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={copyFullCode} variant="outline" className="gap-2 w-full">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Full Code (HTML + CSS)
              </>
            )}
          </Button>

          <Tabs defaultValue="css">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              {/* CSS Tab */}
              <div className={`${Tabs.selectedValue === "css" ? "block" : "hidden"}`}>
                <CodeBlock code={getGridCSS()} />
              </div>
              {/* HTML Tab */}
              <div className={`${Tabs.selectedValue === "html" ? "block" : "hidden"}`}>
                <CodeBlock code={getHTMLCode()} language="html" />
              </div>
            </div>
          </Tabs>
        </div>

        <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border p-4 overflow-auto">
          <div
            className="w-full h-full"
            style={{
              display: "grid",
              gridTemplateColumns: columns,
              gridTemplateRows: rows,
              gap: `${gap}px`,
              justifyItems,
              alignItems,
            }}
          >
            {Array.from({ length: items }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded bg-primary/10 font-mono text-sm p-4 relative"
                style={{
                  gridColumn: i === 0 ? "1 / 3" : "auto",
                  gridRow: i === 3 ? "span 2" : "auto",
                }}
              >
                <div className="absolute top-1 left-1 text-xs opacity-50">Item {i + 1}</div>
                <div className="text-center">
                  {i === 0 && <span className="text-xs block opacity-70">grid-column: 1 / 3</span>}
                  {i === 3 && <span className="text-xs block opacity-70">grid-row: span 2</span>}
                  {i !== 0 && i !== 3 && <span className="text-xs block opacity-70">auto placement</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolContainer>
  )
}

