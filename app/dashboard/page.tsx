"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, CheckCircle, FileText } from "lucide-react"

// Mock data for demonstration purposes
const mockVerificationData = [
  { name: "Jan", verifications: 4 },
  { name: "Feb", verifications: 3 },
  { name: "Mar", verifications: 2 },
  { name: "Apr", verifications: 7 },
  { name: "May", verifications: 2 },
  { name: "Jun", verifications: 6 },
  { name: "Jul", verifications: 8 },
]

const mockVerifications = [
  {
    id: "v1",
    type: "Identity",
    status: "Verified",
    date: "2023-04-10T10:30:00Z",
    verifier: "Govt Agency X",
  },
  {
    id: "v2",
    type: "Education",
    status: "Pending",
    date: "2023-04-15T14:20:00Z",
    verifier: "University Y",
  },
  {
    id: "v3",
    type: "Employment",
    status: "Verified",
    date: "2023-03-22T09:45:00Z",
    verifier: "Company Z",
  },
  {
    id: "v4",
    type: "Certificate",
    status: "Rejected",
    date: "2023-04-05T16:10:00Z",
    verifier: "Certification Board",
  },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Show loading state while session is loading
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    // In a client component, we can't use redirect, so we'll show a message
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You need to be signed in to view this page.</p>
        <Button onClick={() => (window.location.href = "/auth/signin")}>Sign In</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}</h1>
          <p className="text-muted-foreground">Manage and track your identity verifications</p>
        </div>
        <Button>Request New Verification</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Processing since April 15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+4% from previous quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Activity</CardTitle>
              <CardDescription>Your verification requests over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockVerificationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="verifications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Verifications</CardTitle>
              <CardDescription>Manage your identity verification requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVerifications.map((verification) => (
                  <div
                    key={verification.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{verification.type} Verification</span>
                        <Badge
                          variant={
                            verification.status === "Verified"
                              ? "default"
                              : verification.status === "Pending"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {verification.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">Verifier: {verification.verifier}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(verification.date).toLocaleDateString()}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
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
              <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">No documents uploaded</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Upload documents to request verification</p>
                  <div className="mt-4">
                    <Button size="sm">Upload Document</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
