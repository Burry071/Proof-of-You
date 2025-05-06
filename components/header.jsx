import Link from "next/link"
import { User } from "lucide-react"
import { DEMO_USER } from "@/lib/utils"

export function Header() {
  return (
    <header className="sticky top-12 z-40 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            Proof of You <span className="text-xs font-normal text-gray-500">(Demo)</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/verify" className="text-sm font-medium hover:text-blue-600">
              Verify
            </Link>
            <Link href="/documents" className="text-sm font-medium hover:text-blue-600">
              Documents
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-full px-3 py-1">
            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-3 w-3" />
            </div>
            <span className="text-sm">{DEMO_USER.name}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
