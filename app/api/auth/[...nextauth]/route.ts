import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

// This is a simplified version that doesn't rely on Prisma
// In a production app, you would connect to your database here

// Mock users for demonstration purposes
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    // This is a hashed version of "password123"
    passwordHash: "$2a$12$k8Y1THPAC6MN/Xh.dM/h0.3WBjAG.bjL9Dj9EJcj7jJlXyVlbmEu2",
    image: null,
  },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Find user in our mock database
          const user = users.find((user) => user.email === credentials.email)

          if (!user || !user.passwordHash) return null

          const isValid = await compare(credentials.password, user.passwordHash)

          if (!isValid) return null

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
