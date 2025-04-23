"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "An unexpected error occurred during authentication."
  let errorDescription = "Please try again or contact support if the problem persists."

  // Map error codes to user-friendly messages
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid login credentials"
    errorDescription = "The email or password you entered is incorrect. Please try again."
  } else if (error === "AccessDenied") {
    errorMessage = "Access denied"
    errorDescription = "You do not have permission to access this resource."
  } else if (error === "Verification") {
    errorMessage = "Verification required"
    errorDescription = "Please verify your email address before signing in."
  } else if (error === "SessionRequired") {
    errorMessage = "Authentication required"
    errorDescription = "You must be signed in to access this page."
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage = "Account not linked"
    errorDescription = "To confirm your identity, sign in with the same account you used originally."
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Authentication Error</CardTitle>
          </div>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{errorDescription}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button asChild>
            <Link href="/auth/signin">Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
