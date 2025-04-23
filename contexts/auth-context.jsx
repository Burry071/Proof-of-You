"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)
  const [demoStartTime, setDemoStartTime] = useState(null)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user")
    const demoMode = localStorage.getItem("demo_mode") === "true"
    const storedDemoStartTime = localStorage.getItem("demo_start_time")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setIsDemo(demoMode)
    if (storedDemoStartTime) {
      setDemoStartTime(new Date(storedDemoStartTime))
    }
    setIsLoading(false)
  }, [])

  // Sign in function
  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, accept any credentials
        if (email && password) {
          const newUser = {
            ...DEMO_USER,
            email: email,
            name: email.split("@")[0],
          }

          setUser(newUser)
          localStorage.setItem("auth_user", JSON.stringify(newUser))
          localStorage.setItem("demo_mode", "false")
          setIsDemo(false)
          resolve(newUser)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 800)
    })
  }

  // Sign up function
  const signUp = (name, email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (name && email && password) {
          const newUser = {
            ...DEMO_USER,
            name: name,
            email: email,
          }

          setUser(newUser)
          localStorage.setItem("auth_user", JSON.stringify(newUser))
          localStorage.setItem("demo_mode", "false")
          setIsDemo(false)
          resolve(newUser)
        } else {
          reject(new Error("Please fill all required fields"))
        }
      }, 800)
    })
  }

  // Sign out function
  const signOut = () => {
    setUser(null)
    localStorage.removeItem("auth_user")
    localStorage.removeItem("demo_mode")
    setIsDemo(false)
    router.push("/")
  }

  // Enter demo mode
  const enterDemoMode = () => {
    setIsDemo(true)
    setDemoStartTime(new Date())
    localStorage.setItem("demo_mode", "true")
    localStorage.setItem("demo_start_time", new Date().toISOString())
  }

  // Exit demo mode
  const exitDemoMode = () => {
    setIsDemo(false)
    setDemoStartTime(null)
    localStorage.removeItem("demo_mode")
    localStorage.removeItem("demo_start_time")
  }

  const getDemoUser = () => {
    return DEMO_USER
  }

  return (
    <AuthContext.Provider
      value={{
        user: isDemo ? getDemoUser() : user,
        isAuthenticated: !!user || isDemo,
        isLoading,
        isDemo,
        demoStartTime,
        signIn,
        signUp,
        signOut,
        enterDemoMode,
        exitDemoMode,
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
