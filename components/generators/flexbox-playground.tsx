"use client"

import { useState } from "react"
import { ToolContainer } from "@/components/tool-container"
import { CodeBlock } from "@/components/code-block"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check } from "lucide-react"

export function FlexboxPlayground() {
  const [direction, setDirection] = useState("row")
  const [justifyContent, setJustifyContent] = useState("flex-start")
  const [alignItems, setAlignItems] = useState("stretch")
  const [flexWrap, setFlexWrap] = useState("nowrap")
  const [gap, setGap] = useState(16)
  const [items, setItems] = useState(4)
  const [copied, setCopied] = useState(false)

  // Templates for common flexbox layouts
  const templates = [
    {
      name: "Navbar",
      direction: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      gap: 16,
    },
    {
      name: "Card List",
      direction: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      flexWrap: "wrap",
      gap: 20,
    },
    {
      name: "Centered Content",
      direction: "column",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      gap: 16,
    },
    {
      name: "Footer",
      direction: "row",
      justifyContent: "space-evenly",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: 24,
    },
    {
      name: "Sidebar",
      direction: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      flexWrap: "nowrap",
      gap: 8,
    },
  ]

  const applyTemplate = (template: (typeof templates)[0]) => {
    setDirection(template.direction)
    setJustifyContent(template.justifyContent)
    setAlignItems(template.alignItems)
    setFlexWrap(template.flexWrap)
    setGap(template.gap)
  }

  const getFlexboxCSS = () => {
    return `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}

/* Responsive version */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

/* Example item styling */
.flex-item {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f1f5f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Example for specific flex item properties */
.flex-item:nth-child(1) {
  flex: 2; /* Takes twice as much space */
}

.flex-item:nth-child(3) {
  align-self: ${alignItems === "stretch" ? "flex-end" : "stretch"};
}`
  }

  const getHTMLCode = () => {
    return `<div class="container">
  ${Array.from({ length: items })
    .map((_, i) => `  <div class="flex-item">Item ${i + 1}</div>\n`)
    .join("")}</div>`
  }

  const copyFullCode = () => {
    const fullCode = `${getHTMLCode()}\n\n<style>\n${getFlexboxCSS()}\n</style>`
    navigator.clipboard.writeText(fullCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolContainer
      title="Flexbox Playground"
      description="Create and customize CSS Flexbox layouts for responsive web design"
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
            <Label htmlFor="direction">Flex Direction</Label>
            <Select value={direction} onValueChange={setDirection}>
              <SelectTrigger id="direction">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="row">row</SelectItem>
                <SelectItem value="row-reverse">row-reverse</SelectItem>
                <SelectItem value="column">column</SelectItem>
                <SelectItem value="column-reverse">column-reverse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justify">Justify Content</Label>
            <Select value={justifyContent} onValueChange={setJustifyContent}>
              <SelectTrigger id="justify">
                <SelectValue placeholder="Select justify-content" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex-start">flex-start</SelectItem>
                <SelectItem value="flex-end">flex-end</SelectItem>
                <SelectItem value="center">center</SelectItem>
                <SelectItem value="space-between">space-between</SelectItem>
                <SelectItem value="space-around">space-around</SelectItem>
                <SelectItem value="space-evenly">space-evenly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="align">Align Items</Label>
            <Select value={alignItems} onValueChange={setAlignItems}>
              <SelectTrigger id="align">
                <SelectValue placeholder="Select align-items" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flex-start">flex-start</SelectItem>
                <SelectItem value="flex-end">flex-end</SelectItem>
                <SelectItem value="center">center</SelectItem>
                <SelectItem value="stretch">stretch</SelectItem>
                <SelectItem value="baseline">baseline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wrap">Flex Wrap</Label>
            <Select value={flexWrap} onValueChange={setFlexWrap}>
              <SelectTrigger id="wrap">
                <SelectValue placeholder="Select flex-wrap" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nowrap">nowrap</SelectItem>
                <SelectItem value="wrap">wrap</SelectItem>
                <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Gap: {gap}px</Label>
            <Slider value={[gap]} min={0} max={50} step={1} onValueChange={(value) => setGap(value[0])} />
          </div>

          <div className="space-y-2">
            <Label>Items: {items}</Label>
            <Slider value={[items]} min={1} max={8} step={1} onValueChange={(value) => setItems(value[0])} />
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
                <CodeBlock code={getFlexboxCSS()} />
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
            className="h-full w-full rounded border border-dashed border-muted-foreground/30 p-4"
            style={{
              display: "flex",
              flexDirection: direction as any,
              justifyContent,
              alignItems,
              flexWrap: flexWrap as any,
              gap: `${gap}px`,
            }}
          >
            {Array.from({ length: items }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded bg-primary/10 font-mono text-sm p-4 relative"
                style={{
                  flex: i === 0 ? 2 : 1,
                  alignSelf: i === 2 ? (alignItems === "stretch" ? "flex-end" : "stretch") : "auto",
                  minWidth: direction.includes("row") ? "60px" : "auto",
                  minHeight: direction.includes("column") ? "60px" : "auto",
                }}
              >
                <div className="absolute top-1 left-1 text-xs opacity-50">Item {i + 1}</div>
                <div className="text-center">
                  {i === 0 && <span className="text-xs block opacity-70">flex: 2</span>}
                  {i === 2 && (
                    <span className="text-xs block opacity-70">
                      align-self: {alignItems === "stretch" ? "flex-end" : "stretch"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolContainer>
  )
}

