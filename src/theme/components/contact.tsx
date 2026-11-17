import type { Storefront } from '@dripfunnel/storefront-core/theme'

type Store = Storefront['store']

const digitsOf = (text: string) => text.replace(/\D/g, '')

/** The store's WhatsApp address from Site settings › Social, or null. */
export const whatsappLink = (store: Store) => store.social.find((s) => s.network.toLowerCase() === 'whatsapp')?.url ?? null

/**
 * The phone numbers in the reference's order, as digits: the WhatsApp number first, then the contact phone, each once.
 * Both come from Site settings, so a change there reaches the site.
 */
export const phoneDigits = (store: Store) => {
  const fromWhatsApp = digitsOf(whatsappLink(store)?.split('?')[0] ?? '')
  const fromPhone = digitsOf(store.contactPhone ?? '')
  return [fromWhatsApp, fromPhone].filter((d, i, all) => d.length >= 10 && all.indexOf(d) === i)
}
