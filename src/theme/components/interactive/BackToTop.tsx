'use client'

import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { ChevronUp } from '../Icons'

export const BackToTop = () => {
  const { t } = useStorefront()

  return (
    <Link
      href="#top"
      aria-label={t('site.footer.backToTop')}
      className="fixed right-5 bottom-24 z-40 flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-black/20 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:ring-4 focus-visible:ring-brand/40 focus-visible:outline-none sm:right-6 sm:bottom-28 no-underline"
    >
      <ChevronUp className="size-6" />
    </Link>
  )
}
