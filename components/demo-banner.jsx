"use client"

import { useAuth } from "@/contexts/auth-context"
import { Info, Clock } from "lucide-react"
import { useState, useEffect } from "react"

export function DemoBanner() {
  const { demoStartTime } = useAuth()
  const [elapsedTime, setElapsedTime] = useState("")

  useEffect(() => {
    if (!demoStartTime) return

    // Update elapsed time every second
    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = now.getTime() - demoStartTime.getTime()

      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)

      setElapsedTime(`${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [demoStartTime])

  return (
    <div className="bg-primary/10 border-b border-primary/20 py-3 px-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/20 p-1.5 rounded-full">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium">Demo Mode</span>
          <div className="hidden sm:flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{elapsedTime}</span>
          </div>
        </div>
        <div className="text-sm text-center sm:text-left flex-1 px-4">
          This is a demonstration version with sample data. All features are fully functional but changes won't be
          saved.
        </div>
      </div>
    </div>
  )
}
