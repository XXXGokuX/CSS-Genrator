import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GradientGenerator } from "@/components/generators/gradient-generator"
import { BoxShadowGenerator } from "@/components/generators/box-shadow-generator"
import { TextShadowGenerator } from "@/components/generators/text-shadow-generator"
import { BorderRadiusGenerator } from "@/components/generators/border-radius-generator"
import { GlassmorphismGenerator } from "@/components/generators/glassmorphism-generator"
import { NeumorphismGenerator } from "@/components/generators/neumorphism-generator"
import { GridGenerator } from "@/components/generators/grid-generator"
import { FlexboxPlayground } from "@/components/generators/flexbox-playground"
import { ClipPathGenerator } from "@/components/generators/clip-path-generator"
import { AnimationGenerator } from "@/components/generators/animation-generator"
import { TransformGenerator } from "@/components/generators/transform-generator"
import { FilterGenerator } from "@/components/generators/filter-generator"
import { BlobGenerator } from "@/components/generators/blob-generator"
import { WaveGenerator } from "@/components/generators/wave-generator"

type Props = {
  params: { tool: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = params.tool

  const toolData = {
    gradient: {
      title: "Gradient Generator - CSS Generator Tools",
      description:
        "Create beautiful CSS gradients for your website with our interactive gradient generator. Customize colors, type, and direction with real-time preview.",
      keywords: "css gradient, linear gradient, radial gradient, conic gradient, gradient generator, css background",
    },
    "box-shadow": {
      title: "Box Shadow Generator - CSS Generator Tools",
      description:
        "Create and customize CSS box shadows with our interactive tool. Adjust offset, blur, spread, and color with real-time preview.",
      keywords: "css box shadow, shadow generator, box shadow tool, css effects, web design shadow",
    },
    "text-shadow": {
      title: "Text Shadow Generator - CSS Generator Tools",
      description:
        "Create and customize CSS text shadows with our interactive tool. Adjust offset, blur, and color with real-time preview.",
      keywords: "css text shadow, text effects, shadow generator, typography effects, web text design",
    },
    "border-radius": {
      title: "Border Radius Generator - CSS Generator Tools",
      description:
        "Create and customize CSS border radius with our interactive tool. Create rounded corners and shapes with real-time preview.",
      keywords: "css border radius, rounded corners, border radius generator, css shapes, rounded elements",
    },
    glassmorphism: {
      title: "Glassmorphism Generator - CSS Generator Tools",
      description:
        "Create modern glassmorphism UI effects with our interactive tool. Customize blur, transparency and colors with real-time preview.",
      keywords: "glassmorphism, glass effect, frosted glass, css glass, transparent ui, backdrop filter",
    },
    neumorphism: {
      title: "Neumorphism Generator - CSS Generator Tools",
      description:
        "Create soft UI neumorphic effects with our interactive tool. Customize shadows, radius and colors with real-time preview.",
      keywords: "neumorphism, soft ui, neumorphic design, soft shadow, emboss effect, css neumorphism",
    },
    grid: {
      title: "CSS Grid Generator - CSS Generator Tools",
      description:
        "Create and customize CSS Grid layouts with our interactive tool. Define columns, rows and gaps with real-time preview.",
      keywords: "css grid, grid layout, grid generator, css layout, responsive grid, web layout",
    },
    flexbox: {
      title: "Flexbox Playground - CSS Generator Tools",
      description:
        "Create and customize CSS Flexbox layouts with our interactive tool. Adjust alignment, direction and spacing with real-time preview.",
      keywords: "css flexbox, flex layout, flexbox generator, css layout, responsive design, flex container",
    },
    "clip-path": {
      title: "Clip Path Generator - CSS Generator Tools",
      description:
        "Create CSS clip-path shapes for your elements with our interactive tool. Create circles, polygons and custom shapes with real-time preview.",
      keywords: "css clip-path, shape generator, css shapes, clipping mask, image clipping, polygon shapes",
    },
    animation: {
      title: "Animation Generator - CSS Generator Tools",
      description:
        "Create CSS animations with keyframes using our interactive tool. Customize duration, timing and properties with real-time preview.",
      keywords: "css animation, keyframe animation, animation generator, web animation, css effects, motion design",
    },
    transform: {
      title: "Transform Generator - CSS Generator Tools",
      description:
        "Create CSS transform effects with our interactive tool. Customize rotation, scale, skew and translate with real-time preview.",
      keywords: "css transform, rotate, scale, skew, translate, 3d transform, css effects",
    },
    filter: {
      title: "CSS Filter Generator - CSS Generator Tools",
      description:
        "Create and customize CSS filters with our interactive tool. Adjust blur, brightness, contrast and more with real-time preview.",
      keywords: "css filter, image filter, blur, brightness, contrast, grayscale, sepia, css effects",
    },
    blob: {
      title: "Blob Generator - CSS Generator Tools",
      description:
        "Create organic blob shapes for your designs with our interactive tool. Customize complexity, size and color with real-time preview.",
      keywords: "blob generator, svg blob, organic shapes, blob design, svg generator, web design shapes",
    },
    wave: {
      title: "Wave Generator - CSS Generator Tools",
      description:
        "Create SVG waves for UI design with our interactive tool. Customize amplitude, frequency and color with real-time preview.",
      keywords: "svg wave, wave generator, wave divider, web design waves, svg generator, ui waves",
    },
  }

  const metadata = toolData[tool as keyof typeof toolData]

  if (!metadata) {
    return {
      title: "CSS Generator Tools",
      description: "Modern and interactive CSS and UI generators for frontend developers.",
    }
  }

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  }
}

export default function ToolPage({ params }: Props) {
  const { tool } = params

  const renderTool = () => {
    switch (tool) {
      case "gradient":
        return <GradientGenerator />
      case "box-shadow":
        return <BoxShadowGenerator />
      case "text-shadow":
        return <TextShadowGenerator />
      case "border-radius":
        return <BorderRadiusGenerator />
      case "glassmorphism":
        return <GlassmorphismGenerator />
      case "neumorphism":
        return <NeumorphismGenerator />
      case "grid":
        return <GridGenerator />
      case "flexbox":
        return <FlexboxPlayground />
      case "clip-path":
        return <ClipPathGenerator />
      case "animation":
        return <AnimationGenerator />
      case "transform":
        return <TransformGenerator />
      case "filter":
        return <FilterGenerator />
      case "blob":
        return <BlobGenerator />
      case "wave":
        return <WaveGenerator />
      default:
        notFound()
    }
  }

  return <div className="container py-6">{renderTool()}</div>
}

