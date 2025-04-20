"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Copy, ExternalLink } from "lucide-react"
import { verifyProof } from "@/lib/zk-proof"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const proofParam = searchParams.get("proof")
  const ageParam = searchParams.get("age")

  const proof = proofParam ? JSON.parse(decodeURIComponent(proofParam)) : null
  const age = ageParam ? Number.parseInt(ageParam) : null

  // Simulate verification on the client side
  useEffect(() => {
    const verify = async () => {
      if (!proof || !age) {
        setIsVerified(false)
        setIsLoading(false)
        return
      }

      try {
        // Verify the proof
        const result = await verifyProof(proof, age)
        setIsVerified(result)
      } catch (err) {
        console.error(err)
        setIsVerified(false)
      } finally {
        setIsLoading(false)
      }
    }

    verify()
  }, [proof, age])

  const copyProofToClipboard = () => {
    if (proof) {
      navigator.clipboard.writeText(JSON.stringify(proof))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Generate a fake transaction ID for demo purposes
  const transactionId = "5xTR7nE9qLs2KGdAZ1VmPyXj4WBCQoHFUbgAeGNt8vJw"

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <CheckCircle className="mx-auto h-10 w-10 text-emerald-500" />
          <h1 className="text-2xl font-semibold tracking-tight">Verification Result</h1>
          <p className="text-sm text-muted-foreground">Your age verification proof has been generated</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Zero-knowledge proof verification result</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
                <p className="mt-4 text-sm text-muted-foreground">Verifying proof...</p>
              </div>
            ) : isVerified ? (
              <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/30">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-emerald-600" />
                  <p className="font-medium text-emerald-600">Verification Successful</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your age has been verified using zero-knowledge proofs. No personal information was stored or
                  transmitted.
                </p>
              </div>
            ) : (
              <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="font-medium text-red-600">Verification Failed</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  There was an issue verifying your age. Please try again.
                </p>
              </div>
            )}

            {isVerified && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Proof Hash</p>
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={copyProofToClipboard}>
                      {copied ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <p className="break-all text-xs">
                      {proof ? proof.hash.substring(0, 64) + "..." : "No proof available"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Transaction ID</p>
                  <div className="flex items-center justify-between rounded-md bg-muted p-2">
                    <p className="text-xs">{transactionId}</p>
                    <Link
                      href={`https://explorer.solana.com/tx/${transactionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-3">
                  <p className="text-xs text-muted-foreground">
                    This proof confirms that you are {age >= 18 ? "over 18" : "under 18"} years old without revealing
                    your exact age or any personal information.
                  </p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/verify">Verify Again</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
