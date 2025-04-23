"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useDemoData } from "@/providers/demo-data-provider"
import { DemoIndicator } from "@/components/demo-indicator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import VerificationStatus from "@/app/components/verification-status"
import VerificationCertificate from "@/app/components/verification-certificate"

export default function VerificationDetail() {
  const { isAuthenticated, isDemo, enterDemoMode } = useAuth()
  const { getVerificationById, getDocumentById } = useDemoData()
  const params = useParams()
  const verificationId = params.id

  // Get verification data
  const verification = getVerificationById(verificationId)

  // Get related documents
  const documents = verification?.documents?.map((docId) => getDocumentById(docId)) || []

  // If not authenticated and not in demo mode, enter demo mode automatically
  useEffect(() => {
    if (!isAuthenticated && !isDemo) {
      enterDemoMode()
    }
  }, [isAuthenticated, isDemo, enterDemoMode])

  if (!verification) {
    return (
      <div className="container mx-auto p-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Verification Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The verification you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Dashboard
            </Link>
            {isDemo && <DemoIndicator />}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{verification.type} Verification</h1>
              <p className="text-muted-foreground">
                Requested on {new Date(verification.date).toLocaleDateString()} • Verifier: {verification.verifier}
              </p>
            </div>
            <Badge
              className={`${
                verification.status === "Verified"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : verification.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
              }`}
            >
              {verification.status}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="status" className="space-y-6">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            {verification.status === "Verified" && <TabsTrigger value="certificate">Certificate</TabsTrigger>}
          </TabsList>

          <TabsContent value="status">
            <VerificationStatus verificationId={verificationId} initialStatus={verification.status.toLowerCase()} />
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Verification Documents</CardTitle>
                <CardDescription>Documents submitted for this verification</CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length > 0 ? (
                  <div className="space-y-4">
                    {documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                      >
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{document.name}</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                document.status === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : document.status === "Under Review"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {document.status}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                          View Document
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No documents found for this verification</p>
                    <Button className="mt-4" asChild>
                      <Link href="/documents/upload">Upload Document</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/documents/upload">Upload Additional Document</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {verification.status === "Verified" && (
            <TabsContent value="certificate">
              <VerificationCertificate
                certificateId="CERT-123456"
                userName={verification.requester?.name || "Demo User"}
                verificationDate={verification.date}
                verificationType={verification.type}
                verifier={verification.verifier}
              />
            </TabsContent>
          )}
        </Tabs>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">Verification Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full mt-0.5">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Verification Requested</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(verification.date).toLocaleDateString()} at{" "}
                  {new Date(verification.date).toLocaleTimeString()}
                </div>
                <div className="text-sm mt-1">
                  {verification.type} verification requested from {verification.verifier}
                </div>
              </div>
            </div>

            {verification.status !== "Pending" && (
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Verification In Progress</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(new Date(verification.date).getTime() + 86400000).toLocaleDateString()} at{" "}
                    {new Date(new Date(verification.date).getTime() + 86400000).toLocaleTimeString()}
                  </div>
                  <div className="text-sm mt-1">Your verification is being processed by our team</div>
                </div>
              </div>
            )}

            {verification.status === "Verified" && (
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-0.5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Verification Completed</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(new Date(verification.date).getTime() + 172800000).toLocaleDateString()} at{" "}
                    {new Date(new Date(verification.date).getTime() + 172800000).toLocaleTimeString()}
                  </div>
                  <div className="text-sm mt-1">Your {verification.type} has been successfully verified</div>
                </div>
              </div>
            )}

            {verification.status === "Rejected" && (
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-full mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium">Verification Rejected</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(new Date(verification.date).getTime() + 172800000).toLocaleDateString()} at{" "}
                    {new Date(new Date(verification.date).getTime() + 172800000).toLocaleTimeString()}
                  </div>
                  <div className="text-sm mt-1">
                    Your verification was rejected. Please check the documents and try again.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isDemo && (
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Demo Mode Information</h3>
            <p className="text-sm text-muted-foreground">
              You're viewing a simulated verification in demo mode. In a real account, you would see your actual
              verification details and status updates here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
