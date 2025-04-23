"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useDemoData } from "@/providers/demo-data-provider"
import { DemoIndicator } from "@/components/demo-indicator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function VerificationRequest() {
  const { isAuthenticated, isDemo, enterDemoMode, user } = useAuth()
  const { addVerification } = useDemoData()
  const router = useRouter()

  const [verificationType, setVerificationType] = useState("identity")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // If not authenticated and not in demo mode, enter demo mode automatically
  useEffect(() => {
    if (!isAuthenticated && !isDemo) {
      enterDemoMode()
    }

    // Pre-fill form with user data if available
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
    }
  }, [isAuthenticated, isDemo, enterDemoMode, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!name || !email || !details) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In demo mode, use the demo data provider
      const verificationData = {
        type: verificationType,
        status: "Pending",
        date: new Date().toISOString(),
        verifier: getVerifierByType(verificationType),
        details: details,
        requester: {
          name,
          email,
        },
      }

      addVerification(verificationData)
      setSuccess(true)

      // Reset form
      setVerificationType("identity")
      setDetails("")

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get verifier based on verification type
  const getVerifierByType = (type) => {
    switch (type) {
      case "identity":
        return "Govt Agency X"
      case "education":
        return "University Y"
      case "employment":
        return "Company Z"
      default:
        return "Proof of You"
    }
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold mb-2">Request Verification</h1>
            {isDemo && <DemoIndicator />}
          </div>
          <p className="text-muted-foreground">
            {isDemo
              ? "Demo Mode: Verification requests are simulated and not actually processed"
              : "Submit a request for identity verification"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verification Request Form</CardTitle>
            <CardDescription>Fill out the form below to submit your verification request</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  Your verification request has been submitted successfully! Redirecting to dashboard...
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label>Verification Type</Label>
                  <RadioGroup
                    value={verificationType}
                    onValueChange={setVerificationType}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="identity" id="identity" />
                      <Label htmlFor="identity" className="cursor-pointer">
                        Identity Verification
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="education" id="education" />
                      <Label htmlFor="education" className="cursor-pointer">
                        Education Credentials
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="employment" id="employment" />
                      <Label htmlFor="employment" className="cursor-pointer">
                        Employment Verification
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Verification Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Please provide details about what you need verified..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            {isDemo && !success && (
              <div className="w-full text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  In demo mode, verification requests are simulated. To save your requests and use the full
                  functionality, please create an account.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        {isDemo && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Demo Mode Information</h3>
            <p className="text-sm text-muted-foreground">
              In demo mode, you can explore all features of our verification system without creating an account. Your
              actions are simulated and no actual data is stored on our servers.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
