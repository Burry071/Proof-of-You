"use client"

import { createContext, useContext, useState } from "react"

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
  },
}

export function AuthProvider({ children }) {
  const [demoStartTime] = useState(new Date())

  // Use NEXT_PUBLIC_ prefix for client-side access
  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"

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
