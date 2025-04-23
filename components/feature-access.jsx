"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export function FeatureAccess({ children, authMessage, demoPrompt = true, autoDemoMode = true }) {
  const { isAuthenticated, isDemo, enterDemoMode } = useAuth()

  // Automatically enter demo mode if specified
  useEffect(() => {
    if (autoDemoMode && !isAuthenticated && !isDemo) {
      enterDemoMode()
    }
  }, [autoDemoMode, isAuthenticated, isDemo, enterDemoMode])

  // If user is authenticated, show the actual feature
  if (isAuthenticated) {
    return children
  }

  // If user is in demo mode, show the feature
  if (isDemo) {
    return children
  }

  // If user is not authenticated and not in demo mode, show the prompt
  return (
    <div className="border rounded-lg p-6 bg-muted/30">
      <div className="flex flex-col items-center text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">{authMessage || "Authentication Required"}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          This feature requires authentication. Sign in to access your personal data, or try the demo to explore this
          feature.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/signup">Create Account</Link>
          </Button>
          {demoPrompt && (
            <Button variant="ghost" onClick={enterDemoMode}>
              Try Demo
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
