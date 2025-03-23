import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppLayout } from "@/components/app-layout"
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CSS Generator - Webleefy",
  description:
    "Modern and interactive CSS and UI generators for frontend developers. Create beautiful gradients, shadows, animations and more with real-time preview.",
  keywords:
    "css generator, web design tools, css tools, gradient generator, box shadow, text shadow, border radius, glassmorphism, neumorphism, css grid, flexbox, clip path, animation, transform, filter, blob generator, wave generator",
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <meta name="monetag" content="d6341140a3b78eb74eeadb4d6550c416"></meta>
        <meta name="google-site-verification" content="27eYDbONYHuKFfmdKqsPtUodhkrvHDa4FC5dJ7Qjlf4" />
        
        <Script
          id="monetag-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(d,z,s){
                        s.src='https://'+d+'/401/'+z;
                        try{(document.body||document.documentElement).appendChild(s)}
                        catch(e){}
                    })('groleegni.net',9114136,document.createElement('script'));`
          }}
        />
      </head>

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'