"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "css" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-md bg-muted">
      <div className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground">
        <span>{language.toUpperCase()}</span>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">
        <code className="code-block">{code}</code>
      </pre>
    </div>
  )
}

