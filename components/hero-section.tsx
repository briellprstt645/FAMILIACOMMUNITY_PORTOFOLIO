"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import RotatingText from "./RotatingText"

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const DiscordIcon = () => (
  <svg className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
)

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    const rect = element.getBoundingClientRect()
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    const targetPosition = Math.max(0, rect.top + currentScrollY - 100)
    window.scrollTo({ top: targetPosition, behavior: "smooth" })
  }
}

export function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Logo */}
        <div className="flex justify-center mb-6 mt-12 animate-fade-in-badge">
          <Image
            src="/images/familia-logo.png"
            alt="Familia Community Logo"
            width={420}
            height={420}
            priority
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 object-contain drop-shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in-badge">
          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
          Roblox Creator & Game Developer
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
          <span className="text-foreground">FAMILIA COMMUNITY</span>
          <br />
          <span className="inline-flex items-center justify-center flex-wrap gap-2 mt-4 sm:mt-6 md:mt-8">
            <span className="text-foreground">Roblox</span>
            <RotatingText
              texts={["Scripting", "Building", "UI Design", "Game Systems", "Experiences"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg shadow-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-xl md:text-2xl text-white text-balance max-w-sm sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light">
          Professional Roblox Creator & Game Developer creating immersive Roblox experiences with modern scripting,
          building, UI design, and game systems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
          <Button
            size="lg"
            onClick={() => scrollToSection("#server")}
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer relative overflow-hidden"
          >
            View Portfolio
            <ArrowRight />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("#discord")}
            className="rounded-full px-8 py-4 text-lg font-medium border-border hover:bg-accent transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
          >
            <DiscordIcon />
            Join Discord
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center px-4 hidden sm:block overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white mb-6">Building immersive experiences on the Roblox platform</p>
          <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-8 opacity-60 hover:opacity-80 transition-all duration-500 animate-slide-left">
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">Roblox Studio</div>
                <div className="text-base sm:text-lg font-semibold">Scripter</div>
                <div className="text-base sm:text-lg font-semibold">GUI Design</div>
                <div className="text-base sm:text-lg font-semibold">Building</div>
                <div className="text-base sm:text-lg font-semibold">Game Systems</div>
                <div className="text-base sm:text-lg font-semibold">Optimization</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">Roblox Studio</div>
                <div className="text-base sm:text-lg font-semibold">Scripter</div>
                <div className="text-base sm:text-lg font-semibold">GUI Design</div>
                <div className="text-base sm:text-lg font-semibold">Building</div>
                <div className="text-base sm:text-lg font-semibold">Game Systems</div>
                <div className="text-base sm:text-lg font-semibold">Optimization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="text-center px-4 mb-8 sm:hidden overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white mb-6">Building immersive experiences on Roblox</p>
          <div className="relative overflow-hidden w-full max-w-sm mx-auto">
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-6 opacity-60 animate-slide-left-mobile">
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-sm font-semibold">Roblox Studio</div>
                <div className="text-sm font-semibold">Luau</div>
                <div className="text-sm font-semibold">UI Design</div>
                <div className="text-sm font-semibold">Building</div>
                <div className="text-sm font-semibold">Game Systems</div>
                <div className="text-sm font-semibold">Optimization</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-sm font-semibold">Roblox Studio</div>
                <div className="text-sm font-semibold">Luau</div>
                <div className="text-sm font-semibold">UI Design</div>
                <div className="text-sm font-semibold">Building</div>
                <div className="text-sm font-semibold">Game Systems</div>
                <div className="text-sm font-semibold">Optimization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
