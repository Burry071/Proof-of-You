"use client"

import { Info } from "lucide-react"

export function DemoIndicator({ className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ${className}`}
    >
      <Info className="h-3 w-3" />
      <span>Demo</span>
    </div>
  )
}
