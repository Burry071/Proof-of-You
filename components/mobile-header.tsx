"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ArrowRight, Github } from "lucide-react"
import { GITHUB_REPO_URL } from "@/lib/constants"
import { usePathname } from "next/navigation"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const closeSheet = () => setIsOpen(false)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Verify Age", path: "/verify" },
    { name: "Demo", path: "/demo" },
    { name: "Use Cases", path: "/use-cases" },
    { name: "FAQ", path: "/faq" },
    { name: "Documentation", path: "/docs" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Proof-of-You Logo" width={24} height={24} className="h-6 w-6" />
            <span className="font-bold">Proof-of-You</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Proof-of-You Logo" width={20} height={20} className="h-5 w-5" />
                    <span className="font-bold">Proof-of-You</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeSheet} className="h-8 w-8">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={closeSheet}
                      className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                        pathname === item.path
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button asChild>
                    <Link href="/verify" onClick={closeSheet}>
                      Verify Age <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" onClick={closeSheet}>
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="sm">
                Verify Age <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
