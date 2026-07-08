import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServerSection } from "@/components/server-section"
import { ShopSection } from "@/components/shop-section"
import { DiscordSection } from "@/components/discord-section"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#10b981", "#0891b2", "#10b981"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <AboutSection />
          <ServerSection />
          <ShopSection />
          <DiscordSection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
