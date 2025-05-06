"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create context
const AuthContext = createContext(null)

// Mock user data for demo purposes
const DEMO_USER = {
  id: "demo-user-1",
  name: "Demo User",
  email: "demo@example.com",
  role: "user",
  demoData: {
    verifications: [
      {
        id: "v1",
        type: "Identity",
        status: "Verified",
        date: "2023-04-10T10:30:00Z",
        verifier: "Govt Agency X",
        documents: ["id_front", "id_back"],
      },
      {
        id: "v2",
        type: "Education",
        status: "Pending",
        date: "2023-04-15T14:20:00Z",
        verifier: "University Y",
        documents: ["diploma"],
      },
      {
        id: "v3",
        type: "Employment",
        status: "In Progress",
        date: "2023-05-01T09:15:00Z",
        verifier: "Company Z",
        documents: ["contract"],
      },
    ],
    documents: [
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
      {
        id: "diploma",
        name: "University Diploma",
        type: "application/pdf",
        uploadDate: "2023-04-12T10:45:00Z",
        status: "Under Review",
      },
      {
        id: "contract",
        name: "Employment Contract",
        type: "application/pdf",
        uploadDate: "2023-04-28T14:20:00Z",
        status: "Uploaded",
      },
    ],
    certificates: [
      {
        id: "CERT-123456",
        type: "Identity Verification",
        issuedTo: "Demo User",
        issuedBy: "Proof of You",
        issuedOn: "2023-04-10T10:30:00Z",
        expiresOn: "2024-04-10T10:30:00Z",
        status: "Valid",
      },
    ],
    notifications: [
      {
        id: "n1",
        title: "Verification Completed",
        message: "Your identity verification has been successfully completed.",
        date: "2023-04-10T10:30:00Z",
        read: true,
      },
      {
        id: "n2",
        title: "Document Uploaded",
        message: "Your university diploma has been uploaded successfully.",
        date: "2023-04-12T10:45:00Z",
        read: true,
      },
      {
        id: "n3",
        title: "Verification In Progress",
        message: "Your employment verification is now being processed.",
        date: "2023-05-01T09:15:00Z",
        read: false,
      },
    ],
  },
}

export function AuthProvider({ children }) {
  // Always start in demo mode
  const [isDemo, setIsDemo] = useState(true)
  const [demoStartTime, setDemoStartTime] = useState(new Date())

  // Set demo start time on mount
  useEffect(() => {
    setDemoStartTime(new Date())
  }, [])

  // Get demo user data
  const getDemoUser = () => {
    return DEMO_USER
  }

  return (
    <AuthContext.Provider
      value={{
        user: getDemoUser(),
        isAuthenticated: true, // Always authenticated in demo mode
        isLoading: false,
        isDemo: true, // Always in demo mode
        demoStartTime,
        getDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
