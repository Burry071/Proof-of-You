"use client"

import { useState, useEffect } from "react"
import { Info, Clock } from "lucide-react"

export function DemoBanner() {
  const [elapsedTime, setElapsedTime] = useState("0m 0s")
  const [startTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const elapsed = now.getTime() - startTime.getTime()
      const minutes = Math.floor(elapsed / 60000)
      const seconds = Math.floor((elapsed % 60000) / 1000)
      setElapsedTime(`${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  return (
    <div className="demo-banner">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-200 p-1.5 rounded-full">
            <Info className="h-4 w-4 text-blue-600" />
          </div>
          <span className="font-medium">Demo Mode</span>
          <div className="hidden sm:flex items-center text-sm text-gray-600">
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
