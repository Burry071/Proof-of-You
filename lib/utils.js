import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Demo data
export const DEMO_USER = {
  name: "Demo User",
  email: "demo@example.com",
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
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}
