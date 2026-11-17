'use client'

import { useState } from 'react'
import { Image, useStorefront, type Photo } from '@dripfunnel/storefront-core/theme'
import { Close, Maximize } from '../Icons'

/** The product's picture in the reference's square frame, thumbnails under it when there are more, and a larger view. */
export const Gallery = ({ photos, name }: { photos: readonly Photo[]; name: string }) => {
  const { t } = useStorefront()
  const [shown, setShown] = useState(0)
  const [large, setLarge] = useState(false)
  const photo = photos[Math.min(shown, photos.length - 1)]
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-28px_rgba(44,47,48,0.35)]">
        {photo ? (
          <>
            <Image image={photo} alt={photo.alt ?? name} ratio={1} sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 size-full object-contain p-6 transition-transform ease-out group-hover:scale-[1.03] motion-reduce:transition-none sm:p-10" />
            <button type="button" onClick={() => setLarge(true)} className="absolute inset-0 cursor-zoom-in border-0 bg-transparent p-0 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none focus-visible:ring-inset">
              <span className="sr-only">{t('site.product.enlarge')}</span>
            </button>
            <span className="pointer-events-none absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-sm transition-colors group-hover:text-brand" aria-hidden="true">
              <Maximize className="size-4" />
            </span>
          </>
        ) : (
          <span className="flex size-full items-center justify-center bg-brand-tint text-ink-muted">{t('site.card.noImage')}</span>
        )}
      </div>
      {photos.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {photos.map((p, i) => (
            <button
              key={p.url}
              type="button"
              aria-pressed={i === shown}
              onClick={() => setShown(i)}
              className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white p-0 ${i === shown ? 'border-brand' : 'border-line hover:border-brand/50'}`}
            >
              <Image image={p} alt="" ratio={1} sizes="64px" className="absolute inset-0 size-full object-contain p-1" />
              <span className="sr-only">{p.alt ?? name}</span>
            </button>
          ))}
        </div>
      ) : null}
      {large && photo ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-label={name} onKeyDown={(e) => (e.key === 'Escape' ? setLarge(false) : undefined)}>
          <button type="button" onClick={() => setLarge(false)} className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full border-0 bg-white p-0 text-ink">
            <Close className="size-5" />
            <span className="sr-only">{t('site.nav.closeMenu')}</span>
          </button>
          <div className="relative aspect-square w-full max-w-3xl">
            <Image image={photo} alt={photo.alt ?? name} ratio={1} sizes="90vw" className="absolute inset-0 size-full object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

/** The reference's questions: each opens its answer, the bar beside it turning orange. */
export const Faq = ({ items }: { items: { question: string; answer: string }[] }) => {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mt-2 flex w-full flex-col">
      {items.map((item, i) => (
        <div key={item.question} className="border-b border-line last:border-b-0">
          <h3 className="my-0 flex">
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              className={`relative flex flex-1 items-start justify-between gap-3 rounded-md border-0 bg-transparent py-4 pr-0 pl-4 text-left text-[15px] font-bold transition-colors before:absolute before:top-1/2 before:left-0 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full before:transition-colors hover:text-brand ${open === i ? 'text-brand before:bg-brand' : 'text-ink before:bg-line'}`}
            >
              {item.question}
              <svg className={`mt-0.5 size-4 shrink-0 text-brand transition-transform ${open === i ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </h3>
          {open === i ? <p className="mt-0 mb-4 pl-4 text-sm leading-relaxed text-ink-muted">{item.answer}</p> : null}
        </div>
      ))}
    </div>
  )
}
