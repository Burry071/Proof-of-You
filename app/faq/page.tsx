import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { FAQSection } from "@/components/faq-section"
import { MobileHeader } from "@/components/mobile-header"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MobileHeader />
      <div className="container flex flex-1 flex-col py-6">
        <div className="mb-6 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <FAQSection />

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Have more questions? Check our{" "}
              <Link href="/docs" className="text-primary underline underline-offset-4">
                documentation
              </Link>{" "}
              or{" "}
              <Link
                href="https://github.com/Burry071/Proof-of-you-"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                GitHub repository
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
