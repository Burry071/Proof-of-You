export default function Dashboard() {
  // Mock data
  const verifications = [
    {
      id: "v1",
      type: "Identity",
      status: "Verified",
      date: "2023-04-10T10:30:00Z",
      verifier: "Govt Agency X",
    },
    {
      id: "v2",
      type: "Education",
      status: "Pending",
      date: "2023-04-15T14:20:00Z",
      verifier: "University Y",
    },
  ]

  const documents = [
    {
      id: "id_front",
      name: "ID Card (Front)",
      type: "image/jpeg",
      uploadDate: "2023-04-05T08:30:00Z",
      status: "Verified",
    },
    {
      id: "id_back",
      name: "ID Card (Back)",
      type: "image/jpeg",
      uploadDate: "2023-04-05T08:31:00Z",
      status: "Verified",
    },
  ]

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
          <p className="text-3xl font-bold">{verifications.length}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Documents</h2>
          <p className="text-3xl font-bold">{documents.length}</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Certificates</h2>
          <p className="text-3xl font-bold">1</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-gray-50 p-4 border-b">
          <h2 className="font-bold">Recent Verifications</h2>
        </div>
        <div className="divide-y">
          {verifications.map((verification) => (
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
          {documents.map((document) => (
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
