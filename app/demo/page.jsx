"use client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Users, Play } from "lucide-react"

export default function DemoLanding() {
  const { enterDemoMode } = useAuth()
  const router = useRouter()

  const handleStartDemo = () => {
    enterDemoMode()
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Proof of You Demo</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore all features of our identity verification platform without creating an account.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Demo Mode Features</CardTitle>
            <CardDescription>
              In demo mode, you can explore all features of our platform with simulated data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Identity Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Explore our verification process with simulated verification requests and certificates.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Document Management</h3>
                <p className="text-sm text-muted-foreground">
                  Upload and manage documents in a simulated environment with instant feedback.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">User Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Experience the full user interface with pre-populated demo data.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={handleStartDemo}>
              <Play className="mr-2 h-4 w-4" />
              Start Demo
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>How Demo Mode Works</CardTitle>
              <CardDescription>Understanding the demo experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                  <span className="font-medium text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Simulated Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Demo mode uses pre-populated data to simulate a real user experience.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                  <span className="font-medium text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Full Feature Access</h4>
                  <p className="text-sm text-muted-foreground">
                    All platform features are available, but changes are not permanently saved.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                  <span className="font-medium text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium">No Account Required</h4>
                  <p className="text-sm text-muted-foreground">
                    Explore without signing up, but create an account to save your data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>Choose how you want to proceed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handleStartDemo}>
                <Play className="mr-2 h-4 w-4" />
                Start Demo Mode
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" asChild>
                  <a href="/auth/signin">Sign In</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/auth/signup">Create Account</a>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground text-center w-full">
                By using our demo, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
