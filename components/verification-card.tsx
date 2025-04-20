import { formatDistanceToNow, format } from "date-fns"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, ExternalLink, RefreshCw, XCircle } from "lucide-react"

interface Verification {
  id: string
  type: string
  status: "active" | "expired" | "pending"
  createdAt: string
  expiresAt: string
  transactionId: string
  proofHash: string
}

interface VerificationCardProps {
  verification: Verification
}

export function VerificationCard({ verification }: VerificationCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-500">
            <CheckCircle className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="border-destructive text-destructive">
            <XCircle className="mr-1 h-3 w-3" /> Expired
          </Badge>
        )
      default:
        return null
    }
  }

  const getTimeInfo = () => {
    if (verification.status === "active") {
      return `Expires ${formatDistanceToNow(new Date(verification.expiresAt), { addSuffix: true })}`
    } else if (verification.status === "expired") {
      return `Expired ${formatDistanceToNow(new Date(verification.expiresAt), { addSuffix: true })}`
    } else {
      return `Created ${formatDistanceToNow(new Date(verification.createdAt), { addSuffix: true })}`
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{verification.type}</CardTitle>
          {getStatusBadge(verification.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="text-sm">{format(new Date(verification.createdAt), "PPP")}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Expires</p>
            <p className="text-sm">{format(new Date(verification.expiresAt), "PPP")}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm">{getTimeInfo()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Transaction</p>
            <div className="flex items-center">
              <p className="text-sm truncate">
                {verification.transactionId.substring(0, 8)}...
                {verification.transactionId.substring(verification.transactionId.length - 8)}
              </p>
              <Link
                href={`https://explorer.solana.com/tx/${verification.transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {verification.status === "active" ? (
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/share/${verification.id}`}>Share Verification</Link>
          </Button>
        ) : verification.status === "expired" ? (
          <Button className="w-full" asChild>
            <Link href="/verify">
              <RefreshCw className="mr-2 h-4 w-4" />
              Renew Verification
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            <Clock className="mr-2 h-4 w-4" />
            Processing...
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
