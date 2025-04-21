"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Loader2 } from "lucide-react"
import { generateProof } from "@/lib/zk-proof"
import { MobileHeader } from "@/components/mobile-header"
import { EmbeddedFAQ } from "@/components/embedded-faq"

export default function VerifyPage() {
  const router = useRouter()
  const [birthYear, setBirthYear] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!birthYear || !birthMonth || !birthDay) {
      setError("Please fill in all date fields")
      return
    }

    const year = Number.parseInt(birthYear)
    const month = Number.parseInt(birthMonth)
    const day = Number.parseInt(birthDay)

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      setError("Please enter valid numbers")
      return
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      setError("Please enter a valid year")
      return
    }

    if (month < 1 || month > 12) {
      setError("Please enter a valid month (1-12)")
      return
    }

    if (day < 1 || day > 31) {
      setError("Please enter a valid day (1-31)")
      return
    }

    // Calculate age
    const birthDate = new Date(year, month - 1, day)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    try {
      setIsLoading(true)

      // Generate zero-knowledge proof
      const proof = await generateProof(age)

      // Navigate to result page with the proof
      router.push(`/verify/result?proof=${encodeURIComponent(JSON.stringify(proof))}&age=${age}`)
    } catch (err) {
      console.error(err)
      setError("Failed to generate proof. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MobileHeader />
      <div className="container flex flex-1 flex-col items-center justify-center py-8 md:py-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Shield className="mx-auto h-10 w-10 text-emerald-500" />
            <h1 className="text-2xl font-semibold tracking-tight">Age Verification</h1>
            <p className="text-sm text-muted-foreground">Enter your date of birth to generate a zero-knowledge proof</p>
          </div>

          <Card>
            <form onSubmit={handleVerify}>
              <CardHeader>
                <CardTitle>Date of Birth</CardTitle>
                <CardDescription>Your information never leaves your device</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    placeholder="YYYY"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    maxLength={4}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                    <Input
                      id="month"
                      placeholder="MM"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      maxLength={2}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="day">Day</Label>
                    <Input
                      id="day"
                      placeholder="DD"
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      maxLength={2}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                </div>
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Proof...
                    </>
                  ) : (
                    "Verify Age"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking verify, you agree to our{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="mt-8 w-full">
            <h2 className="mb-4 text-center text-lg font-medium">Frequently Asked Questions</h2>
            <EmbeddedFAQ items={["data-persistence", "security"]} />
          </div>
        </div>
      </div>
    </div>
  )
}
