import { redirect } from "next/navigation"

export default function AuthRedirect() {
  // In demo mode, redirect all auth routes to home
  redirect("/")
}
