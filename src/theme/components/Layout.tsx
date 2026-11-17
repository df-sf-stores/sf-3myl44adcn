import type { ReactNode } from 'react'
import { ConsentBanner, PreviewBanner, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Header } from './interactive/Header'
import { WishlistProvider } from './interactive/Wishlist'
import { Footer, WhatsAppButton } from './Footer'
import { BadgeCheck, Basket, Truck } from './Icons'
import base from '../styles/base.module.css'
import layout from '../styles/layout.module.css'

/** The dark strip above the header: the store's tagline, then two promises. */
const Announcement = () => {
  const { store, t } = useStorefront()
  return (
    <div className="bg-charcoal-dark text-[11px] font-medium text-white/90 sm:text-xs">
      <div className="mx-auto flex h-8 max-w-[1600px] items-center justify-center gap-6 px-4 sm:justify-between lg:px-6">
        {store.tagline ? (
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <Truck className="size-3.5 text-brand-2" />
            {store.tagline}
          </span>
        ) : (
          <span />
        )}
        <div className="hidden items-center gap-4 sm:flex">
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="size-3.5 text-brand-2" />
            {t('site.announce.quality')}
          </span>
          <span className="size-1 rounded-full bg-promo" aria-hidden="true" />
          <span className="flex items-center gap-1.5">
            <Basket className="size-3.5 text-brand-2" />
            {t('site.announce.essentials')}
          </span>
        </div>
      </div>
    </div>
  )
}

export const Layout = ({ children, bare = false }: { children: ReactNode; bare?: boolean }) => {
  const { t, mode } = useStorefront()
  return (
    <WishlistProvider>
    <div className={base.root}>
      {mode === 'live' ? null : <PreviewBanner t={t} className={layout.preview} />}
      {bare ? null : <Announcement />}
      {bare ? null : <Header />}
      <main className="flex-1">{children}</main>
      {bare ? null : <Footer />}
      <WhatsAppButton />
      <ConsentBanner t={t} className={layout.consent} />
    </div>
    </WishlistProvider>
  )
}
