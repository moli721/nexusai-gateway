import { auth } from "@/auth"
import { LandingNavbar } from "@/components/landing-navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { Pricing } from "@/components/landing/pricing"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"
import { ScrollProgress } from "@/components/landing/scroll-progress"
import { SearchModal } from "@/components/search-modal"
import { ChatBubble } from "@/components/chat-bubble"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-black">
      <ScrollProgress />
      <SearchModal />
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
        <DashboardPreview />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <ChatBubble />
    </div>
  )
}
