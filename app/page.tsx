import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, Eye } from "lucide-react"
import { GitHubButton } from "@/components/github-button"
import { GITHUB_REPO_URL } from "@/lib/constants"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-emerald-500" />
              <span className="font-bold">Proof-of-You</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <GitHubButton variant="ghost" />
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/verify">
                <Button size="sm">
                  Verify Age <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Anonymous Age Verification
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Prove your age without revealing your identity using zero-knowledge proofs on Solana.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/verify">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-500/0 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="h-32 w-32 text-emerald-500" />
                  </div>
                  <div className="absolute -left-4 top-1/4 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lg">
                    <Lock className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="absolute -right-4 top-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-lg">
                    <Eye className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">How It Works</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Proof-of-You uses zero-knowledge proofs to verify your age without revealing any personal information.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Privacy First</h3>
                <p className="text-center text-muted-foreground">
                  Your personal information never leaves your device. We use zk-SNARKs to verify your age without
                  storing any data.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Lock className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Blockchain Secured</h3>
                <p className="text-center text-muted-foreground">
                  Verification proofs are secured by Solana's blockchain, ensuring tamper-proof and transparent
                  verification.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Eye className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Anonymous</h3>
                <p className="text-center text-muted-foreground">
                  No wallet address tracking or personal data storage. Your identity remains completely anonymous.
                </p>
              </div>
            </div>
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 pt-8 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild>
                  <Link href="/demo">Interactive Demo</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/use-cases">Explore Use Cases</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Developer Docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/Burry071"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Burry071
            </a>
            . The source code is available on{" "}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
