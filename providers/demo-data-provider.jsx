"use client"

import { createContext, useContext } from "react"
import { useAuth } from "@/contexts/auth-context"

// Create context
const DemoDataContext = createContext(null)

export function DemoDataProvider({ children }) {
  const { isDemo, getDemoUser } = useAuth()

  // Get demo data if in demo mode
  const demoUser = isDemo ? getDemoUser() : null
  const demoData = demoUser?.demoData || {}

  // Demo data access functions
  const getVerifications = () => {
    return demoData.verifications || []
  }

  const getVerificationById = (id) => {
    return demoData.verifications?.find((v) => v.id === id) || null
  }

  const getDocuments = () => {
    return demoData.documents || []
  }

  const getDocumentById = (id) => {
    return demoData.documents?.find((d) => d.id === id) || null
  }

  const getCertificates = () => {
    return demoData.certificates || []
  }

  const getCertificateById = (id) => {
    return demoData.certificates?.find((c) => c.id === id) || null
  }

  const getNotifications = () => {
    return demoData.notifications || []
  }

  // Simulated data mutation functions (these don't actually persist data)
  const addVerification = (verification) => {
    // In a real app, this would add to the database
    console.log("Demo: Adding verification", verification)
    return { ...verification, id: `v${Math.floor(Math.random() * 1000)}` }
  }

  const uploadDocument = (document) => {
    // In a real app, this would upload to storage
    console.log("Demo: Uploading document", document)
    return { ...document, id: `doc_${Math.floor(Math.random() * 1000)}` }
  }

  return (
    <DemoDataContext.Provider
      value={{
        isDemo,
        getVerifications,
        getVerificationById,
        getDocuments,
        getDocumentById,
        getCertificates,
        getCertificateById,
        getNotifications,
        addVerification,
        uploadDocument,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  )
}

export function useDemoData() {
  const context = useContext(DemoDataContext)
  if (context === null) {
    throw new Error("useDemoData must be used within a DemoDataProvider")
  }
  return context
}
