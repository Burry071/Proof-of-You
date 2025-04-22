"use client"

import { useState } from "react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Download, Share2 } from "lucide-react"

interface VerificationCertificateProps {
  certificateId: string
  userName: string
  verificationDate: string
  verificationType: string
  verifier: string
}

export default function VerificationCertificate({
  certificateId,
  userName,
  verificationDate,
  verificationType,
  verifier,
}: VerificationCertificateProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const verificationUrl = `https://yourapp.com/verify/${certificateId}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Verification Certificate",
          text: `View my ${verificationType} verification certificate`,
          url: verificationUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(verificationUrl)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-2 rounded-full w-12 h-12 flex items-center justify-center">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="mt-4">{verificationType} Certificate</CardTitle>
          <CardDescription>Verified on {new Date(verificationDate).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="border p-3 rounded-lg inline-block bg-white">
            <QRCode value={verificationUrl} size={150} />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-lg">{userName}</h3>
            <p className="text-sm text-muted-foreground">Verified by {verifier}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleShare} className="w-full sm:w-auto" variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Certificate</DialogTitle>
            <DialogDescription>Share your verification certificate with others</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={verificationUrl}
                readOnly
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(verificationUrl)
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
