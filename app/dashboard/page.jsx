"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Shield, Clock, CheckCircle, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { FeatureAccess } from "@/components/feature-access"
import { useDemoData } from "@/providers/demo-data-provider"
import { DemoIndicator } from "@/components/demo-indicator"

export default function Dashboard() {
  const { user, isAuthenticated, isDemo, enterDemoMode } = useAuth()
  const { getVerifications, getDocuments } = useDemoData()
  const router = useRouter()

  // Get demo data
  const verifications = getVerifications()
  const documents = getDocuments()

  // If not authenticated and not in demo mode, enter demo mode automatically
  useEffect(() => {
    if (!isAuthenticated && !isDemo) {
      enterDemoMode()
    }
  }, [isAuthenticated, isDemo, enterDemoMode])

  return (
    <FeatureAccess authMessage="Dashboard Access" demoPrompt={false}>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Welcome, {user?.name || "Guest"}</h1>
              {isDemo && <DemoIndicator />}
            </div>
            <p className="text-muted-foreground">
              {isDemo
                ? "Exploring in demo mode - no data will be saved"
                : "Manage and track your identity verifications"}
            </p>
          </div>
          <Button asChild>
            <Link href="/verify/request">
              <Plus className="mr-2 h-4 w-4" /> New Verification
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifications.length}</div>
              <p className="text-xs text-muted-foreground">
                {verifications.filter((v) => v.status === "Verified").length} verified,
                {verifications.filter((v) => v.status !== "Verified").length} pending
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Processing since April 15</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50%</div>
              <p className="text-xs text-muted-foreground">1 of 2 verifications successful</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="verifications">Verifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="verifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Verifications</CardTitle>
                <CardDescription>Manage your identity verification requests</CardDescription>
              </CardHeader>
              <CardContent>
                {verifications.length > 0 ? (
                  <div className="space-y-4">
                    {verifications.map((verification) => (
                      <div
                        key={verification.id}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                      >
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{verification.type} Verification</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                verification.status === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : verification.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {verification.status}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">Verifier: {verification.verifier}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(verification.date).toLocaleDateString()}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 md:mt-0" asChild>
                          <Link href={`/verify/${verification.id}`}>View Details</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No verifications found</p>
                    <Button className="mt-4" asChild>
                      <Link href="/verify/request">Request Verification</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>Manage your uploaded verification documents</CardDescription>
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
                          <span className="text-sm text-muted-foreground">Type: {document.type}</span>
                          <span className="text-sm text-muted-foreground">
                            Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                          View Document
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-sm font-medium">No documents uploaded</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Upload documents to request verification</p>
                      <div className="mt-4">
                        <Button size="sm" asChild>
                          <Link href="/documents/upload">Upload Document</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Profile Information</h3>
                      <p className="text-sm text-muted-foreground">Update your personal information</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0" asChild>
                      <Link href="/profile">Edit Profile</Link>
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Security Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage your password and security options</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0" asChild>
                      <Link href="/settings/security">Security Settings</Link>
                    </Button>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Notification Preferences</h3>
                      <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0" asChild>
                      <Link href="/settings/notifications">Notification Settings</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureAccess>
  )
}
