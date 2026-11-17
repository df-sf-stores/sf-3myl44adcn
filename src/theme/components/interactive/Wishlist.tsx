'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { Link, useStorefront, useWishlist, type WishlistPage } from '@dripfunnel/storefront-core/theme'
import { Heart } from '../Icons'

/** One wishlist for the whole page, so a grid of hearts asks the shop once rather than once per card. */
const nothing = async () => false
/** Outside the Layout (nothing mounts there today) a heart shows empty and does nothing. */
const inert: WishlistPage = {
  status: 'loading',
  code: null,
  retry: () => undefined,
  items: [],
  count: 0,
  has: () => false,
  busy: false,
  error: null,
  toggle: async () => undefined,
  chose: () => undefined,
  remove: nothing,
  addToCart: nothing,
}
const Shared = createContext<WishlistPage>(inert)

export const WishlistProvider = ({ children }: { children: ReactNode }) => <Shared.Provider value={useWishlist()}>{children}</Shared.Provider>

const useShared = (): WishlistPage => useContext(Shared)

/** The heart beside a product's name: adds or removes it; signed out, it sends the shopper to sign in first. */
export const WishlistHeart = ({ productId, versionId = null, name, large = false, className = '' }: { productId: string; versionId?: string | null; name: string; large?: boolean; className?: string }) => {
  const { t } = useStorefront()
  const wishlist = useShared()
  const saved = wishlist.has(productId)
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? t('site.wishlist.removeLabel', { name }) : t('site.wishlist.addLabel', { name })}
      title={saved ? t('site.wishlist.remove') : t('site.wishlist.add')}
      disabled={wishlist.busy}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void wishlist.toggle(productId, versionId)
      }}
      className={`relative z-10 inline-flex shrink-0 ${large ? 'size-11 border border-solid border-line' : 'size-7 border-0'} cursor-pointer items-center justify-center rounded-full p-0 transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none disabled:cursor-wait ${saved ? 'bg-brand-tint text-brand' : 'bg-transparent text-ink-muted hover:bg-brand-tint hover:text-brand'} ${className}`}
    >
      <Heart filled={saved} className={large ? 'size-6' : 'size-4'} />
    </button>
  )
}

/** The header's heart: the Wishlist page, with how many products it holds. */
export const WishlistLink = () => {
  const { t } = useStorefront()
  const wishlist = useShared()
  return (
    <Link
      href="/account/wishlist/"
      className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-transparent text-sm font-medium whitespace-nowrap text-ink no-underline outline-none transition-colors select-none hover:bg-brand-tint hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30"
    >
      <Heart className="size-5" />
      {wishlist.count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] leading-none font-bold text-white">{wishlist.count}</span>
      ) : null}
      <span className="sr-only">{t('site.nav.wishlist')}</span>
    </Link>
  )
}
