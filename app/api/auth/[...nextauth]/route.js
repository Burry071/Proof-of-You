import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Simple in-memory user database
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password123",
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
        const user = users.find((user) => user.email === credentials?.email && user.password === credentials?.password)

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: "your-secret-key-change-this",
})

export { handler as GET, handler as POST }
