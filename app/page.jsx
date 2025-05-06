import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Proof of You Demo
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our secure identity verification platform. This demo provides full access to all features with
                sample data.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">Explore Dashboard</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/verify">Try Verification</Link>
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
                All features are fully functional in this demo. Explore everything without restrictions.
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
                <h3 className="text-xl font-bold">Document Management</h3>
                <p className="text-center text-muted-foreground">Upload and manage verification documents securely.</p>
                <Button variant="link" asChild>
                  <Link href="/documents/upload">Try It</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Info Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About This Demo</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                This is a fully functional demonstration of the Proof of You platform. All features are accessible and
                work with sample data.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">What You Can Do</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>• Explore the user dashboard</li>
                  <li>• View and manage sample verifications</li>
                  <li>• Upload and manage documents</li>
                  <li>• Check verification certificates</li>
                  <li>• Request new verifications</li>
                </ul>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Demo Limitations</h3>
                <ul className="text-sm text-muted-foreground text-left space-y-2">
                  <li>• Data is not permanently stored</li>
                  <li>• Sample data is reset on page refresh</li>
                  <li>• External integrations are simulated</li>
                  <li>• Email notifications are not sent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
