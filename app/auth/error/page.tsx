"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "An unexpected error occurred during authentication."

  // Map error codes to user-friendly messages
  if (error === "Configuration") {
    errorMessage = "There is a problem with the server configuration."
  } else if (error === "AccessDenied") {
    errorMessage = "You do not have permission to sign in."
  } else if (error === "Verification") {
    errorMessage = "The verification link is invalid or has expired."
  } else if (error === "OAuthSignin" || error === "OAuthCallback" || error === "OAuthCreateAccount") {
    errorMessage = "There was a problem with the OAuth authentication."
  } else if (error === "EmailCreateAccount") {
    errorMessage = "There was a problem creating your account with this email."
  } else if (error === "Callback") {
    errorMessage = "There was a problem with the authentication callback."
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage = "This email is already associated with another account."
  } else if (error === "EmailSignin") {
    errorMessage = "There was a problem sending the email for sign in."
  } else if (error === "CredentialsSignin") {
    errorMessage = "The email or password you entered is incorrect."
  } else if (error === "SessionRequired") {
    errorMessage = "You must be signed in to access this page."
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Authentication Error</CardTitle>
          </div>
          <CardDescription>There was a problem with your authentication request.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button onClick={() => (window.location.href = "/auth/signin")}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
