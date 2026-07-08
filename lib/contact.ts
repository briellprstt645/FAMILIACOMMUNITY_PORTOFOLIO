export const CONTACT_INFO = {
  whatsappNumber: "6281372320358", // 0813-7232-0358 in international format
  whatsappDisplay: "0813-7232-0358",
  discordUsername: "@briellprstt_",
  discordInvite: "https://discord.gg/n2FyrVNPuW",
  tiktokUsername: "@briellprstt",
  tiktokUrl: "https://www.tiktok.com/@briellprstt",
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}