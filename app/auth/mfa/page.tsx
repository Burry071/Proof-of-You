"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MFAVerification() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""])
  const [error, setError] = useState<string | null>(null)
  const [timer, setTimer] = useState(30)
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()

  // Handle timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  // Handle code input change
  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  // Handle key press for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  // Handle code verification
  const verifyCode = async () => {
    const fullCode = code.join("")

    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsVerifying(true)
    setError(null)

    try {
      // In a real app, you would verify against your API
      // const response = await fetch('/api/verify-mfa', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code: fullCode }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll consider "123456" as valid
      if (fullCode === "123456") {
        router.push("/dashboard")
      } else {
        setError("Invalid verification code. Please try again.")
        setCode(["", "", "", "", "", ""])
        // Focus first input on error
        const firstInput = document.getElementById("code-0")
        if (firstInput) {
          firstInput.focus()
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  // Handle resend code
  const resendCode = async () => {
    // In a real app, you would call your API to resend the code
    // await fetch('/api/resend-mfa')

    // Reset timer
    setTimer(30)
    setError(null)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Two-Factor Authentication</CardTitle>
          <CardDescription>Enter the 6-digit code from your authenticator app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="text-center text-lg"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <p className="text-sm text-muted-foreground">
              Didn't receive a code?{" "}
              {timer > 0 ? (
                <span>Resend in {timer}s</span>
              ) : (
                <button onClick={resendCode} className="text-primary hover:underline font-medium">
                  Resend code
                </button>
              )}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={verifyCode} disabled={isVerifying || code.some((digit) => !digit)} className="w-full">
            {isVerifying ? "Verifying..." : "Verify"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
