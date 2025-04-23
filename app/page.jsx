import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Proof of You</h1>
      <p className="mb-8 text-center max-w-md">
        The secure identity verification platform that puts you in control of your digital identity
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/auth/signup">Get Started</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-bold text-lg mb-2">Secure Verification</h3>
          <p className="text-muted-foreground">
            Industry-leading security protocols to protect your identity information
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-bold text-lg mb-2">User Control</h3>
          <p className="text-muted-foreground">You decide who can access your verified credentials and when</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-bold text-lg mb-2">Easy Integration</h3>
          <p className="text-muted-foreground">Seamlessly connect with services that require identity verification</p>
        </div>
      </div>
    </div>
  )
}
