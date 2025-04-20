"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, ExternalLink, Shield, XCircle } from "lucide-react"

interface Verification {
  id: string
  type: string
  status: "active" | "expired" | "pending"
  createdAt: string
  expiresAt: string
  transactionId: string
  proofHash: string
}

export default function VerificationCheckPage() {
  const params = useParams()
  const id = params.id as string
  const [verification, setVerification] = useState<Verification | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  useEffect(() => {
    // In a real app, you would fetch the verification from your API or blockchain
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      // Simulate 90% chance of valid verification
      const valid = Math.random() > 0.1

      if (valid) {
        const mockVerification: Verification = {
          id,
          type: "Age Verification (18+)",
          status: "active",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          transactionId: "5xTR7nE9qLs2KGdAZ1VmPyXj4WBCQoHFUbgAeGNt8vJw",
          proofHash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2",
        }

        setVerification(mockVerification)
        setIsValid(true)
      } else {
        setIsValid(false)
      }

      setIsLoading(false)
    }, 2000)
  }, [id])

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <Shield className="mx-auto h-10 w-10 text-emerald-500" />
          <h1 className="text-2xl font-semibold tracking-tight">Verification Check</h1>
          <p className="text-sm text-muted-foreground">Verifying zero-knowledge proof</p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
              <p className="mt-4 text-sm text-muted-foreground">Verifying on Solana blockchain...</p>
            </CardContent>
          </Card>
        ) : isValid ? (
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>Verification Valid</CardTitle>
                <CardDescription>This verification is valid and active</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/30">
                <p className="text-sm text-center">
                  This person has been verified to be <strong>over 18 years old</strong> using zero-knowledge proofs on
                  Solana.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Verification Type</p>
                <p className="text-sm">{verification?.type}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Valid Until</p>
                <p className="text-sm">{new Date(verification?.expiresAt || "").toLocaleDateString()}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Transaction ID</p>
                <div className="flex items-center">
                  <p className="text-sm truncate">
                    {verification?.transactionId.substring(0, 8)}...
                    {verification?.transactionId.substring((verification?.transactionId.length || 0) - 8)}
                  </p>
                  <Link
                    href={`https://explorer.solana.com/tx/${verification?.transactionId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Verification Invalid</CardTitle>
                <CardDescription>This verification is invalid or has expired</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
                <p className="text-sm text-center">
                  The verification could not be confirmed on the Solana blockchain. It may have expired or been tampered
                  with.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full" asChild>
                <Link href="/">Return Home</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/verify">Create New Verification</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
