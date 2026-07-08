"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, Check, Copy, MessageCircle, ArrowLeft, MapPin, Sparkles } from "lucide-react"
import { CONTACT_INFO, buildWhatsAppUrl, copyToClipboard } from "../lib/contact"

const DiscordLogo = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.99.53 3.86 1.51 5.47L2 22l4.76-1.6a9.87 9.87 0 0 0 5.28 1.53h.005c5.46 0 9.9-4.44 9.9-9.9C21.95 6.46 17.5 2 12.04 2zm0 17.99h-.004a8.24 8.24 0 0 1-4.5-1.31l-.323-.192-3.34 1.12 1.12-3.24-.211-.334a8.2 8.2 0 0 1-1.29-4.43c0-4.53 3.69-8.22 8.22-8.22a8.16 8.16 0 0 1 5.82 2.41 8.16 8.16 0 0 1 2.4 5.81c0 4.53-3.69 8.19-8.02 8.19z" />
  </svg>
)

const TikTokLogo = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16.6 5.82c-.9-.78-1.47-1.9-1.6-3.14h-3.13v13.6c0 1.44-1.17 2.6-2.61 2.6a2.61 2.61 0 0 1-2.61-2.6 2.61 2.61 0 0 1 2.61-2.61c.27 0 .53.04.77.11V10.6a5.86 5.86 0 0 0-.77-.05A5.85 5.85 0 0 0 3.4 16.4a5.85 5.85 0 0 0 5.86 5.85 5.85 5.85 0 0 0 5.86-5.85V9.28a8.1 8.1 0 0 0 4.75 1.52V7.66c-1.15 0-2.26-.4-3.27-1.84z" />
  </svg>
)

function ModalShell({
  open,
  onClose,
  eyebrow,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      setVisible(true)
      setClosing(false)
    } else if (visible) {
      setClosing(true)
      const timeout = setTimeout(() => {
        setVisible(false)
        setClosing(false)
      }, 550)
      return () => clearTimeout(timeout)
    }
  }, [open])

  useEffect(() => {
    if (!visible) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [visible, onClose])

  if (!mounted || !visible) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      style={{ perspective: "1200px" }}
    >
      <div
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-sm ${
          closing ? "modal-backdrop-out" : "modal-backdrop-in"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full max-w-md max-h-[88vh] sm:max-h-[85vh] overflow-y-auto rounded-3xl border border-white/15 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(16,185,129,0.12),rgba(15,23,42,0.98))] backdrop-blur-xl shadow-[0_0_60px_rgba(16,185,129,0.15)] ${
          closing ? "modal-flip-out" : "modal-flip-in"
        }`}
      >
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-emerald-400/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative p-5 sm:p-8">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-3 sm:mb-4">
            <Sparkles className="w-3 h-3" />
            {eyebrow}
          </div>

          <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-5 pr-8 text-balance">{title}</h3>

          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes modalBackdropIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalBackdropOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes modalFlipIn {
          from {
            opacity: 0;
            transform: scale(0) rotateY(0deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateY(360deg);
          }
        }
        @keyframes modalFlipOut {
          from {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
          to {
            opacity: 0;
            transform: scale(0) rotateY(360deg);
          }
        }
        .modal-backdrop-in {
          animation: modalBackdropIn 0.3s ease-out both;
        }
        .modal-backdrop-out {
          animation: modalBackdropOut 0.45s ease-in both;
        }
        .modal-flip-in {
          animation: modalFlipIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .modal-flip-out {
          animation: modalFlipOut 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .modal-flip-in,
          .modal-flip-out,
          .modal-backdrop-in,
          .modal-backdrop-out {
            animation-duration: 0.15s;
          }
        }
      `}</style>
    </div>,
    document.body
  )
}

function ContactFallbackRow({
  icon,
  label,
  value,
  copyValue,
}: {
  icon: React.ReactNode
  label: string
  value: string
  copyValue: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(copyValue)
    setCopied(ok)
    if (ok) setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-white/10 bg-white/5">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
        <span className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 rounded-lg bg-white/10 flex items-center justify-center text-white/80">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-white/50 text-[9px] sm:text-[10px] uppercase tracking-wide leading-none mb-1">{label}</p>
          <p className="text-white text-xs sm:text-sm font-medium truncate">{value}</p>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 text-white/80 text-[11px] sm:text-xs font-medium hover:bg-white/10 hover:text-white transition-colors duration-200 cursor-pointer"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}

function useChannelAction() {
  const [status, setStatus] = useState<"idle" | "opened">("idle")

  const openChannel = async (message: string, url: string) => {
    await copyToClipboard(message)
    window.open(url, "_blank", "noopener,noreferrer")
    setStatus("opened")
  }

  return { status, openChannel }
}

export function BuyNowModal({
  open,
  onClose,
  productName,
}: {
  open: boolean
  onClose: () => void
  productName: string
}) {
  const message = `Permisi saya ingin membeli ${productName}, apakah ready?`
  const { status, openChannel } = useChannelAction()

  return (
    <ModalShell open={open} onClose={onClose} eyebrow="Contact Seller" title={`Get ${productName}`}>
      <p className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-5 leading-relaxed">
        Pick a channel below — we'll start the chat with your order already filled in.
      </p>

      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
        <a
          href={buildWhatsAppUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 sm:gap-3 w-full p-3 sm:p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 hover:bg-emerald-500/25 hover:border-emerald-400/50 transition-all duration-200 group"
        >
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-emerald-400/20 flex items-center justify-center">
            <WhatsAppLogo className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
          </span>
          <span className="flex-1 text-left min-w-0">
            <span className="block text-white font-semibold text-xs sm:text-sm">Chat on WhatsApp</span>
            <span className="block text-white/50 text-[10px] sm:text-xs">Opens directly with your message</span>
          </span>
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 group-hover:text-emerald-300 transition-colors flex-shrink-0" />
        </a>

        <button
          onClick={() => openChannel(message, CONTACT_INFO.discordInvite)}
          className="flex items-center gap-2.5 sm:gap-3 w-full p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
        >
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
            <DiscordLogo className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
          <span className="flex-1 text-left min-w-0">
            <span className="block text-white font-semibold text-xs sm:text-sm">Message on Discord</span>
            <span className="block text-white/50 text-[10px] sm:text-xs">Copies your message & opens the server</span>
          </span>
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 group-hover:text-white transition-colors flex-shrink-0" />
        </button>

        <button
          onClick={() => openChannel(message, CONTACT_INFO.tiktokUrl)}
          className="flex items-center gap-2.5 sm:gap-3 w-full p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
        >
          <span className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
            <TikTokLogo className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
          <span className="flex-1 text-left min-w-0">
            <span className="block text-white font-semibold text-xs sm:text-sm">Message on TikTok</span>
            <span className="block text-white/50 text-[10px] sm:text-xs">Copies your message & opens the profile</span>
          </span>
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 group-hover:text-white transition-colors flex-shrink-0" />
        </button>
      </div>

      {status === "opened" && (
        <p className="text-emerald-300 text-[11px] sm:text-xs mb-3 sm:mb-4 flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 flex-shrink-0" /> Message copied — paste it once your chat is open.
        </p>
      )}

      <div className="border-t border-white/10 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
        <p className="text-white/40 text-[11px] sm:text-xs mb-2">Can't get through? Reach me directly:</p>
        <ContactFallbackRow
          icon={<WhatsAppLogo className="w-4 h-4" />}
          label="WhatsApp"
          value={CONTACT_INFO.whatsappDisplay}
          copyValue={CONTACT_INFO.whatsappDisplay}
        />
        <ContactFallbackRow
          icon={<DiscordLogo className="w-4 h-4" />}
          label="Discord"
          value={CONTACT_INFO.discordUsername}
          copyValue={CONTACT_INFO.discordUsername}
        />
        <ContactFallbackRow
          icon={<TikTokLogo className="w-4 h-4" />}
          label="TikTok"
          value={CONTACT_INFO.tiktokUsername}
          copyValue={CONTACT_INFO.tiktokUsername}
        />
      </div>
    </ModalShell>
  )
}

const MAP_OPTIONS = [
  { id: "race", label: "Familia Race" },
  { id: "obstacle", label: "Familia Obstacle" },
] as const

export function BuyTitleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selected, setSelected] = useState<(typeof MAP_OPTIONS)[number]["id"] | null>(null)
  const [locked, setLocked] = useState(false)
  const { status, openChannel } = useChannelAction()

  useEffect(() => {
    if (!open) {
      setSelected(null)
      setLocked(false)
    }
  }, [open])

  const selectedMap = MAP_OPTIONS.find((m) => m.id === selected)
  const message = selectedMap
    ? `Permisi saya ingin membeli Title di map ${selectedMap.label} 1 Slot, apakah Ready?`
    : ""

  return (
    <ModalShell open={open} onClose={onClose} eyebrow="Custom Title" title="Buy a Custom Title">
      {!locked ? (
        <>
          <p className="text-white/60 text-sm mb-5 leading-relaxed">Choose which map your title is for.</p>

          <div className="space-y-3 mb-6">
            {MAP_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`flex items-center gap-3 w-full p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  selected === opt.id
                    ? "bg-emerald-500/15 border-emerald-400/50"
                    : "bg-white/5 border-white/10 hover:border-white/25 hover:bg-white/10"
                }`}
              >
                <span
                  className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center ${
                    selected === opt.id ? "bg-emerald-400/25" : "bg-white/10"
                  }`}
                >
                  <MapPin className={`w-4 h-4 ${selected === opt.id ? "text-emerald-300" : "text-white/70"}`} />
                </span>
                <span className="flex-1 text-left text-white font-medium text-sm">{opt.label}</span>
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selected === opt.id ? "border-emerald-400 bg-emerald-400" : "border-white/30"
                  }`}
                >
                  {selected === opt.id && <Check className="w-3 h-3 text-slate-900" />}
                </span>
              </button>
            ))}
          </div>

          <button
            disabled={!selected}
            onClick={() => setLocked(true)}
            className="w-full px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm transition-all duration-300 hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 cursor-pointer"
          >
            Lock In Selection
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 mb-5">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wide mb-1">Selected map</p>
              <p className="text-white font-semibold text-sm">{selectedMap?.label} · 1 Slot</p>
            </div>
            <button
              onClick={() => setLocked(false)}
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Change
            </button>
          </div>

          <button
            onClick={() => openChannel(message, CONTACT_INFO.discordInvite)}
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-white text-slate-900 font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-4 cursor-pointer"
          >
            <DiscordLogo className="w-4 h-4" />
            Buy Now
          </button>

          {status === "opened" && (
            <p className="text-emerald-300 text-xs mb-4 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Message copied & Discord opened — paste it in a ticket.
            </p>
          )}

          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-xs mb-2">Can't get through? Reach me directly:</p>
            <ContactFallbackRow
              icon={<DiscordLogo className="w-4 h-4" />}
              label="Discord"
              value={CONTACT_INFO.discordUsername}
              copyValue={CONTACT_INFO.discordUsername}
            />
          </div>
        </>
      )}
    </ModalShell>
  )
}

export function ClaimTitleModal({
  open,
  onClose,
  titleName,
}: {
  open: boolean
  onClose: () => void
  titleName: string
}) {
  const [locked, setLocked] = useState(false)
  const { status, openChannel } = useChannelAction()

  useEffect(() => {
    if (!open) setLocked(false)
  }, [open])

  const message = `Permisi saya ingin claim Title, apakah Ready?\nTitle: ${titleName}`

  return (
    <ModalShell open={open} onClose={onClose} eyebrow="Free Title" title="Claim Your Title">
      {!locked ? (
        <>
          <p className="text-white/60 text-sm mb-5 leading-relaxed">Confirm this is the title you want to claim.</p>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 mb-6">
            <span className="w-9 h-9 flex-shrink-0 rounded-lg bg-emerald-400/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-300" />
            </span>
            <span className="text-white font-medium text-sm">{titleName}</span>
          </div>

          <button
            onClick={() => setLocked(true)}
            className="w-full px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm transition-all duration-300 hover:bg-emerald-700 cursor-pointer"
          >
            Lock In Selection
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 mb-5">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wide mb-1">Claiming</p>
              <p className="text-white font-semibold text-sm">{titleName}</p>
            </div>
            <button
              onClick={() => setLocked(false)}
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Change
            </button>
          </div>

          <button
            onClick={() => openChannel(message, CONTACT_INFO.discordInvite)}
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-emerald-600 text-white font-semibold text-sm transition-all duration-300 hover:bg-emerald-700 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] mb-4 cursor-pointer"
          >
            <DiscordLogo className="w-4 h-4" />
            Claim Now
          </button>

          {status === "opened" && (
            <p className="text-emerald-300 text-xs mb-4 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Message copied & Discord opened — paste it in a ticket.
            </p>
          )}

          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-xs mb-2">Can't get through? Reach me directly:</p>
            <ContactFallbackRow
              icon={<DiscordLogo className="w-4 h-4" />}
              label="Discord"
              value={CONTACT_INFO.discordUsername}
              copyValue={CONTACT_INFO.discordUsername}
            />
          </div>
        </>
      )}
    </ModalShell>
  )
}