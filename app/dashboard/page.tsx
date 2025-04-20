"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Clock, Plus, RefreshCw } from "lucide-react"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { VerificationCard } from "@/components/verification-card"
import { connectWallet } from "@/lib/solana"

interface Verification {
  id: string
  type: string
  status: "active" | "expired" | "pending"
  createdAt: string
  expiresAt: string
  transactionId: string
  proofHash: string
}

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [verifications, setVerifications] = useState<Verification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if wallet was previously connected
    const checkWalletConnection = async () => {
      try {
        // In a real app, you would check if the user has a connected wallet
        // For demo purposes, we'll just simulate this
        const connected = localStorage.getItem("walletConnected") === "true"

        if (connected) {
          const address = await connectWallet()
          setWalletAddress(address)
          setIsConnected(true)
        }
      } catch (error) {
        console.error("Failed to check wallet connection:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkWalletConnection()
  }, [])

  useEffect(() => {
    // Fetch verifications when wallet is connected
    if (isConnected && walletAddress) {
      fetchVerifications()
    }
  }, [isConnected, walletAddress])

  const fetchVerifications = async () => {
    setIsLoading(true)

    // In a real app, you would fetch verifications from your API or blockchain
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      const mockVerifications: Verification[] = [
        {
          id: "ver_1",
          type: "Age Verification (18+)",
          status: "active",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          transactionId: "5xTR7nE9qLs2KGdAZ1VmPyXj4WBCQoHFUbgAeGNt8vJw",
          proofHash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2",
        },
        {
          id: "ver_2",
          type: "KYC Verification",
          status: "pending",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          transactionId: "7zYX8wVuTsR6qPo5nM4lK3jI2hG1fD0cB9aZ8xW7vU6t",
          proofHash: "p2o1n0m9l8k7j6i5h4g3f2e1d0c9b8a7z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1",
        },
        {
          id: "ver_3",
          type: "Age Verification (21+)",
          status: "expired",
          createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          expiresAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          transactionId: "3aB4cD5eF6gH7iJ8kL9mN0oP1qR2sT3uV4wX5yZ6aB7cD8eF9g",
          proofHash: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4z3y2x1w0v9u8t7s6r5q4p3o2n1m0l9k8",
        },
      ]

      setVerifications(mockVerifications)
      setIsLoading(false)
    }, 1500)
  }

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
    localStorage.setItem("walletConnected", "true")
    fetchVerifications()
  }

  const handleRefresh = () => {
    fetchVerifications()
  }

  return (
    <div className="container flex min-h-screen flex-col py-6">
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Verification Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={!isConnected || isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <WalletConnectButton onConnect={handleWalletConnect} />
        </div>
      </header>

      {!isConnected && !isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Connect Your Wallet</CardTitle>
              <CardDescription className="text-center">
                Connect your Solana wallet to view your verifications
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <WalletConnectButton onConnect={handleWalletConnect} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex-1">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>

            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
                  <p className="mt-4 text-sm text-muted-foreground">Loading verifications...</p>
                </div>
              </div>
            ) : (
              <>
                <TabsContent value="active" className="mt-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {verifications
                      .filter((v) => v.status === "active")
                      .map((verification) => (
                        <VerificationCard key={verification.id} verification={verification} />
                      ))}

                    <Card className="flex h-full flex-col items-center justify-center p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">Create New Verification</h3>
                      <p className="mb-4 mt-2 text-center text-sm text-muted-foreground">
                        Generate a new zero-knowledge proof for age verification
                      </p>
                      <Button asChild>
                        <Link href="/verify">Create Verification</Link>
                      </Button>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="pending" className="mt-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {verifications
                      .filter((v) => v.status === "pending")
                      .map((verification) => (
                        <VerificationCard key={verification.id} verification={verification} />
                      ))}

                    {verifications.filter((v) => v.status === "pending").length === 0 && (
                      <Card className="col-span-full flex h-64 flex-col items-center justify-center p-6">
                        <Clock className="h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No Pending Verifications</h3>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                          You don't have any pending verifications at the moment
                        </p>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="expired" className="mt-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {verifications
                      .filter((v) => v.status === "expired")
                      .map((verification) => (
                        <VerificationCard key={verification.id} verification={verification} />
                      ))}

                    {verifications.filter((v) => v.status === "expired").length === 0 && (
                      <Card className="col-span-full flex h-64 flex-col items-center justify-center p-6">
                        <CheckCircle className="h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No Expired Verifications</h3>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                          You don't have any expired verifications
                        </p>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      )}
    </div>
  )
}
