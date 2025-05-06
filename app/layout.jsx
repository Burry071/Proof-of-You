import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { SiteHeader } from "@/components/site-header"
import { DemoBanner } from "@/components/demo-banner"
import { DemoDataProvider } from "@/providers/demo-data-provider"

// Safe access to environment variables
const metadataBase = new URL(
  process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000",
)

export const metadata = {
  title: "Proof of You - Demo",
  description: "Identity verification platform - Demo Version",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DemoDataProvider>
            <DemoBanner />
            <SiteHeader />
            <main>{children}</main>
          </DemoDataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
