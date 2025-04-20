# Proof-of-You

## Anonymous Age Verification with Zero-Knowledge Proofs on Solana

Proof-of-You is a privacy-preserving age verification system that uses zero-knowledge proofs (zk-SNARKs) to verify a user's age without revealing any personal information or identity.

![Proof-of-You Screenshot](/placeholder.svg?height=400&width=800)

## Features

- **Privacy-First**: Your personal information never leaves your device
- **Zero-Knowledge Proofs**: Verify your age without revealing your actual birthdate
- **Solana Blockchain**: Secure and transparent verification on Solana
- **No Data Storage**: We don't store any personal data or wallet addresses
- **Anonymous**: Complete anonymity throughout the verification process

## How It Works

1. **Enter Date of Birth**: The user enters their date of birth on their device
2. **Generate Proof**: A zero-knowledge proof is generated locally that proves the user is above/below a certain age threshold without revealing the actual birthdate
3. **Verify on Solana**: The proof is verified on the Solana blockchain, creating a tamper-proof record
4. **Receive Verification**: The user receives a verification that can be used with third-party services

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Blockchain**: Solana
- **Zero-Knowledge Proofs**: zk-SNARKs
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Burry071/proof-of-you.git
   cd proof-of-you
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The application is deployed on Vercel. You can deploy your own instance by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBurry071%2Fproof-of-you)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Solana](https://solana.com/)
- [ZK-SNARKs](https://z.cash/technology/zksnarks/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Contact

Burry071 - [@Burry071](https://twitter.com/Burry071) - burry071@example.com

Project Link: [https://github.com/Burry071/proof-of-you](https://github.com/Burry071/proof-of-you)
