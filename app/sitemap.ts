import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webleefy.com"

  // List of all tools from the application
  const tools = [
    "gradient",
    "box-shadow",
    "text-shadow",
    "border-radius",
    "glassmorphism",
    "neumorphism",
    "grid",
    "flexbox",
    "clip-path",
    "animation",
    "transform",
    "filter",
    "blob",
    "wave",
  ]

  // Create sitemap entries for the homepage and all tool pages
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}

