"use client"

import Link from "next/link"
import { FileText, Upload } from "lucide-react"
import { DEMO_USER, formatDate } from "@/lib/utils"

export default function Documents() {
  const { documents } = DEMO_USER

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Your Documents</h1>
              <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                <span>Demo</span>
              </span>
            </div>
            <p className="text-gray-500">Manage your verification documents</p>
          </div>
          <Link href="/documents/upload" className="btn btn-primary">
            <Upload className="mr-2 h-4 w-4" /> Upload Document
          </Link>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">All Documents</h2>
            <p className="card-description">View and manage your uploaded documents</p>
          </div>
          <div className="card-content">
            {documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded">
                        <FileText className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
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
                        <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-500">
                          <span>Type: {document.type}</span>
                          <span>Uploaded: {formatDate(document.uploadDate)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0">
                      <button className="btn btn-outline text-sm">View</button>
                      <button className="btn btn-outline text-sm">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <FileText className="mx-auto h-10 w-10 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium">No documents uploaded</h3>
                  <p className="mt-1 text-sm text-gray-500">Upload documents to request verification</p>
                  <div className="mt-4">
                    <Link href="/documents/upload" className="btn btn-primary text-sm">
                      Upload Document
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Demo Information</h3>
          <p className="text-sm text-gray-500">
            This is a demo version. Document uploads are simulated and not actually stored. In a real application,
            documents would be securely stored and processed for verification.
          </p>
        </div>
      </div>
    </div>
  )
}
