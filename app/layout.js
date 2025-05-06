import "./globals.css"

export const metadata = {
  title: "Proof of You - Demo",
  description: "Identity verification platform - Demo Version",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-blue-100 border-b border-blue-200 py-2 px-4 text-center">
          <p className="text-sm">Demo Mode: This is a demonstration version with sample data.</p>
        </div>
        <header className="border-b p-4">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-xl font-bold">
              Proof of You <span className="text-xs font-normal text-gray-500">(Demo)</span>
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
