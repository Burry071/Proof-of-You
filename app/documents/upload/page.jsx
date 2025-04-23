"use client"

import Link from "next/link"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useDemoData } from "@/providers/demo-data-provider"
import { DemoIndicator } from "@/components/demo-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileUp, X, FileCheck, AlertTriangle, UploadCloud } from "lucide-react"

export default function DocumentUpload() {
  const { isAuthenticated, isDemo, enterDemoMode } = useAuth()
  const { uploadDocument } = useDemoData()
  const router = useRouter()

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

  // If not authenticated and not in demo mode, enter demo mode automatically
  useEffect(() => {
    if (!isAuthenticated && !isDemo) {
      enterDemoMode()
    }
  }, [isAuthenticated, isDemo, enterDemoMode])

  const handleTypeChange = (value) => {
    setSelectedType(value)
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

      // In demo mode, use the demo data provider
      const documentData = {
        name: file.name,
        type: file.type,
        size: file.size,
        documentType: selectedType,
      }

      uploadDocument(documentData)
      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard")
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
            {isDemo && <DemoIndicator />}
          </div>
          <p className="text-muted-foreground">
            {isDemo
              ? "Demo Mode: Document uploads are simulated and not actually stored"
              : "Upload your documents for verification"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Please upload a clear, high-quality image of your document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success ? (
              <Alert className="bg-green-50 border-green-200">
                <FileCheck className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  Document uploaded successfully! Redirecting to dashboard...
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <RadioGroup value={selectedType} onValueChange={handleTypeChange} className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="id" id="id" />
                      <Label htmlFor="id" className="cursor-pointer">
                        ID Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="passport" id="passport" />
                      <Label htmlFor="passport" className="cursor-pointer">
                        Passport
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="driver_license" id="driver_license" />
                      <Label htmlFor="driver_license" className="cursor-pointer">
                        Driver's License
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="utility_bill" id="utility_bill" />
                      <Label htmlFor="utility_bill" className="cursor-pointer">
                        Utility Bill
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-48 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground text-center">
                      Drag and drop your document here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Accepts JPG, PNG or PDF (max 5MB)</p>
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
                    <Button
                      size="icon"
                      variant="outline"
                      className="absolute right-2 top-2 h-6 w-6"
                      onClick={clearFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>

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
                        <FileUp className="h-8 w-8 mr-2 text-muted-foreground" />
                        <span>{file.name}</span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center text-sm">
                      <FileCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {feedback.readability && (
                  <div className="space-y-3 border p-3 rounded-lg">
                    <h3 className="font-medium text-sm">Document Analysis:</h3>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div
                        className={`p-2 rounded ${feedback.readability === "good" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
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
                        className={`p-2 rounded ${feedback.authenticity === "verified" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
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
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Please ensure your document is well-lit and all text is clearly visible.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
          <CardFooter>
            {!success && (
              <Button onClick={handleUpload} disabled={!file || !selectedType || uploading} className="w-full">
                {uploading ? "Uploading..." : "Upload Document"}
              </Button>
            )}
          </CardFooter>
        </Card>

        {isDemo && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Demo Mode Information</h3>
            <p className="text-sm text-muted-foreground mb-2">
              In demo mode, document uploads are simulated. You can test the upload functionality with any valid file,
              but no actual data will be stored on our servers.
            </p>
            <p className="text-sm text-muted-foreground">
              To save your documents and use the full functionality, please{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                create an account
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
