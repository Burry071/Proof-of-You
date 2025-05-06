"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"
import { DEMO_USER, formatDate } from "@/lib/utils"

export default function Verify() {
  const [certificateId, setCertificateId] = useState("")
  const [error, setError] = useState("")
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setResult(null)

    // Basic validation
    if (!certificateId) {
      setError("Please enter a certificate ID")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const certificate = DEMO_USER.certificates.find((c) => c.id === certificateId)

      if (certificate) {
        setResult({
          valid: true,
          certificate,
        })
      } else {
        setResult({
          valid: false,
          message: "Certificate not found or invalid",
        })
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold mb-2">Verification Certificate Checker</h1>
            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              <span>Demo</span>
            </span>
          </div>
          <p className="text-gray-500">Verify the authenticity of identity certificates issued by our platform</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Certificate Verification</h2>
            <p className="card-description">Enter a certificate ID to verify its authenticity</p>
          </div>
          <div className="card-content">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">
                  Certificate ID
                </label>
                <div className="flex space-x-2">
                  <input
                    id="certificateId"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g., CERT-123456"
                    required
                  />
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? "Checking..." : "Verify"}
                  </button>
                </div>
                <p className="text-xs text-gray-500">For demo purposes, try using "CERT-123456"</p>
              </div>
            </form>

            {result && (
              <div className="mt-6 border rounded-lg p-4">
                {result.valid ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <h3 className="font-medium text-green-700">Valid Certificate</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Certificate ID</p>
                        <p className="font-medium">{result.certificate.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium">{result.certificate.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Issued To</p>
                        <p className="font-medium">{result.certificate.issuedTo}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Issued By</p>
                        <p className="font-medium">{result.certificate.issuedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Issued On</p>
                        <p className="font-medium">{formatDate(result.certificate.issuedOn)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Expires On</p>
                        <p className="font-medium">{formatDate(result.certificate.expiresOn)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium text-green-600">{result.certificate.status}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-medium text-red-700">{result.message}</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
