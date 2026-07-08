"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Users, Tag, ExternalLink } from "lucide-react"

const servers = [
  {
    name: "FAMILIA RACE",
    description:
      "Merupakan map yang berpendirian untuk ajang event balapan, coba join kedalam game dan nikmati pengalaman bermain yang seru bersama teman-teman mu.",
    image: "/images/familia-race.png",
    status: "Publik",
    players: "385+ Visit",
    version: "V1",
    href: "https://www.roblox.com/id/games/70389107316350/FAMILIA-RACE",
  },
  {
    name: "FAMILIA OBSTACLE",
    description:
      "Merupakan map yang meberikan kesan pengalaman bemain yang seru, dari map ini kamu dapat berlatih skill habeg, Ajak teman mu untuk membuktikan siapa yang tangguh diantara kalian.",
    image: "/images/familia-obstacle.jpg",
    status: "Publik",
    players: "35.8K Visit",
    version: "V2",
    href: "https://www.roblox.com/id/games/70607032378691/FAMILIA-OBSTACLE",
  },
]

export function ServerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section id="server" ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Roblox Game
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 sm:mb-6">
            Familia Server{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Roblox Game
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            Explore the Roblox experiences built by FAMILIA COMMUNITY, live right now and growing every day.
          </p>
        </div>

        {/* Server cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {servers.map((server, index) => (
            <div
              key={server.name}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-[0_0_60px_rgba(16,185,129,0.2)]"
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden">
                <Image
                  src={server.image || "/placeholder.svg"}
                  alt={`${server.name} Roblox game thumbnail`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Status badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-emerald-400/40">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-emerald-300 text-xs font-semibold">{server.status}</span>
                </div>

                {/* Version badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                  <Tag className="w-3 h-3 text-white/70" />
                  <span className="text-white/90 text-xs font-semibold">{server.version}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-200 transition-colors duration-300">
                    {server.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{server.players}</span>
                  </div>
                </div>

                <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6">{server.description}</p>

                <a
                  href={server.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-white text-black font-semibold transition-all duration-300 hover:bg-emerald-50 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                >
                  Join Server
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
