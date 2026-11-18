'use client'

import { useRef } from 'react'
import { Link, useInView, useStorefront } from '@dripfunnel/storefront-core/theme'
import { whatsappLink } from '../contact'
import { ChevronUp } from '../Icons'

/**
 * The floating "back to top" button, bottom right: hidden until the shopper scrolls past the first 600px, then a link
 * to the page root's #top (tokens.css makes the jump smooth). It stacks above the WhatsApp button, centred on it, or
 * takes its corner when the store has no WhatsApp.
 */
export const BackToTop = () => {
  const { store, t } = useStorefront()
  const marker = useRef<HTMLSpanElement>(null)
  const nearTop = useInView(marker)
  const place = whatsappLink(store) ? 'right-[26px] bottom-[92px] sm:right-[30px] sm:bottom-[100px]' : 'right-5 bottom-5 sm:right-6 sm:bottom-6'
  return (
    <>
      {/* The page's first 600px: while any of it is on screen, the button stays hidden. */}
      <span ref={marker} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-[600px] w-px" />
      <div className={`fixed z-40 transition-opacity ${place} ${nearTop ? 'invisible opacity-0' : 'visible opacity-100'}`}>
        <Link
          href="#top"
          className="flex size-11 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-black/20 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:ring-4 focus-visible:ring-brand/40 focus-visible:outline-none no-underline"
        >
          <ChevronUp className="size-6" />
          <span className="sr-only">{t('site.footer.backToTop')}</span>
        </Link>
      </div>
    </>
  )
}
