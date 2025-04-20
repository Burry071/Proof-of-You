"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet } from "lucide-react"
import { connectWallet } from "@/lib/solana"

interface WalletConnectButtonProps {
  onConnect?: (address: string) => void
}

export function WalletConnectButton({ onConnect }: WalletConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleConnect = async () => {
    try {
      setIsConnecting(true)
      const address = await connectWallet()
      setWalletAddress(address)
      if (onConnect) {
        onConnect(address)
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  if (walletAddress) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Wallet className="mr-2 h-4 w-4" />
        {walletAddress.substring(0, 4)}...{walletAddress.substring(walletAddress.length - 4)}
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}
