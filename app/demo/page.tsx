"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Eye, Lock, Shield } from "lucide-react"
import { ZkProofVisualizer } from "@/components/zk-proof-visualizer"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
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
          <h1 className="text-2xl font-bold">How It Works</h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Zero-Knowledge Proof Demo</CardTitle>
            <CardDescription>
              See how Proof-of-You verifies your age without revealing personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted"></div>
                <ol className="relative flex justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <li key={step} className="flex items-center justify-center">
                      <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          step === currentStep
                            ? "border-emerald-600 bg-emerald-100 text-emerald-600"
                            : step < currentStep
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-muted bg-background text-muted-foreground"
                        }`}
                      >
                        {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <Tabs value={`step-${currentStep}`} className="w-full">
              <TabsContent value="step-1" className="mt-0 space-y-4">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 md:h-48 md:w-48">
                    <Shield className="h-16 w-16 text-emerald-600 md:h-24 md:w-24" />
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-bold">Step 1: Enter Your Date of Birth</h3>
                    <p>
                      You enter your date of birth on your device. This information never leaves your browser and is
                      processed entirely on your local device.
                    </p>
                    <p>
                      Unlike traditional verification systems that store your personal data, Proof-of-You never
                      transmits or stores your actual birthdate.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2" className="mt-0 space-y-4">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 md:h-48 md:w-48">
                    <Lock className="h-16 w-16 text-emerald-600 md:h-24 md:w-24" />
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-bold">Step 2: Generate Zero-Knowledge Proof</h3>
                    <p>
                      Your browser calculates your age and generates a cryptographic zero-knowledge proof. This proof
                      can verify that you are above a certain age threshold (e.g., 18+) without revealing your actual
                      age or birthdate.
                    </p>
                    <p>
                      The proof uses advanced cryptography to create mathematical verification that is impossible to
                      reverse-engineer back to your personal information.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-3" className="mt-0 space-y-4">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 md:h-48 md:w-48">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-emerald-600 md:h-24 md:w-24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19.97 6.43l-10 4L2 8.5" />
                      <path d="M20 6L10 10l-8.5-2" />
                      <path d="M20 6v10.5c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 2 16.5V8.5" />
                      <path d="M20 13.5V6" />
                      <path d="M2 13.5V8.5" />
                      <path d="M10 10v8" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-bold">Step 3: Store Proof on Solana</h3>
                    <p>
                      The zero-knowledge proof is submitted to the Solana blockchain, creating a permanent, tamper-proof
                      record. This transaction doesn't contain any personal information, only the cryptographic proof.
                    </p>
                    <p>
                      The blockchain provides transparency and security, ensuring that the verification can't be altered
                      or forged.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-4" className="mt-0 space-y-4">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 md:h-48 md:w-48">
                    <Eye className="h-16 w-16 text-emerald-600 md:h-24 md:w-24" />
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="text-xl font-bold">Step 4: Share Your Verification</h3>
                    <p>
                      You receive a verification link or QR code that others can use to verify your age. When someone
                      checks this verification, they only see that you're above the required age threshold - not your
                      actual age or any other personal information.
                    </p>
                    <p>
                      The verification is cryptographically secure and can be validated against the Solana blockchain to
                      ensure authenticity.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>
              Previous Step
            </Button>
            <Button onClick={handleNextStep} disabled={currentStep === totalSteps}>
              Next Step
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zero-Knowledge Proof Visualization</CardTitle>
            <CardDescription>Interactive visualization of how zero-knowledge proofs work</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ZkProofVisualizer />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/verify">Try It Yourself</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
