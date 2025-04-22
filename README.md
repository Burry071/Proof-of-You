Proof-of-You — Anonymous Age Verification with ZK Proofs

Live Demo: https://proof-of-you-project.vercel.app/


---

Overview

Proof-of-You is a privacy-preserving age verification system that leverages zero-knowledge proofs (ZKPs). Users can prove they are above a specific age threshold without sharing any personal information, such as their birthdate or government ID.


---

What It Does

Users input their date of birth locally (never shared or uploaded).

A ZK proof is generated that validates age eligibility.

The proof is verified using a smart contract on the Solana blockchain.

Users can share their verification via a QR code or secure link.



---

Use Cases

Age-restricted online services (alcohol, tobacco, adult content)

Online gaming with age minimums (13+, 18+)

Social platforms with age-related features

Anonymous KYC-lite scenarios in DeFi or DAOs



---

Tech Stack

zk-SNARKs (Circom + snarkjs)

Solana blockchain (Anchor framework)

Next.js frontend deployed with Vercel

Local-only data handling for user privacy



---

Features

No PII ever stored or shared

Cryptographically secure age verification

Easy-to-use UI with real-time feedback

Secure sharing of proof status



---

Getting Started

To check out the code:

git clone https://github.com/Burry071/Proof-of-you-.git
cd Proof-of-you-
npm install

This installs all dependencies. For live demo and usage, visit:
https://proof-of-you-project.vercel.app


---
© 2025 Burry071. This project is open for hackathon review only. Not licensed for reuse or distribution.



For feedback, suggestions, or contributions — feel free to open an issue or PR.
