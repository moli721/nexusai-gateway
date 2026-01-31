import { auth } from "@/auth"
import { LandingNavbar } from "@/components/landing-navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <LandingNavbar
        user={
          session?.user
            ? {
                name: session.user.name,
                image: session.user.image,
                username: session.user.username,
              }
            : null
        }
      />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
