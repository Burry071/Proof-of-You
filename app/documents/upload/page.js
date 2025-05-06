"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { FileUp, X, FileCheck, AlertTriangle, UploadCloud } from "lucide-react"

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
    <div className="container mx-auto p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl font-bold mb-2">Upload Verification Document</h1>
            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              <span>Demo</span>
            </span>
          </div>
          <p className="text-gray-500">Demo Mode: Document uploads are simulated and not actually stored</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Upload Document</h2>
            <p className="card-description">Please upload a clear, high-quality image of your document</p>
          </div>
          <div className="card-content space-y-4">
            {success ? (
              <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                <div className="flex items-center">
                  <FileCheck className="h-5 w-5 mr-2" />
                  <span>Document uploaded successfully! Redirecting to documents page...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Document Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <input
                        type="radio"
                        id="id"
                        name="documentType"
                        value="id"
                        checked={selectedType === "id"}
                        onChange={handleTypeChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="id" className="cursor-pointer">
                        ID Card
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <input
                        type="radio"
                        id="passport"
                        name="documentType"
                        value="passport"
                        checked={selectedType === "passport"}
                        onChange={handleTypeChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="passport" className="cursor-pointer">
                        Passport
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <input
                        type="radio"
                        id="driver_license"
                        name="documentType"
                        value="driver_license"
                        checked={selectedType === "driver_license"}
                        onChange={handleTypeChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="driver_license" className="cursor-pointer">
                        Driver's License
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <input
                        type="radio"
                        id="utility_bill"
                        name="documentType"
                        value="utility_bill"
                        checked={selectedType === "utility_bill"}
                        onChange={handleTypeChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <label htmlFor="utility_bill" className="cursor-pointer">
                        Utility Bill
                      </label>
                    </div>
                  </div>
                </div>

                {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 text-center">
                      Drag and drop your document here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Accepts JPG, PNG or PDF (max 5MB)</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/jpeg,image/png,application/pdf"
                    />
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 relative">
                    <button
                      className="absolute right-2 top-2 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center"
                      onClick={clearFile}
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {preview ? (
                      <div className="flex justify-center">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt="Document preview"
                          className="max-h-48 object-contain rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-48">
                        <FileUp className="h-8 w-8 mr-2 text-gray-400" />
                        <span>{file.name}</span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center text-sm">
                      <FileCheck className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-500">
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  </div>
                )}

                {feedback.readability && (
                  <div className="space-y-3 border p-3 rounded-lg">
                    <h3 className="font-medium text-sm">Document Analysis:</h3>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div
                        className={`p-2 rounded ${feedback.readability === "good" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                      >
                        <div className="font-medium">Readability</div>
                        <div className="flex items-center mt-1">
                          {feedback.readability === "good" ? (
                            <FileCheck className="h-4 w-4 mr-1" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 mr-1" />
                          )}
                          {feedback.readability === "good" ? "Good" : "Poor quality"}
                        </div>
                      </div>

                      <div
                        className={`p-2 rounded ${feedback.authenticity === "verified" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        <div className="font-medium">Authenticity</div>
                        <div className="flex items-center mt-1">
                          {feedback.authenticity === "verified" ? (
                            <FileCheck className="h-4 w-4 mr-1" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 mr-1" />
                          )}
                          {feedback.authenticity === "verified" ? "Verified" : "Suspicious"}
                        </div>
                      </div>
                    </div>

                    {feedback.readability === "poor" && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded relative">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          <span>Please ensure your document is well-lit and all text is clearly visible.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="card-footer">
            {!success && (
              <button
                onClick={handleUpload}
                disabled={!file || !selectedType || uploading}
                className="btn btn-primary w-full"
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium mb-2">Demo Mode Information</h3>
          <p className="text-sm text-gray-500 mb-2">
            In demo mode, document uploads are simulated. You can test the upload functionality with any valid file, but
            no actual data will be stored on our servers.
          </p>
          <p className="text-sm text-gray-500">
            This demo showcases the document verification workflow including upload, analysis, and feedback.
          </p>
        </div>
      </div>
    </div>
  )
}
