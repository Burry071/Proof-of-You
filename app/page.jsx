import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Users, Play } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Secure Identity Verification for Everyone
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Proof of You provides a secure, reliable way to verify your identity online. Try our demo to experience
                all features.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">
                  <Play className="mr-2 h-4 w-4" />
                  Try Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:gap-10">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Explore all features in our interactive demo without registration.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure Verification</h3>
                <p className="text-center text-muted-foreground">
                  Industry-leading security protocols to protect your identity information.
                </p>
                <Button variant="link" asChild>
                  <Link href="/verify">Try It</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">User Dashboard</h3>
                <p className="text-center text-muted-foreground">
                  Manage your identity verifications and documents in one place.
                </p>
                <Button variant="link" asChild>
                  <Link href="/dashboard">Explore</Link>
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Easy Integration</h3>
                <p className="text-center text-muted-foreground">
                  Seamlessly connect with services that require identity verification.
                </p>
                <Button variant="link" asChild>
                  <Link href="/features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Create an account to save your data or try our demo to explore all features.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/auth/signup">Create Account</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">
                  <Play className="mr-2 h-4 w-4" />
                  Try Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
