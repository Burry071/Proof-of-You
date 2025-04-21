import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface GitHubButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function GitHubButton({ variant = "outline", size = "sm", className }: GitHubButtonProps) {
  const GITHUB_REPO_URL = "https://github.com/Burry071/Proof-of-you-.git"

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Link>
    </Button>
  )
}
