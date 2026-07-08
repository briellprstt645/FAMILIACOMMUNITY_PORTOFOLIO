"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check, ExternalLink } from "lucide-react"

const DISCORD_INVITE = "https://discord.gg/n2FyrVNPuW"

const DiscordLogo = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

export function DiscordSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_INVITE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable, ignore
    }
  }

  return (
    <section id="discord" ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-4 mb-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 sm:mb-14 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <DiscordLogo className="w-4 h-4 mr-2 text-emerald-300" />
            Discord Community
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 sm:mb-6">
            Discord{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              FAMILIA COMMUNITY
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            Our Discord is the home base for everyone who plays, builds, and grows with Familia. Get first looks at
            new checkpoints and system maps, join community events and summit runs, grab support tickets for your
            purchases, and connect with builders, streamers, and fellow racers who share the same obby-obsessed
            energy.
          </p>
        </div>

        {/* CTA panel */}
        <div
          className={`relative text-center p-8 md:p-14 rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] backdrop-blur-md overflow-hidden transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Animated glow background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-300/40 rounded-full animate-float"
                style={{
                  left: `${15 + i * 18}%`,
                  top: `${25 + (i % 3) * 22}%`,
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: `${4 + i * 0.5}s`,
                }}
              />
            ))}
          </div>

          <div className="relative">
            {/* Discord Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-500 hover:scale-110 hover:rotate-3">
                <DiscordLogo className="w-11 h-11 text-white" />
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-balance">Ready to join the family?</h3>
            <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Everyone is welcome — hop in and say hi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]"
              >
                <DiscordLogo className="w-5 h-5" />
                Join Discord
                <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                onClick={copyInvite}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 bg-white/5 backdrop-blur-md text-white font-medium text-base transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Invite
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}