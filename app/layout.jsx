import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { SiteHeader } from "@/components/site-header"
import { DemoBanner } from "@/components/demo-banner"
import { DemoDataProvider } from "@/providers/demo-data-provider"

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
