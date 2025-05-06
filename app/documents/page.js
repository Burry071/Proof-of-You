export default function Documents() {
  // Mock data
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
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
        <p className="text-blue-800">
          <strong>Demo Mode:</strong> This is a simulated documents page.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <a href="/documents/upload" className="bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center">
          Upload Document
        </a>
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
