"use client"

import { createContext, useContext, useState } from "react"
import { useAuth } from "@/contexts/auth-context"

// Create context
const DemoDataContext = createContext(null)

export function DemoDataProvider({ children }) {
  const { getDemoUser } = useAuth()
  const [localData, setLocalData] = useState({
    addedVerifications: [],
    addedDocuments: [],
  })

  // Get demo data
  const demoUser = getDemoUser()
  const demoData = demoUser?.demoData || {}

  // Demo data access functions
  const getVerifications = () => {
    return [...demoData.verifications, ...localData.addedVerifications]
  }

  const getVerificationById = (id) => {
    const allVerifications = getVerifications()
    return allVerifications.find((v) => v.id === id) || null
  }

  const getDocuments = () => {
    return [...demoData.documents, ...localData.addedDocuments]
  }

  const getDocumentById = (id) => {
    const allDocuments = getDocuments()
    return allDocuments.find((d) => d.id === id) || null
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

  // Simulated data mutation functions
  const addVerification = (verification) => {
    const newVerification = {
      ...verification,
      id: `v${Math.floor(Math.random() * 1000)}`,
    }
    setLocalData((prev) => ({
      ...prev,
      addedVerifications: [...prev.addedVerifications, newVerification],
    }))
    return newVerification
  }

  const uploadDocument = (document) => {
    const newDocument = {
      ...document,
      id: `doc_${Math.floor(Math.random() * 1000)}`,
      uploadDate: new Date().toISOString(),
      status: "Uploaded",
    }
    setLocalData((prev) => ({
      ...prev,
      addedDocuments: [...prev.addedDocuments, newDocument],
    }))
    return newDocument
  }

  return (
    <DemoDataContext.Provider
      value={{
        isDemo: true,
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
