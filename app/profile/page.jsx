"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useDemoData } from "@/providers/demo-data-provider"
import { DemoIndicator } from "@/components/demo-indicator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, User, Shield, Bell, Key } from "lucide-react"

export default function Profile() {
  const { user, isAuthenticated, isDemo, enterDemoMode } = useAuth()
  const { getVerifications, getDocuments } = useDemoData()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [occupation, setOccupation] = useState("")
  const [phone, setPhone] = useState("")
  const [website, setWebsite] = useState("")
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
      setBio("I'm a professional seeking secure identity verification solutions.")
      setLocation("New York, USA")
      setOccupation("Software Developer")
      setPhone("+1 (555) 123-4567")
      setWebsite("https://example.com")
    }
  }, [isAuthenticated, isDemo, enterDemoMode, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSuccess(true)
    setIsLoading(false)

    // Reset success message after a delay
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Your Profile</h1>
              {isDemo && <DemoIndicator />}
            </div>
            <p className="text-muted-foreground">
              {isDemo
                ? "Demo Mode: Profile changes are simulated and not saved"
                : "Manage your personal information and account settings"}
            </p>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {success && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        {isDemo
                          ? "Profile updated successfully in demo mode (changes not saved)"
                          : "Profile updated successfully"}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        placeholder="Your job title"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="Your website URL"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
              {isDemo && (
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    In demo mode, profile changes are simulated and not actually saved. To save your profile
                    information, please{" "}
                    <Link href="/auth/signup" className="text-primary hover:underline">
                      create an account
                    </Link>
                    .
                  </p>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  <Button>Update Password</Button>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
              {isDemo && (
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Security settings are for demonstration purposes only in demo mode. Create an account to set up real
                    security features.
                  </p>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div>
                      <h3 className="font-medium">Verification Updates</h3>
                      <p className="text-sm text-muted-foreground">Get notified about verification status changes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border p-4 rounded-lg">
                    <div>
                      <h3 className="font-medium">Security Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts about security-related activities on your account
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              {isDemo && (
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Notification settings are for demonstration purposes only in demo mode.
                  </p>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {isDemo && (
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Demo Mode Information</h3>
            <p className="text-sm text-muted-foreground mb-2">
              You're currently exploring the profile page in demo mode. All changes are simulated and will not be saved.
            </p>
            <p className="text-sm text-muted-foreground">
              To create a real profile and save your information, please{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                create an account
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
