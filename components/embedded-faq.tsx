"use client"

import type React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
}

interface EmbeddedFAQProps {
  items?: string[]
  showViewAllLink?: boolean
}

export function EmbeddedFAQ({ items = [], showViewAllLink = true }: EmbeddedFAQProps) {
  // Common FAQs that might be relevant to embed in various pages
  const allFaqs: FAQItem[] = [
    {
      id: "data-persistence",
      question: "How does the project handle data persistence and storage?",
      answer: (
        <div className="space-y-2">
          <p>
            Proof-of-You is designed with a privacy-first approach to data storage. We utilize a combination of
            client-side storage and Solana blockchain for data persistence:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Personal data:</strong> Your personal information (like birthdate) never leaves your device and is
              not stored anywhere.
            </li>
            <li>
              <strong>Verification proofs:</strong> Zero-knowledge proofs are stored on the Solana blockchain as
              immutable records, containing no personal information.
            </li>
            <li>
              <strong>User preferences:</strong> Basic settings are stored in your browser's localStorage for
              convenience.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "zk-proofs",
      question: "How do zero-knowledge proofs work in this application?",
      answer: (
        <p>
          Our implementation uses zk-SNARKs to verify age without revealing birthdate data. You input your birthdate
          locally, our client-side code calculates your age and generates a cryptographic proof that you're above a
          certain age threshold without revealing your actual birthdate. This proof is then verified on the Solana
          blockchain.
        </p>
      ),
    },
    {
      id: "security",
      question: "How do you ensure the security of the verification process?",
      answer: (
        <p>
          Security is paramount in our implementation. We use established cryptographic libraries, implement multiple
          validation layers, conduct security audits, and follow the principle of least privilege in our Solana program.
          All user inputs are sanitized and validated before entering the proving system.
        </p>
      ),
    },
    {
      id: "offline-usage",
      question: "Can I use the verification system offline?",
      answer: (
        <p>
          Proof generation can be performed offline on your device, but proof verification requires an internet
          connection to interact with the Solana blockchain. Generated QR codes can be saved and shared offline, but
          verification checking requires an internet connection.
        </p>
      ),
    },
  ]

  // Filter FAQs based on provided items, or show all if no items specified
  const displayFaqs = items.length > 0 ? allFaqs.filter((faq) => items.includes(faq.id)) : allFaqs.slice(0, 3) // Show first 3 by default

  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        {displayFaqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {showViewAllLink && (
        <div className="mt-4 text-center">
          <Link href="/faq" className="text-sm text-primary underline underline-offset-4">
            View all frequently asked questions
          </Link>
        </div>
      )}
    </div>
  )
}
