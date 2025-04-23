"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ProtectedContent({ children, fallback, adminOnly = false }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>
  }

  // If admin-only content and user is not admin
  if (adminOnly && !isAdmin) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Admin Access Required</h2>
        <p className="mb-4">You need administrator privileges to view this content.</p>
        <Button onClick={() => router.push("/")}>Return to Home</Button>
      </div>
    )
  }

  // If authenticated content and user is not authenticated
  if (!adminOnly && !isAuthenticated) {
    if (fallback) {
      return fallback
    }

    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-4">Please sign in to access this content.</p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
          <Button variant="outline" onClick={() => router.push("/auth/signup")}>
            Create Account
          </Button>
        </div>
      </div>
    )
  }

  return children
}
