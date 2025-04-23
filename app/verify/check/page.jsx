"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, QrCode, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function VerificationCheck() {
  const { isAuthenticated } = useAuth()
  const [certificateId, setCertificateId] = useState("")
  const [error, setError] = useState("")
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setResult(null)

    // Basic validation
    if (!certificateId) {
      setError("Please enter a certificate ID")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll return a mock result for a specific ID
      if (certificateId === "CERT-123456") {
        setResult({
          valid: true,
          certificate: {
            id: "CERT-123456",
            type: "Identity Verification",
            issuedTo: "John Doe",
            issuedBy: "Proof of You",
            issuedOn: "2023-04-10T10:30:00Z",
            expiresOn: "2024-04-10T10:30:00Z",
            status: "Valid",
          },
        })
      } else {
        setResult({
          valid: false,
          message: "Certificate not found or invalid",
        })
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Verification Certificate Checker</h1>
          <p className="text-muted-foreground">
            Verify the authenticity of identity certificates issued by our platform
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Certificate Verification</CardTitle>
            <CardDescription>Enter a certificate ID or scan a QR code to verify its authenticity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="id">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="id">Certificate ID</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>

              <TabsContent value="id">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="certificateId">Certificate ID</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="certificateId"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        placeholder="e.g., CERT-123456"
                        required
                      />
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Checking..." : "Verify"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">For demo purposes, try using "CERT-123456"</p>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="qr">
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <QrCode className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-center">Scan QR Code</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Position the QR code in front of your camera to verify the certificate
                    </p>
                    <Button className="mt-4">
                      <Search className="mr-2 h-4 w-4" />
                      Start Scanner
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Note: QR code scanning requires camera access
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {result && (
              <div className="mt-6 border rounded-lg p-4">
                {result.valid ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <h3 className="font-medium text-green-700">Valid Certificate</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Certificate ID</p>
                        <p className="font-medium">{result.certificate.id}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium">{result.certificate.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued To</p>
                        <p className="font-medium">{result.certificate.issuedTo}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued By</p>
                        <p className="font-medium">{result.certificate.issuedBy}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issued On</p>
                        <p className="font-medium">{new Date(result.certificate.issuedOn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires On</p>
                        <p className="font-medium">{new Date(result.certificate.expiresOn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-medium text-green-600">{result.certificate.status}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-medium text-red-700">{result.message}</h3>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!isAuthenticated && (
              <div className="w-full text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Create an account to access verification history and more features
                </p>
                <Button asChild>
                  <Link href="/auth/signup">Create Account</Link>
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
