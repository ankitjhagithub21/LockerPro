import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { LockIcon, ShieldIcon, KeyIcon, ZapIcon } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background px-5 to-muted/20">
      {/* Navigation */}


      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center justify-center py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Secure Your Digital Life with{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              LockerPro
            </span>
          </h1>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            The most secure and intuitive password manager for individuals and teams.
            Never forget a password again while keeping your data safe.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              How It Works
            </Button>
          </div>
        </div>

        <div className="mt-16 rounded-xl border bg-background p-1 shadow-2xl shadow-primary/20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full overflow-hidden rounded-lg border shadow-md">
              <Image
                src="/dashboard.jpg"
                alt="LockerPro dashboard preview"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Powerful Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to manage your passwords securely
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <LockIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Military-Grade Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AES-256 encryption keeps your passwords safe from hackers and breaches.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ZapIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">One-Click Autofill</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Login to any website with a single click. Works across all your devices.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ShieldIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="mt-4">Dark Web Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We scan the dark web and alert you if your data appears in breaches.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl rounded-xl bg-background p-8 shadow-lg">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold">Ready to secure your passwords?</h3>
                <p className="text-muted-foreground">
                  Join thousands of users who trust LockerPro with their digital security.
                </p>
              </div>
              <Button size="lg" className="px-8">
                Get Started - It's Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  )
}