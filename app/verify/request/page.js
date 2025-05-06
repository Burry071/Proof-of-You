"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function VerificationRequest() {
  const [verificationType, setVerificationType] = useState("identity")
  const [name, setName] = useState("Demo User")
  const [email, setEmail] = useState("demo@example.com")
  const [details, setDetails] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!name || !email || !details) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold mb-2">Request Verification</h1>
            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              <span>Demo</span>
            </span>
          </div>
          <p className="text-gray-500">Demo Mode: Verification requests are simulated and not actually processed</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Verification Request Form</h2>
            <p className="card-description">Fill out the form below to submit your verification request</p>
          </div>
          <div className="card-content">
            {success ? (
              <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Your verification request has been submitted successfully! Redirecting to dashboard...</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Verification Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <input
                        type="radio"
                        id="identity"
                        name="verificationType"
                        value="identity"
                        checked={verificationType === "identity"}
                        onChange={(e) => setVerificationType(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="identity" className="cursor-pointer">
                        Identity Verification
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <input
                        type="radio"
                        id="education"
                        name="verificationType"
                        value="education"
                        checked={verificationType === "education"}
                        onChange={(e) => setVerificationType(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="education" className="cursor-pointer">
                        Education Credentials
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <input
                        type="radio"
                        id="employment"
                        name="verificationType"
                        value="employment"
                        checked={verificationType === "employment"}
                        onChange={(e) => setVerificationType(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="employment" className="cursor-pointer">
                        Employment Verification
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                    Verification Details
                  </label>
                  <textarea
                    id="details"
                    className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    placeholder="Please provide details about what you need verified..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows={4}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>
          <div className="card-footer">
            <p className="text-sm text-gray-500 text-center">
              In demo mode, verification requests are simulated. This demonstrates the verification request workflow.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Demo Mode Information</h3>
          <p className="text-sm text-gray-500">
            In demo mode, you can explore all features of our verification system without creating an account. Your
            actions are simulated and no actual data is stored on our servers.
          </p>
        </div>
      </div>
    </div>
  )
}
