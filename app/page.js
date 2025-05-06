import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold mb-4">Proof of You Demo</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A privacy-preserving age verification system using zero-knowledge proofs and Solana blockchain.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Explore Demo
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Secure Verification</h2>
          <p className="text-gray-600">
            Verify your identity without revealing personal information using zero-knowledge proofs.
          </p>
        </div>
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Blockchain Powered</h2>
          <p className="text-gray-600">Leveraging Solana blockchain for secure, tamper-proof verification records.</p>
        </div>
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Privacy First</h2>
          <p className="text-gray-600">Maintain control of your personal data while still proving your identity.</p>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg my-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Demo Information</h2>
        <p className="text-gray-600 mb-4">
          This is a simplified demo version of the Proof of You platform. In this demo:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>All features are simulated with mock data</li>
          <li>No actual blockchain transactions occur</li>
          <li>No personal data is stored or transmitted</li>
          <li>The interface demonstrates the core user experience</li>
        </ul>
      </div>
    </div>
  )
}
