"use client"

import Link from "next/link"
import { ArrowLeft, FileText, Clock, CheckCircle } from "lucide-react"
import { DEMO_USER, formatDate } from "@/lib/utils"

export default function VerificationDetail({ params }) {
  const verificationId = params.id
  const verification = DEMO_USER.verifications.find((v) => v.id === verificationId)

  if (!verification) {
    return (
      <div className="container mx-auto p-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Verification Not Found</h1>
          <p className="text-gray-500 mb-6">The verification you're looking for doesn't exist or has been removed.</p>
          <Link href="/dashboard" className="btn btn-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Get related documents
  const documents = verification.documents
    .map((docId) => DEMO_USER.documents.find((d) => d.id === docId))
    .filter(Boolean)

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Dashboard
            </Link>
            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              <span>Demo</span>
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{verification.type} Verification</h1>
              <p className="text-gray-500">
                Requested on {formatDate(verification.date)} • Verifier: {verification.verifier}
              </p>
            </div>
            <span
              className={`badge ${
                verification.status === "Verified"
                  ? "badge-green"
                  : verification.status === "Pending"
                    ? "badge-yellow"
                    : "badge-blue"
              }`}
            >
              {verification.status}
            </span>
          </div>
        </div>

        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Verification Status</h2>
            <p className="card-description">Real-time updates for verification #{verificationId}</p>
          </div>
          <div className="card-content space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width:
                    verification.status === "Verified" ? "100%" : verification.status === "In Progress" ? "50%" : "25%",
                }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div
                className={`p-3 rounded-lg border ${verification.status !== "Pending" ? "bg-gray-100" : "border-blue-500 bg-blue-50"}`}
              >
                <div className="flex items-center space-x-2">
                  <Clock className={`h-5 w-5 ${verification.status === "Pending" ? "text-blue-500" : ""}`} />
                  <span className="font-medium">Pending</span>
                </div>
                <p className="text-sm mt-1 text-gray-500">Verification request received</p>
              </div>

              <div
                className={`p-3 rounded-lg border ${verification.status !== "In Progress" ? "bg-gray-100" : "border-blue-500 bg-blue-50"}`}
              >
                <div className="flex items-center space-x-2">
                  <Clock className={`h-5 w-5 ${verification.status === "In Progress" ? "text-blue-500" : ""}`} />
                  <span className="font-medium">In Progress</span>
                </div>
                <p className="text-sm mt-1 text-gray-500">Verifying your information</p>
              </div>

              <div
                className={`p-3 rounded-lg border ${verification.status !== "Verified" ? "bg-gray-100" : "border-green-500 bg-green-50"}`}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`h-5 w-5 ${verification.status === "Verified" ? "text-green-500" : ""}`} />
                  <span className="font-medium">Verified</span>
                </div>
                <p className="text-sm mt-1 text-gray-500">Verification complete</p>
              </div>

              <div className={`p-3 rounded-lg border bg-gray-100`}>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Rejected</span>
                </div>
                <p className="text-sm mt-1 text-gray-500">Verification unsuccessful</p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary w-full">
              {verification.status === "Verified" ? "View Certificate" : "View Details"}
            </button>
          </div>
        </div>

        <div className="card mb-6">
          <div className="card-header">
            <h2 className="card-title">Verification Documents</h2>
            <p className="card-description">Documents submitted for this verification</p>
          </div>
          <div className="card-content">
            {documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{document.name}</span>
                        <span
                          className={`badge ${
                            document.status === "Verified"
                              ? "badge-green"
                              : document.status === "Under Review"
                                ? "badge-yellow"
                                : "badge-blue"
                          }`}
                        >
                          {document.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">Uploaded on {formatDate(document.uploadDate)}</span>
                    </div>
                    <button className="mt-2 md:mt-0 btn btn-outline text-sm">View Document</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No documents found for this verification</p>
                <Link href="/documents/upload" className="btn btn-primary mt-4">
                  Upload Document
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">Verification Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full mt-0.5">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Verification Requested</div>
                <div className="text-sm text-gray-500">{formatDate(verification.date)}</div>
                <div className="text-sm mt-1">
                  {verification.type} verification requested from {verification.verifier}
                </div>
              </div>
            </div>

            {verification.status !== "Pending" && (
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full mt-0.5">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Verification In Progress</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(new Date(new Date(verification.date).getTime() + 86400000))}
                  </div>
                  <div className="text-sm mt-1">Your verification is being processed by our team</div>
                </div>
              </div>
            )}

            {verification.status === "Verified" && (
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-0.5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Verification Completed</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(new Date(new Date(verification.date).getTime() + 172800000))}
                  </div>
                  <div className="text-sm mt-1">Your {verification.type} has been successfully verified</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Demo Information</h3>
          <p className="text-sm text-gray-500">
            You're viewing a simulated verification in demo mode. This demonstrates the verification workflow including
            status tracking, document management, and timeline visualization.
          </p>
        </div>
      </div>
    </div>
  )
}
