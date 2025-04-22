"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react"

type VerificationStatus = "pending" | "in_progress" | "completed" | "rejected"

interface VerificationStatusProps {
  verificationId: string
  initialStatus: VerificationStatus
}

export default function VerificationStatus({ verificationId, initialStatus }: VerificationStatusProps) {
  const [status, setStatus] = useState<VerificationStatus>(initialStatus)
  const [progress, setProgress] = useState(getProgressFromStatus(initialStatus))
  const router = useRouter()

  useEffect(() => {
    // Set up a WebSocket connection to receive real-time updates
    const ws = new WebSocket(`wss://your-api-url/verification-updates/${verificationId}`)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.status) {
        setStatus(data.status)
        setProgress(getProgressFromStatus(data.status))
      }
    }

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close()
    }
  }, [verificationId])

  function getProgressFromStatus(status: VerificationStatus): number {
    switch (status) {
      case "pending":
        return 25
      case "in_progress":
        return 50
      case "completed":
        return 100
      case "rejected":
        return 100
      default:
        return 0
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Verification Status
          <Badge
            variant={status === "completed" ? "default" : status === "rejected" ? "destructive" : "outline"}
            className="ml-2"
          >
            {status === "pending" && "Pending"}
            {status === "in_progress" && "In Progress"}
            {status === "completed" && "Verified"}
            {status === "rejected" && "Rejected"}
          </Badge>
        </CardTitle>
        <CardDescription>Real-time updates for verification #{verificationId.slice(0, 8)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className={`p-3 rounded-lg border ${status !== "pending" ? "bg-muted" : "border-blue-500 bg-blue-50"}`}>
            <div className="flex items-center space-x-2">
              <Clock className={`h-5 w-5 ${status === "pending" ? "text-blue-500" : ""}`} />
              <span className="font-medium">Pending</span>
            </div>
            <p className="text-sm mt-1 text-muted-foreground">Verification request received</p>
          </div>

          <div
            className={`p-3 rounded-lg border ${status !== "in_progress" ? "bg-muted" : "border-blue-500 bg-blue-50"}`}
          >
            <div className="flex items-center space-x-2">
              <Clock className={`h-5 w-5 ${status === "in_progress" ? "text-blue-500" : ""}`} />
              <span className="font-medium">In Progress</span>
            </div>
            <p className="text-sm mt-1 text-muted-foreground">Verifying your information</p>
          </div>

          <div
            className={`p-3 rounded-lg border ${status !== "completed" ? "bg-muted" : "border-green-500 bg-green-50"}`}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className={`h-5 w-5 ${status === "completed" ? "text-green-500" : ""}`} />
              <span className="font-medium">Verified</span>
            </div>
            <p className="text-sm mt-1 text-muted-foreground">Verification complete</p>
          </div>

          <div className={`p-3 rounded-lg border ${status !== "rejected" ? "bg-muted" : "border-red-500 bg-red-50"}`}>
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`h-5 w-5 ${status === "rejected" ? "text-red-500" : ""}`} />
              <span className="font-medium">Rejected</span>
            </div>
            <p className="text-sm mt-1 text-muted-foreground">Verification unsuccessful</p>
          </div>
        </div>

        {status === "rejected" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-red-800 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Verification Failed
            </h4>
            <p className="text-sm text-red-700 mt-1">
              We couldn't verify your information. Please check the documents you've submitted and try again.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => router.push(`/verification/${verificationId}/details`)}
          className="w-full"
          variant={status === "rejected" ? "outline" : "default"}
        >
          {status === "rejected" ? "Submit Again" : "View Details"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
