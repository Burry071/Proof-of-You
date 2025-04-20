import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Building, Gamepad2, Globe, ShoppingBag, Wine } from "lucide-react"

export default function UseCasesPage() {
  return (
    <div className="container flex min-h-screen flex-col py-6">
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Use Cases</h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Real-World Applications</h2>
          <p className="mt-2 text-muted-foreground">Discover how Proof-of-You can be used across various industries</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <Wine className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="mt-4">Age-Restricted Products</CardTitle>
              <CardDescription>Verify age for alcohol, tobacco, and other age-restricted products</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Online retailers can verify customer age without collecting personal information. Customers can prove
                they're of legal age without sharing their ID or birthdate.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/demo">
                  See Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <Gamepad2 className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="mt-4">Gaming & Entertainment</CardTitle>
              <CardDescription>Age verification for games, streaming services, and online content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gaming platforms and content providers can comply with age restrictions while respecting user privacy.
                Users can access age-appropriate content without sharing personal details.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/demo">
                  See Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <Globe className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="mt-4">Social Media</CardTitle>
              <CardDescription>Age verification for social platforms and online communities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Social media platforms can verify user age to comply with regulations without collecting excessive
                personal data. Users can prove their age while maintaining privacy.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/demo">
                  See Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <Building className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="mt-4">Financial Services</CardTitle>
              <CardDescription>Age verification for financial products and services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Financial institutions can verify customer age for account opening and certain financial products
                without collecting unnecessary personal information.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/demo">
                  See Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="mt-4">E-commerce</CardTitle>
              <CardDescription>Age verification for online shopping and marketplaces</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Online retailers can implement age checks for certain products while maintaining a smooth shopping
                experience. Customers can verify their age with minimal friction.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/demo">
                  See Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 rounded-lg bg-emerald-50 p-6 dark:bg-emerald-950/30">
          <h3 className="text-xl font-bold">Build Your Own Integration</h3>
          <p className="mt-2 text-muted-foreground">
            Proof-of-You provides developer tools and APIs to integrate zero-knowledge age verification into your own
            applications.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api">Explore API</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
