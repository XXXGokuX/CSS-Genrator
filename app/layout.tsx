import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/app-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CSS Generator - Developer Tools for Web Design",
  description:
    "Modern and interactive CSS and UI generators for frontend developers. Create beautiful gradients, shadows, animations and more with real-time preview.",
  keywords:
    "css generator, web design tools, css tools, gradient generator, box shadow, text shadow, border radius, glassmorphism, neumorphism, css grid, flexbox, clip path, animation, transform, filter, blob generator, wave generator",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'