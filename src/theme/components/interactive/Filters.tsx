'use client'

import { useState } from 'react'
import { Checkbox, Link, PriceRange, Select, useStorefront, type Facet, type Listing, type SortKey } from '@dripfunnel/storefront-core/theme'
import { ChevronDown, ChevronLeft, ChevronRight, Close, Sliders } from '../Icons'
import styles from '../../styles/listing.module.css'

/** One filter group: its name opens and closes its values. */
const FacetGroup = ({ facet, listing }: { facet: Facet; listing: Listing }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-line px-4 py-3.5 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between border-0 bg-transparent p-0 text-[13px] font-bold tracking-wide text-ink uppercase transition-colors hover:text-brand"
      >
        {facet.name}
        <ChevronDown className={`size-4 text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <div className="pt-3">
          <div className="space-y-0.5" role="group" aria-label={facet.name}>
            {facet.values.map((value) => (
              <div key={value.id} className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm text-ink/85 transition-colors hover:bg-brand-tint">
                <Checkbox checked={value.selected} onChange={() => listing.toggle(value.id)} className={styles.check}>
                  {value.name}
                </Checkbox>
                <span className="shrink-0 text-xs text-ink-muted tabular-nums">{value.count}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

const Panel = ({ listing }: { listing: Listing }) => {
  const { t } = useStorefront()
  return (
    <>
      <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
        <h2 className="my-0 flex items-center gap-2 text-base font-extrabold text-ink">
          <Sliders className="size-4 text-brand" />
          {t('site.listing.filters')}
        </h2>
        {listing.selected.length ? (
          <button type="button" onClick={listing.clear} className="border-0 bg-transparent p-0 text-xs font-semibold text-brand hover:text-brand-dark">
            {t('site.listing.clearAll')}
          </button>
        ) : null}
      </div>
      {listing.priceBounds ? (
        <div className="border-b border-line px-4 py-3.5 last:border-b-0">
          <p className="my-0 text-[13px] font-bold tracking-wide text-ink uppercase">{t('site.listing.price')}</p>
          <div className="pt-3">
            <PriceRange
              bounds={listing.priceBounds}
              value={listing.priceRange}
              onChange={listing.setPriceRange}
              label={t('site.listing.price')}
              className="space-y-4 px-1 pt-1 text-sm text-ink"
              parts={{ track: styles.priceTrack, rail: styles.priceRail, fill: styles.priceFill, thumb: styles.priceThumb, ends: styles.priceEnds, select: styles.priceSelect, to: styles.priceTo }}
            />
          </div>
        </div>
      ) : null}
      {listing.facets.map((facet) => (
        <FacetGroup key={facet.id} facet={facet} listing={listing} />
      ))}
    </>
  )
}

/** The filters: a sidebar panel from 1024px; below it a Filters button opening the same panel as a sheet. */
export const FilterPanel = ({ listing }: { listing: Listing }) => {
  const { t } = useStorefront()
  const [open, setOpen] = useState(false)
  if (listing.facets.length === 0 && !listing.priceBounds) return null
  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-line bg-white px-3 text-sm font-medium text-ink shadow-xs transition-colors hover:bg-brand-tint"
        >
          <Sliders className="size-4" />
          {t('site.listing.filters')}
          {listing.selected.length ? <span className="ml-1 rounded-full bg-brand px-1.5 text-[11px] font-bold text-white">{listing.selected.length}</span> : null}
        </button>
      </div>
      <div className="hidden overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(41,41,41,0.04)] lg:block">
        <Panel listing={listing} />
      </div>
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden" onKeyDown={(e) => (e.key === 'Escape' ? setOpen(false) : undefined)}>
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" onClick={() => setOpen(false)} />
          <div role="dialog" aria-modal="true" aria-label={t('site.listing.filters')} className="absolute inset-y-0 left-0 flex w-3/4 max-w-sm flex-col overflow-y-auto bg-white shadow-lg">
            <div className="flex justify-end p-2">
              <button type="button" onClick={() => setOpen(false)} className="inline-flex size-9 items-center justify-center rounded-md border-0 bg-transparent p-0 text-ink hover:bg-brand-tint hover:text-brand">
                <Close className="size-5" />
                <span className="sr-only">{t('site.nav.closeMenu')}</span>
              </button>
            </div>
            <Panel listing={listing} />
          </div>
        </div>
      ) : null}
    </>
  )
}

/** The sort, with the reference's words for each order. */
export const SortSelect = ({ listing }: { listing: Listing }) => {
  const { t } = useStorefront()
  const labels: Record<SortKey, string> = {
    featured: t('site.listing.sorts.featured'),
    newest: t('site.listing.sorts.newest'),
    'price-low': t('site.listing.sorts.priceLow'),
    'price-high': t('site.listing.sorts.priceHigh'),
    name: t('site.listing.sorts.name'),
  }
  return <Select label={t('site.listing.sortBy')} value={listing.sort} options={listing.sorts.map((s) => ({ value: s, label: labels[s] }))} onChange={listing.setSort} className={styles.sort} />
}

/** Previous and next page, as the reference's square buttons. */
export const Pagination = ({ listing }: { listing: Listing }) => {
  const { t } = useStorefront()
  if (!listing.previousHref && !listing.nextHref) return null
  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2" aria-label={t('site.listing.pagination')}>
      {listing.previousHref ? (
        <Link href={listing.previousHref} className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-sm font-semibold text-ink no-underline shadow-xs transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t('site.listing.previous')}</span>
        </Link>
      ) : (
        <span className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-ink opacity-40 shadow-xs" aria-hidden="true">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}
      {listing.nextHref ? (
        <Link href={listing.nextHref} className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-sm font-semibold text-ink no-underline shadow-xs transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{t('site.listing.next')}</span>
        </Link>
      ) : (
        <span className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-white text-ink opacity-40 shadow-xs" aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  )
}
