import "./globals.css"
import AuthSessionProvider from "./providers/session-provider"

export const metadata = {
  title: "Proof of You",
  description: "Identity verification platform",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}
