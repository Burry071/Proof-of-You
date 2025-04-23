import "./globals.css"
import AuthSessionProvider from "./providers/session-provider"
import { SiteHeader } from "@/components/site-header"

export const metadata = {
  title: "Proof of You",
  description: "Identity verification platform",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <SiteHeader />
          <main>{children}</main>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
