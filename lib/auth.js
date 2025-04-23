import { hash, compare } from "bcryptjs"

export async function hashPassword(password) {
  return await hash(password, 12)
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword)
}

// Helper to check if user is authenticated
export function isAuthenticated(session) {
  return !!session?.user
}

// Helper to check if user has admin role
export function isAdmin(session) {
  return session?.user?.role === "admin"
}
