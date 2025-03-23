import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  Paintbrush,
  Square,
  Type,
  Radius,
  GlassWater,
  Layers,
  LayoutGrid,
  AlignJustify,
  Scissors,
  Play,
  Move3d,
  Sliders,
  Droplets,
  Waves,
} from "lucide-react"

export const metadata: Metadata = {
  title: "CSS Generator - Webleefy",
  description:
    "Modern and interactive CSS and UI generators for frontend developers. Create beautiful gradients, shadows, animations and more with real-time preview.",
}

const tools = [
  {
    id: "gradient",
    name: "Gradient Generator",
    icon: Paintbrush,
    description: "Create beautiful CSS gradients for your website",
  },
  { id: "box-shadow", name: "Box Shadow Generator", icon: Square, description: "Create and customize CSS box shadows" },
  {
    id: "text-shadow",
    name: "Text Shadow Generator",
    icon: Type,
    description: "Create and customize CSS text shadows",
  },
  {
    id: "border-radius",
    name: "Border Radius Generator",
    icon: Radius,
    description: "Create and customize CSS border radius",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism Generator",
    icon: GlassWater,
    description: "Create modern glassmorphism UI effects",
  },
  { id: "neumorphism", name: "Neumorphism Generator", icon: Layers, description: "Create soft UI neumorphic effects" },
  { id: "grid", name: "CSS Grid Generator", icon: LayoutGrid, description: "Create and customize CSS Grid layouts" },
  {
    id: "flexbox",
    name: "Flexbox Playground",
    icon: AlignJustify,
    description: "Create and customize CSS Flexbox layouts",
  },
  {
    id: "clip-path",
    name: "Clip Path Generator",
    icon: Scissors,
    description: "Create CSS clip-path shapes for your elements",
  },
  { id: "animation", name: "Animation Generator", icon: Play, description: "Create CSS animations with keyframes" },
  { id: "transform", name: "Transform Generator", icon: Move3d, description: "Create CSS transform effects" },
  { id: "filter", name: "CSS Filter Generator", icon: Sliders, description: "Create and customize CSS filters" },
  { id: "blob", name: "Blob Generator", icon: Droplets, description: "Create organic blob shapes for your designs" },
  { id: "wave", name: "Wave Generator", icon: Waves, description: "Create SVG waves for UI design" },
]

export default function Home() {
  return (
    <div className="container py-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">CSS Generator Tools</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A collection of modern and interactive CSS and UI generators for frontend developers. Create beautiful designs
          with real-time previews and copy-ready code.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.id} href={`/tools/${tool.id}`} className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-md">
                  <tool.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

