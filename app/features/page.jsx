import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Lock, Users, Clock, FileCheck, Play } from "lucide-react"

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover all the features available on our platform. Try our demo to explore everything without registration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Feature 1 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline">Demo Available</Badge>
            </div>
            <CardTitle className="mt-4">Identity Verification</CardTitle>
            <CardDescription>Verify and manage your identity credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Secure document verification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Multi-factor authentication</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Biometric verification options</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/verify">
                <Play className="mr-2 h-4 w-4" />
                Try Feature
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Feature 2 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-full">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline">Demo Available</Badge>
            </div>
            <CardTitle className="mt-4">Dashboard Management</CardTitle>
            <CardDescription>Manage your identity verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Verification status tracking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Document management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Verification history</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard">
                <Play className="mr-2 h-4 w-4" />
                Try Feature
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Feature 3 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline">Demo Available</Badge>
            </div>
            <CardTitle className="mt-4">Certificate Verification</CardTitle>
            <CardDescription>Verify the authenticity of certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>QR code verification</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Certificate ID lookup</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Verification history</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/verify">
                <Play className="mr-2 h-4 w-4" />
                Try Feature
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Feature 4 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline">Demo Available</Badge>
            </div>
            <CardTitle className="mt-4">Document Upload</CardTitle>
            <CardDescription>Upload and manage verification documents</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Secure document storage</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Document validation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Multiple document types</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard">
                <Play className="mr-2 h-4 w-4" />
                Try Feature
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Feature 5 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline">Demo Available</Badge>
            </div>
            <CardTitle className="mt-4">Profile Management</CardTitle>
            <CardDescription>Manage your identity profile</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Personal information management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Privacy settings</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Account security settings</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard">
                <Play className="mr-2 h-4 w-4" />
                Try Feature
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Feature 6 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline">Demo Available</Badge>
            </div>
            <CardTitle className="mt-4">Verification Requests</CardTitle>
            <CardDescription>Request new identity verifications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Multiple verification types</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Request tracking</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Verification notifications</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/dashboard">
                <Play className="mr-2 h-4 w-4" />
                Try Feature
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Ready to try all features?</h2>
          <p className="text-muted-foreground">Explore our demo or create an account to save your data.</p>
        </div>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/auth/signup">Sign Up Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard">
              <Play className="mr-2 h-4 w-4" />
              Try Demo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
