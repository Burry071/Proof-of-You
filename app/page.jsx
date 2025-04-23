import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Proof of You</h1>
      <p className="mb-8">Identity verification platform</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
