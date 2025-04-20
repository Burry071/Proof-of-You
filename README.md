# Proof-of-You

**A zk-SNARK powered decentralized identity layer for age verification on Solana.**

Live Demo: [https://proofofyou.vercel.app](https://proofofyou.vercel.app)

---

## What is Proof-of-You?

**Proof-of-You** allows users to anonymously prove they are over a certain age (e.g., 18+) without revealing their date of birth or any personal information. It leverages **zero-knowledge proofs** (zk-SNARKs) to preserve privacy and decentralization — all built for the **Solana ecosystem**.

---

## Why It Matters

- No more over-sharing personal details for simple age checks
- Can be used in:
  - Age-restricted dApps
  - DAO voting with age criteria
  - Web3 social platforms
  - Anonymous KYC layers

---

## How It Works (Demo Flow)

1. User clicks **Start Verification**
2. A fake zk-SNARK proof is "generated"
3. Success message appears:
   > *"You are verified as 18+. No personal info shared. zk-Proof ID: #zkp8930"*

*(In a real implementation, this would interface with circom/snarkjs + Solana smart contracts)*

---

## Built With

- HTML / CSS / JavaScript
- Vercel (deployment)
- Branding & mock flow by [Burry071](https://github.com/Burry071)

---

## Vision

We imagine a future where:

- Identity is **modular**
- Privacy is **default**
- zk-proofs empower users, not just protocols

---

## License

MIT License — free to use, fork, and build on.
