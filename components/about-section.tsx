"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Paintbrush, Hammer, Gamepad2, Sparkles, Gauge } from "lucide-react"

const roles = [
  {
    title: "Roblox Creator",
    description: "Crafting complete Roblox experiences from concept to launch with a focus on player enjoyment.",
    icon: Sparkles,
  },
  {
    title: "Scripter",
    description: "Writing clean, optimized Luau code for gameplay mechanics, data systems, and server logic.",
    icon: Code2,
  },
  {
    title: "GUI Designer",
    description: "Designing modern, intuitive interfaces that make every game feel polished and premium.",
    icon: Paintbrush,
  },
  {
    title: "Builder",
    description: "Building detailed maps, environments, and structures that bring game worlds to life.",
    icon: Hammer,
  },
  {
    title: "Game Developer",
    description: "Developing full game systems including checkpoints, leaderboards, shops, and progression.",
    icon: Gamepad2,
  },
  {
    title: "Optimization",
    description: "Optimizing performance so experiences run smoothly on every device, from mobile to PC.",
    icon: Gauge,
  },
]

const skills = ["Roblox Studio", "Skripter", "GUI Design", "Building", "Game Systems", "Optimization"]

const stats = [
  { value: 50, suffix: "+", label: "Projects Game" },
  { value: 300, suffix: "+", label: "Members" },
  { value: 50, suffix: "K+", label: "Game Visits" },
  { value: 1, suffix: "+", label: "Years of Experience" },
]

function AnimatedCounter({ value, suffix, start }: { value: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const duration = 1500
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [start, value])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            About Me
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 sm:mb-6">
            Developer -{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Briellprstt
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            From scripting and building to GUI design and full game systems, FAMILIA COMMUNITY covers every part of the
            Roblox development pipeline.
          </p>
        </div>

        {/* Role cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {roles.map((role, index) => (
            <div
              key={role.title}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]"
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-emerald-400/20 group-hover:border-emerald-400/40 transition-all duration-300">
                <role.icon className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-emerald-200 transition-colors duration-300">
                {role.title}
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">{role.description}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Skills</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 hover:bg-emerald-400/10 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} start={isVisible} />
              </div>
              <p className="text-sm sm:text-base text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
