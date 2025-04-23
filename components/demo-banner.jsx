"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { X, Info, Clock } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function DemoBanner() {
  const { isDemo, exitDemoMode, demoStartTime } = useAuth()
  const [isVisible, setIsVisible] = useState(true)
  const [elapsedTime, setElapsedTime] = useState("")

  useEffect(() => {
    if (!isDemo || !demoStartTime) return

    // Update elapsed time every second
    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = now.getTime() - demoStartTime.getTime()

      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)

      setElapsedTime(`${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [isDemo, demoStartTime])

  if (!isDemo || !isVisible) return null

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
          You're exploring in demo mode with sample data. No changes will be saved.
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
