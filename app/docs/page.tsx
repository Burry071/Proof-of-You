import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Github } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="container flex min-h-screen flex-col py-6">
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Documentation</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="https://github.com/Burry071/Proof-of-you-.git" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Developer Documentation</h2>
          <p className="mt-2 text-muted-foreground">Learn how to integrate Proof-of-You into your applications</p>
        </div>

        <Tabs defaultValue="getting-started" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-bold">Introduction</h3>
              <p className="mt-2 text-muted-foreground">
                Proof-of-You is a privacy-preserving age verification system that uses zero-knowledge proofs to verify a
                user's age without revealing any personal information.
              </p>

              <h4 className="mt-6 text-lg font-semibold">Prerequisites</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
                <li>Node.js 18+ and npm/yarn</li>
                <li>Basic knowledge of React and Next.js</li>
                <li>Familiarity with Solana blockchain (for advanced usage)</li>
              </ul>

              <h4 className="mt-6 text-lg font-semibold">Installation</h4>
              <div className="mt-2 rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm">npm install @proof-of-you/sdk</code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h4 className="mt-6 text-lg font-semibold">Quick Start</h4>
              <div className="mt-2 rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm">
                    import {"{"} AgeVerifier {"}"} from '@proof-of-you/sdk';
                    <br />
                    <br />
                    // Initialize the verifier
                    <br />
                    const verifier = new AgeVerifier();
                    <br />
                    <br />
                    // Generate a proof
                    <br />
                    const proof = await verifier.generateProof(birthDate, 18);
                    <br />
                    <br />
                    // Verify the proof
                    <br />
                    const isValid = await verifier.verifyProof(proof);
                  </code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-bold">Core Concepts</h3>

              <h4 className="mt-4 text-lg font-semibold">Zero-Knowledge Proofs</h4>
              <p className="mt-2 text-muted-foreground">
                Zero-knowledge proofs allow one party (the prover) to prove to another party (the verifier) that a
                statement is true without revealing any additional information beyond the validity of the statement
                itself.
              </p>

              <h4 className="mt-6 text-lg font-semibold">Age Verification Flow</h4>
              <ol className="mt-2 list-inside list-decimal space-y-2 text-muted-foreground">
                <li>User enters their date of birth on their device</li>
                <li>The SDK generates a zero-knowledge proof that the user is above a certain age threshold</li>
                <li>The proof is submitted to the Solana blockchain for verification</li>
                <li>A verification token is generated that can be shared with third parties</li>
              </ol>

              <h4 className="mt-6 text-lg font-semibold">Privacy Guarantees</h4>
              <p className="mt-2 text-muted-foreground">
                Proof-of-You never stores or transmits the user's actual birthdate. The zero-knowledge proof only
                verifies that the user is above or below a certain age threshold without revealing the exact age.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-bold">Integration Guide</h3>
              <p className="mt-2 text-muted-foreground">Learn how to integrate Proof-of-You into your application.</p>

              <h4 className="mt-6 text-lg font-semibold">React Component</h4>
              <div className="mt-2 rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm">
                    import {"{"} AgeVerificationButton {"}"} from '@proof-of-you/react';
                    <br />
                    <br />
                    function MyComponent() {"{"}
                    <br />
                    &nbsp;&nbsp;const handleVerification = (result) => {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;if (result.verified) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// User is verified
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('User is verified:', result.proof);
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{"}"}
                    <br />
                    &nbsp;&nbsp;{"}"};<br />
                    <br />
                    &nbsp;&nbsp;return (<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;AgeVerificationButton
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;threshold={"{"}18{"}"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onVerification={"{"}handleVerification{"}"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;buttonText="Verify Age"
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;/&gt;
                    <br />
                    &nbsp;&nbsp;);
                    <br />
                    {"}"}
                  </code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h4 className="mt-6 text-lg font-semibold">API Integration</h4>
              <div className="mt-2 rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm">
                    // Server-side verification
                    <br />
                    import {"{"} verifyProof {"}"} from '@proof-of-you/server';
                    <br />
                    <br />
                    app.post('/verify', async (req, res) => {"{"}
                    <br />
                    &nbsp;&nbsp;const {"{"} proof {"}"} = req.body;
                    <br />
                    <br />
                    &nbsp;&nbsp;try {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;const result = await verifyProof(proof);
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;res.json({"{"} verified: result {"}"});
                    <br />
                    &nbsp;&nbsp;{"}"} catch (error) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;res.status(400).json({"{"} error: error.message {"}"});
                    <br />
                    &nbsp;&nbsp;{"}"}
                    <br />
                    {"}"});
                  </code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h4 className="mt-6 text-lg font-semibold">Solana Integration</h4>
              <div className="mt-2 rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm">
                    import {"{"} Connection, PublicKey {"}"} from '@solana/web3.js';
                    <br />
                    import {"{"} SolanaVerifier {"}"} from '@proof-of-you/solana';
                    <br />
                    <br />
                    // Initialize Solana connection
                    <br />
                    const connection = new Connection('https://api.mainnet-beta.solana.com');
                    <br />
                    const programId = new PublicKey('YOUR_PROGRAM_ID');
                    <br />
                    <br />
                    // Initialize the verifier
                    <br />
                    const verifier = new SolanaVerifier({"{"} connection, programId {"}"});
                    <br />
                    <br />
                    // Verify a proof on-chain
                    <br />
                    const txId = await verifier.verifyProofOnChain(proof);
                  </code>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-bold">API Reference</h3>
              <p className="mt-2 text-muted-foreground">Complete reference for the Proof-of-You SDK and API.</p>

              <h4 className="mt-6 text-lg font-semibold">AgeVerifier Class</h4>
              <div className="mt-2 space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h5 className="font-medium">
                    generateProof(birthDate: Date, threshold: number): Promise&lt;Proof&gt;
                  </h5>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Generates a zero-knowledge proof that the user is above the specified age threshold.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Parameters:</p>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      <li>birthDate: Date - The user's date of birth</li>
                      <li>threshold: number - The age threshold to verify against (e.g., 18, 21)</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Returns:</p>
                    <p className="text-sm text-muted-foreground">
                      A Promise that resolves to a Proof object containing the zero-knowledge proof.
                    </p>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h5 className="font-medium">verifyProof(proof: Proof): Promise&lt;boolean&gt;</h5>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Verifies a zero-knowledge proof to confirm that the user is above the specified age threshold.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Parameters:</p>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      <li>proof: Proof - The zero-knowledge proof to verify</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Returns:</p>
                    <p className="text-sm text-muted-foreground">
                      A Promise that resolves to a boolean indicating whether the proof is valid.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="mt-6 text-lg font-semibold">REST API</h4>
              <div className="mt-2 space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h5 className="font-medium">POST /api/verify</h5>
                  <p className="mt-1 text-sm text-muted-foreground">Verifies a zero-knowledge proof.</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Request Body:</p>
                    <pre className="mt-1 rounded bg-slate-800 p-2 text-xs text-white">
                      {`{
  "proof": {
    "hash": "string",
    "publicSignals": [number],
    "age": number
  }
}`}
                    </pre>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Response:</p>
                    <pre className="mt-1 rounded bg-slate-800 p-2 text-xs text-white">
                      {`{
  "verified": boolean,
  "transactionId": "string" // Solana transaction ID if verified on-chain
}`}
                    </pre>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h5 className="font-medium">GET /api/verification/:id</h5>
                  <p className="mt-1 text-sm text-muted-foreground">Retrieves the status of a verification.</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Parameters:</p>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      <li>id: string - The verification ID</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Response:</p>
                    <pre className="mt-1 rounded bg-slate-800 p-2 text-xs text-white">
                      {`{
  "id": "string",
  "status": "active" | "expired" | "pending",
  "type": "string",
  "createdAt": "string",
  "expiresAt": "string",
  "transactionId": "string"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
