import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata = {
  title: "Proof of You - Demo",
  description: "Identity verification platform - Demo Version",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="bg-blue-100 border-b border-blue-200 py-2 px-4 text-center">
            <p className="text-sm">Demo Mode: This is a demonstration version with sample data.</p>
          </div>
          <header className="border-b p-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold">
                Proof of You <span className="text-xs font-normal text-gray-500">(Demo)</span>
              </h1>
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
