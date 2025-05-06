"use client"

import { useAuth } from "@/contexts/auth-context"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
        <p className="text-blue-800">
          <strong>Demo Mode:</strong> You're viewing a simulated dashboard with sample data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Verifications</h2>
          <p className="text-3xl font-bold">{user.demoData.verifications.length}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Documents</h2>
          <p className="text-3xl font-bold">{user.demoData.documents.length}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Certificates</h2>
          <p className="text-3xl font-bold">{user.demoData.certificates.length}</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-gray-50 p-4 border-b">
          <h2 className="font-bold">Recent Verifications</h2>
        </div>
        <div className="divide-y">
          {user.demoData.verifications.map((verification) => (
            <div key={verification.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{verification.type} Verification</p>
                <p className="text-sm text-gray-500">
                  {new Date(verification.date).toLocaleDateString()} • {verification.verifier}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  verification.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {verification.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <h2 className="font-bold">Your Documents</h2>
        </div>
        <div className="divide-y">
          {user.demoData.documents.map((document) => (
            <div key={document.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{document.name}</p>
                <p className="text-sm text-gray-500">Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  document.status === "Verified" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {document.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
