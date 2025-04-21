"use client"

import type React from "react"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
}

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs: FAQItem[] = [
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
            <li>
              <strong>Verification records:</strong> Minimal metadata about verifications (timestamps, expiration) is
              stored in Program Derived Addresses (PDAs) on Solana.
            </li>
          </ul>
          <p>
            This approach ensures data integrity while maximizing privacy, as no centralized database stores your
            personal information.
          </p>
        </div>
      ),
    },
    {
      id: "zk-proofs",
      question: "How do zero-knowledge proofs work in this application?",
      answer: (
        <div className="space-y-2">
          <p>
            Our implementation uses zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) to verify
            age without revealing birthdate data:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>You input your birthdate locally in your browser</li>
            <li>
              Our client-side code calculates your age and constructs a circuit that proves the statement "I am at least
              X years old" without revealing your actual birthdate
            </li>
            <li>Your browser generates a cryptographic proof using the Groth16 proving system</li>
            <li>
              This proof, along with public inputs (the age threshold, e.g., 18+), is submitted to our Solana program
            </li>
            <li>The verifier contract on Solana validates the proof cryptographically</li>
            <li>If valid, a verification credential is issued as an on-chain record</li>
          </ol>
          <p>
            The mathematical foundation relies on elliptic curve pairings and polynomial commitments that allow
            verification of computational integrity without revealing the private inputs.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      question: "How do you ensure the security of the verification process?",
      answer: (
        <div className="space-y-2">
          <p>Security is paramount in our implementation. We've taken several measures:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              We use established libraries for cryptographic operations rather than implementing primitives ourselves
            </li>
            <li>Our circuits undergo formal verification to ensure mathematical correctness</li>
            <li>We implement defense-in-depth with multiple validation layers</li>
            <li>We use constant-time operations to prevent timing attacks</li>
            <li>All user inputs are sanitized and validated before entering the proving system</li>
            <li>We've conducted security audits of our circuits and verification logic</li>
            <li>We follow the principle of least privilege in our Solana program</li>
          </ul>
          <p>
            Additionally, we've implemented circuit-specific security measures like range constraints to prevent
            overflow attacks and proper input validation to prevent malleability issues.
          </p>
        </div>
      ),
    },
    {
      id: "solana-integration",
      question: "How does the solution integrate with Solana specifically?",
      answer: (
        <div className="space-y-2">
          <p>Our Solana integration works on multiple levels:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Smart Contract:</strong> We've developed a Rust-based Solana program that handles proof
              verification and credential issuance
            </li>
            <li>
              <strong>Transaction Management:</strong> We use @solana/web3.js for transaction creation, signing, and
              submission
            </li>
            <li>
              <strong>Wallet Integration:</strong> We integrate with popular Solana wallets via @solana/wallet-adapter
            </li>
            <li>
              <strong>Account Structure:</strong> We use PDAs (Program Derived Addresses) to store verification records,
              indexed by user and service
            </li>
            <li>
              <strong>Cost Efficiency:</strong> Our program minimizes on-chain storage by using Merkle trees for
              verification batching
            </li>
            <li>
              <strong>Compression:</strong> We utilize Solana's account compression for storing large numbers of
              verifications efficiently
            </li>
          </ul>
          <p>
            The verification flow involves the client generating a proof, the wallet signing a transaction containing
            that proof, and our Solana program verifying the proof on-chain before issuing a credential.
          </p>
        </div>
      ),
    },
    {
      id: "privacy-limitations",
      question: "What are the privacy limitations of your approach?",
      answer: (
        <div className="space-y-2">
          <p>While our approach significantly improves privacy, we're transparent about its limitations:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Wallet Association:</strong> A user's verifications are associated with their Solana wallet,
              creating a potential correlation vector
            </li>
            <li>
              <strong>Metadata Leakage:</strong> Transaction metadata could potentially reveal patterns even without
              revealing the actual birthdate
            </li>
            <li>
              <strong>Side-Channel Risks:</strong> Timing attacks could potentially narrow down age ranges in some
              implementations
            </li>
            <li>
              <strong>Trusted Setup:</strong> zk-SNARKs require a trusted setup phase, which introduces a trust
              assumption
            </li>
          </ul>
          <p>
            We mitigate these through optional wallet rotation recommendations, minimal on-chain metadata, constant-time
            operations for sensitive calculations, and using well-established trusted setups with multiple participants.
          </p>
        </div>
      ),
    },
    {
      id: "offline-usage",
      question: "Can I use the verification system offline?",
      answer: (
        <div className="space-y-2">
          <p>The Proof-of-You system has both online and offline components:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Proof Generation:</strong> Can be performed offline on your device
            </li>
            <li>
              <strong>Proof Verification:</strong> Requires an internet connection to interact with the Solana
              blockchain
            </li>
            <li>
              <strong>Verification Sharing:</strong> Generated QR codes can be saved and shared offline
            </li>
            <li>
              <strong>Verification Checking:</strong> Requires an internet connection to validate against the blockchain
            </li>
          </ul>
          <p>
            We're developing an offline verification mode that uses locally cached verification data with cryptographic
            timestamps, but this will have a more limited trust model than the fully online verification.
          </p>
        </div>
      ),
    },
  ]

  const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Technical FAQ</CardTitle>
        <CardDescription>Common technical questions about the Proof-of-You system</CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search questions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No questions found matching your search.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different search term or browse all questions by clearing the search.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
