"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"

export function DemoExit() {
  const { isDemo, exitDemoMode } = useAuth()

  if (!isDemo) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background border rounded-lg shadow-lg p-4 flex flex-col gap-3">
        <p className="text-sm font-medium">Demo Mode Active</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={exitDemoMode}>
            <LogOut className="h-4 w-4 mr-1" />
            Exit Demo
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
