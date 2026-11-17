'use client'

import { useState, type ReactNode } from 'react'
import { useMediaQuery, useStorefront } from '@dripfunnel/storefront-core/theme'
import { ChevronLeft, ChevronRight } from '../Icons'
import car from '../../styles/carousel.module.css'

/** The home catalog on phones (below 640px): how many cards show before its "View more" button. */
const mobileLimit = 6

const positions24 = [car.at0, car.at1, car.at2, car.at3, car.at4, car.at5, car.at6, car.at7, car.at8, car.at9, car.at10, car.at11, car.at12, car.at13, car.at14, car.at15, car.at16, car.at17, car.at18, car.at19, car.at20, car.at21, car.at22, car.at23]

/**
 * The home catalog's sliding row (the reference's carousel): two cards a view on phones, three from 640px, four from
 * 1024px, five from 1536px; arrows, a dot per position, and a swipe. Below 640px it is a plain two-column grid with
 * every card, so nothing scrolls sideways on a phone.
 */
export const Carousel = ({ label, slides, related = false }: { label: string; slides: { key: string; content: ReactNode }[]; related?: boolean }) => {
  const { t } = useStorefront()
  const five = useMediaQuery('(min-width: 1536px)')
  const four = useMediaQuery('(min-width: 1024px)')
  const three = useMediaQuery('(min-width: 640px)')
  const perView = five && !related ? 5 : four ? 4 : three ? 3 : 2
  const positions = Math.max(1, slides.length - perView + 1)
  const [chosen, setIndex] = useState(0)
  const [start, setStart] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  // The related row keeps every card; the home catalog holds phones to six until "View more".
  const capped = !related && !expanded && slides.length > mobileLimit
  const index = three ? Math.min(chosen, positions - 1) : 0
  const go = (next: number) => setIndex(Math.max(0, Math.min(positions - 1, next)))
  return (
    <div className="relative w-full" role="region" aria-label={label}>
      <div
        className="overflow-hidden"
        onPointerDown={(e) => setStart(e.clientX)}
        onPointerUp={(e) => {
          if (three && start !== null && Math.abs(e.clientX - start) > 40) go(index + (e.clientX < start ? 1 : -1))
          setStart(null)
        }}
        onPointerCancel={() => setStart(null)}
      >
        <div className={related ? `-ml-3 grid grid-cols-2 gap-y-3 py-1 sm:-ml-4 sm:flex sm:gap-y-0 ${car.trackRelated} ${positions24[index] ?? ''}` : `-my-2 -ml-2.5 grid grid-cols-2 gap-y-2.5 py-2 sm:-ml-3 sm:flex sm:gap-y-0 lg:-ml-4 ${car.track} ${positions24[index] ?? ''}`}>
          {slides.map((slide, i) => (
            <div key={slide.key} role="group" aria-hidden={three && (i < index || i >= index + perView)} className={related ? 'min-w-0 shrink-0 grow-0 basis-[48%] pl-3 sm:basis-1/3 sm:pl-4 lg:basis-1/4' : `min-w-0 shrink-0 grow-0 basis-1/2 pl-2.5 sm:basis-1/3 sm:pl-3 lg:basis-1/4 lg:pl-4 2xl:basis-1/5 ${capped && i >= mobileLimit ? 'max-sm:hidden' : ''}`}>
              {slide.content}
            </div>
          ))}
        </div>
      </div>
      {capped ? (
        <div className="mt-3 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex h-11 items-center rounded-lg border border-brand bg-white px-6 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {t('site.home.showcase.viewMore')}
          </button>
        </div>
      ) : null}
      <button
        type="button"
        className="absolute top-[36%] left-1 hidden sm:inline-flex size-8 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-brand/30 bg-white text-brand shadow-md transition-[color,background-color,opacity] hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:size-9 text-[length:inherit]"
        disabled={index === 0}
        onClick={() => go(index - 1)}
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">{t('site.home.showcase.previous')}</span>
      </button>
      <button
        type="button"
        className="absolute top-[36%] right-1 hidden sm:inline-flex size-8 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-brand/30 bg-white text-brand shadow-md transition-[color,background-color,opacity] hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:size-9 text-[length:inherit]"
        disabled={index >= positions - 1}
        onClick={() => go(index + 1)}
      >
        <ChevronRight className="size-4" />
        <span className="sr-only">{t('site.home.showcase.next')}</span>
      </button>
      {positions > 1 ? (
        <div className="mt-3 hidden justify-center gap-1.5 sm:flex" aria-hidden="true">
          {[...Array(positions).keys()].map((i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-colors ${i === index ? 'w-6 bg-promo' : 'w-1.5 bg-brand/25 hover:bg-brand/50'} border-0 p-0`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
