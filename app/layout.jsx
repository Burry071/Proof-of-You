import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { SiteHeader } from "@/components/site-header"
import { DemoBanner } from "@/components/demo-banner"
import { DemoDataProvider } from "@/providers/demo-data-provider"
import { DemoExit } from "@/components/demo-exit"

export const metadata = {
  title: "Proof of You",
  description: "Identity verification platform",
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
            <DemoExit />
          </DemoDataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
