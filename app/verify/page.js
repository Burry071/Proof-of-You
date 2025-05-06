export default function Verify() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Verification</h1>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
        <p className="text-blue-800">
          <strong>Demo Mode:</strong> This is a simulated verification page.
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-gray-50 p-4 border-b">
          <h2 className="font-bold">Certificate Verification</h2>
        </div>
        <div className="p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate ID</label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter certificate ID (e.g. CERT-123456)"
              className="flex-1 border rounded-l-md px-3 py-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md">Verify</button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Enter a certificate ID to verify its authenticity.</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <h2 className="font-bold">Sample Certificate</h2>
        </div>
        <div className="p-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <p className="text-green-800 font-medium">Valid Certificate</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Certificate ID</p>
              <p className="font-medium">CERT-123456</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">Identity Verification</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Issued To</p>
              <p className="font-medium">Demo User</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Issued By</p>
              <p className="font-medium">Proof of You</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Issued On</p>
              <p className="font-medium">April 10, 2023</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-green-600">Valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
