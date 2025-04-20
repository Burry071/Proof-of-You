"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Copy, Download, Share2 } from "lucide-react"
import QRCode from "react-qr-code"

interface Verification {
  id: string
  type: string
  status: "active" | "expired" | "pending"
  createdAt: string
  expiresAt: string
  transactionId: string
  proofHash: string
}

export default function SharePage() {
  const params = useParams()
  const id = params.id as string
  const [verification, setVerification] = useState<Verification | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    // In a real app, you would fetch the verification from your API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
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
      setIsLoading(false)

      // Generate share URL
      const baseUrl = window.location.origin
      setShareUrl(`${baseUrl}/verify/check/${id}`)
    }, 1000)
  }, [id])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Proof-of-You Verification",
          text: "Check my age verification proof",
          url: shareUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      copyToClipboard()
    }
  }

  const downloadQRCode = () => {
    const svg = document.getElementById("verification-qr-code")
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")

      const downloadLink = document.createElement("a")
      downloadLink.download = `verification-${id}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  if (isLoading) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading verification...</p>
        </div>
      </div>
    )
  }

  if (!verification) {
    return (
      <div className="container flex min-h-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verification Not Found</CardTitle>
            <CardDescription>The verification you're looking for doesn't exist or has expired</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container flex min-h-screen flex-col py-6">
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <Link href="/dashboard" className="mr-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Share Verification</h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{verification.type}</CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <CardDescription>Share your verification with others</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="qr-code" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qr-code">QR Code</TabsTrigger>
                <TabsTrigger value="link">Link</TabsTrigger>
              </TabsList>

              <TabsContent value="qr-code" className="flex flex-col items-center space-y-4 pt-4">
                <div className="rounded-lg bg-white p-4">
                  <QRCode id="verification-qr-code" value={shareUrl} size={200} level="H" fgColor="#10b981" />
                </div>
                <p className="text-center text-sm text-muted-foreground">Scan this QR code to verify age proof</p>
                <Button variant="outline" className="w-full" onClick={downloadQRCode}>
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </TabsContent>

              <TabsContent value="link" className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  <Button variant="outline" size="icon" onClick={copyToClipboard}>
                    {copied ? <CheckCircle className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground">Share this link to verify your age proof</p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Verification
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="w-full rounded-md bg-muted p-3">
              <p className="text-xs text-muted-foreground">
                This verification confirms that you are over 18 years old without revealing your exact age or any
                personal information. The verification is valid until{" "}
                {new Date(verification.expiresAt).toLocaleDateString()}.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
