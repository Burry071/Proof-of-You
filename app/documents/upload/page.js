"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export default function DocumentUpload() {
  const [selectedType, setSelectedType] = useState("id")
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [feedback, setFeedback] = useState({
    readability: null,
    authenticity: null,
    isComplete: null,
  })

  const fileInputRef = useRef(null)
  const router = useRouter()

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setError(null)

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a JPG, PNG or PDF file")
      return
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    setFile(selectedFile)

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0]

      // Create a new event and set the file
      const fileInputEvent = {
        target: {
          files: e.dataTransfer.files,
        },
      }

      handleFileChange(fileInputEvent)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleUpload = async () => {
    if (!file || !selectedType) return

    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setUploadProgress(i)
      }

      // Simulate document verification check
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate document feedback
      setFeedback({
        readability: Math.random() > 0.3 ? "good" : "poor",
        authenticity: Math.random() > 0.2 ? "verified" : "suspicious",
        isComplete: Math.random() > 0.1,
      })

      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/documents")
      }, 3000)
    } catch (error) {
      setError("An error occurred during upload. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Document</h1>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
        <p className="text-blue-800">
          <strong>Demo Mode:</strong> Document uploads are simulated and not actually stored.
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <h2 className="font-bold">Upload Verification Document</h2>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="border rounded-md p-3">
                <label className="flex items-center">
                  <input type="radio" name="documentType" className="mr-2" defaultChecked />
                  <span>ID Card</span>
                </label>
              </div>
              <div className="border rounded-md p-3">
                <label className="flex items-center">
                  <input type="radio" name="documentType" className="mr-2" />
                  <span>Passport</span>
                </label>
              </div>
              <div className="border rounded-md p-3">
                <label className="flex items-center">
                  <input type="radio" name="documentType" className="mr-2" />
                  <span>Driver's License</span>
                </label>
              </div>
              <div className="border rounded-md p-3">
                <label className="flex items-center">
                  <input type="radio" name="documentType" className="mr-2" />
                  <span>Utility Bill</span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-500 text-center">Drag and drop your document here or click to browse</p>
            <p className="text-xs text-gray-500 mt-2">Accepts JPG, PNG or PDF (max 5MB)</p>
          </div>

          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md">Upload Document</button>
        </div>
      </div>
    </div>
  )
}
