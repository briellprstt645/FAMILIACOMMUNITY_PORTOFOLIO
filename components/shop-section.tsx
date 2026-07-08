"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ShoppingCart, Gift, Heart, Tag, Coins } from "lucide-react"
import { BuyNowModal, BuyTitleModal, ClaimTitleModal } from "@/components/purchase-modal"

const products = [
  {
    title: "SUMMIT KIT V5",
    category: "SYSTEM MAP",
    price: "Rp. 150.000",
    description: "System map roblox untuk tema Habeg 5-10 Checkpoint, Fitur lengkap.",
    image: "/images/summit-kit-v5.png",
    highlight: true,
    likes: "1.2K",
    purchases: "150+",
  },
  {
    title: "SUMMIT KIT V7",
    category: "SYSTEM MAP",
    price: "Rp. 400.000",
    description: "System map roblox untuk tema Balap 15-30 Checkpoint, Fitur lengkap.",
    image: "/images/summit-kit-v7.png",
    highlight: true,
    likes: "100+",
    purchases: "50+",
  },
  {
    title: "CLUB KIT V1",
    category: "SYSTEM MAP",
    price: "Rp. 350.000",
    description: "System map roblox untuk tema Club seperti Salon, Fitur lengkap.",
    image: "/images/club-kit-v1.png",
    highlight: true,
    likes: "1.5K",
    purchases: "15+",
  },
  {
    title: "UPGRADE SYSTEM",
    category: "SERVICE",
    price: "Rp. 50.000",
    description: "Jasa perbaikan system skript maupun dekorasi start from 50k tergantung kesulitan pengerjaan & permintaan.",
    image: "/images/upgrade-system.png",
    highlight: false,
    likes: "540+",
    purchases: "100+",
  },
]

const titleShop = [
  {
    title: "Custom Title 1 Slot",
    price: "50K",
    requirement: "",
  },
  {
    title: "Custom Title 2 Slot",
    price: "100K",
    requirement: "",
  },
]

const freeTitles = [
  {
    title: "Title Familia Community",
    requirement: "Minimal 10x Summit",
  },
  {
    title: "Title Streamer",
    requirement: "Minimal Live 5X di Salah satu map Familia, sertakan link Live di discord.",
  },
]

export function ShopSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Buy Now (product) modal
  const [activeProduct, setActiveProduct] = useState<string | null>(null)

  // Buy Title modal
  const [titleModalOpen, setTitleModalOpen] = useState(false)

  // Claim Title modal
  const [claimTarget, setClaimTarget] = useState<string | null>(null)

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
    <section id="shop" ref={sectionRef} className="relative z-10 py-16 sm:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <ShoppingCart className="w-4 h-4 mr-2 text-emerald-300" />
            In-Game Store
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4 sm:mb-6">
            Title & System {" "}
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Shop</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
            Support the community and unlock exclusive perks across every FAMILIA COMMUNITY experience.
          </p>
        </div>

        {/* Product cards */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 transition-all duration-1000 delay-300 mb-12 sm:mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`group relative bg-white/5 backdrop-blur-md border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                product.highlight
                  ? "border-emerald-400/30 hover:border-emerald-400/60 hover:shadow-[0_0_50px_rgba(16,185,129,0.25)]"
                  : "border-white/10 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                {/* Price badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold">
                  <Coins className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300 flex-shrink-0" />
                  <span className="whitespace-nowrap">{product.price}</span>
                </div>

                {product.highlight && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-400/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-xs font-semibold">
                    Popular
                  </div>
                )}

                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.title} product image`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-emerald-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-1.5 sm:mb-2">
                  <Tag className="w-3 h-3 flex-shrink-0" />
                  <span>{product.category}</span>
                </div>

                <h3 className="text-xs sm:text-xl font-bold text-white group-hover:text-emerald-200 transition-colors duration-300 leading-snug mb-2 sm:mb-3">
                  {product.title}
                </h3>

                <div className="border-t border-white/10 mb-2 sm:mb-3" />

                {/* Like & cart indicators */}
                <div className="flex items-center justify-between text-white/60 text-[10px] sm:text-xs mb-2 sm:mb-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400 flex-shrink-0" />
                    {product.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300 flex-shrink-0" />
                    {product.purchases}
                  </span>
                </div>

                <p className="text-white/60 text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-6 flex-1">
                  {product.description}
                </p>

                <button
                  onClick={() => setActiveProduct(product.title)}
                  className="inline-flex items-center justify-center gap-1 sm:gap-2 w-full px-2 py-2 sm:px-5 sm:py-3 rounded-full bg-white text-black font-semibold text-[11px] sm:text-sm transition-all duration-300 hover:bg-emerald-50 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] mt-auto cursor-pointer"
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Title Section */}
        <div className="mt-16 pt-12 border-t border-white/10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Title Shop */}
            <div
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden p-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-emerald-300" />
                Title Shop
              </h4>

              <div className="space-y-4">
                {titleShop.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all duration-300"
                    style={{ transitionDelay: isVisible ? `${(index + 4) * 100}ms` : "0ms" }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-300 text-sm font-semibold">◆</span>
                      </div>
                      <span className="text-white font-medium">{item.title}</span>
                    </div>
                    <div className="text-emerald-300 font-semibold text-sm ml-4">{item.price}</div>
                  </div>
                ))}
              </div>

              <p className="text-white/50 text-xs mt-4 text-center">
                * List yang dipilih akan otomatis tercopy, tinggal paste di discord ticket.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => setTitleModalOpen(true)}
                  className="w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-emerald-600 text-white text-xs sm:text-base font-semibold transition-all duration-300 hover:bg-emerald-700 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Buy Title
                </button>
              </div>
            </div>

            {/* Claim Free Title */}
            <div
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden p-8 transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Gift className="w-6 h-6 text-emerald-300" />
                Claim Free Title
              </h4>

              <div className="space-y-4">
                {freeTitles.map((item, index) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all duration-300"
                    style={{ transitionDelay: isVisible ? `${(index + 6) * 100}ms` : "0ms" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-emerald-300 text-sm font-semibold">◆</span>
                        </div>
                        <span className="text-white font-semibold">{item.title}</span>
                      </div>
                      <button
                        onClick={() => setClaimTarget(item.title)}
                        className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold transition-all duration-300 hover:bg-emerald-700 hover:scale-105 cursor-pointer"
                      >
                        Claim
                      </button>
                    </div>
                    <p className="text-white/60 text-sm ml-11">{item.requirement}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-white/70 text-xs">
                  * Join Discord Familia Community.
                  <br />
                  * Buka tiket melalui channel yang tersedia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase / claim flow modals */}
      <BuyNowModal
        open={activeProduct !== null}
        productName={activeProduct ?? ""}
        onClose={() => setActiveProduct(null)}
      />
      <BuyTitleModal open={titleModalOpen} onClose={() => setTitleModalOpen(false)} />
      <ClaimTitleModal
        open={claimTarget !== null}
        titleName={claimTarget ?? ""}
        onClose={() => setClaimTarget(null)}
      />
    </section>
  )
}