import { Link, useStorefront, type Listing, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { FilterPanel, Pagination, SortSelect } from './interactive/Filters'
import { Retry } from './interactive/Retry'
import { CardSkeleton, ListingCard, SearchCard } from './ProductCard'

/** A collection's or a search's products: filters beside, count and sort above the grid, pages below; every state. */
export const ListingResults = ({ listing }: { listing: Listing }) => {
  const { t } = useStorefront()
  const empty = listing.status === 'ready' && listing.items.length === 0
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <FilterPanel listing={listing} />
      </aside>
      <div className="lg:col-span-3">
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-3">
            <p className="my-0 text-sm text-[#62748e]" role="status">
              {listing.status === 'ready' ? t('site.listing.count', { count: listing.items.length }) : t('shop.listing.loading')}
            </p>
            <SortSelect listing={listing} />
          </div>
          {listing.status === 'loading' || listing.status === 'idle' ? (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label={t('shop.listing.loading')}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-line bg-white">
                  <span className="block aspect-square animate-pulse bg-brand-tint" />
                  <span className="block space-y-2 p-3">
                    <span className="block h-3.5 w-3/4 animate-pulse rounded bg-muted" />
                    <span className="block h-3.5 w-1/3 animate-pulse rounded bg-muted" />
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          {listing.status === 'error' ? (
            <div className="rounded-2xl border border-line bg-white px-6 py-12 text-center">
              <h2 className="my-0 text-lg font-bold text-ink">{t('shop.listing.failed')}</h2>
              <p className="mt-1 mb-4 text-sm text-ink-muted">{t('shop.listing.failedLead')}</p>
              <Retry label={t('shop.listing.retry')} onRetry={listing.retry} />
            </div>
          ) : null}
          {empty ? (
            <div className="rounded-2xl border border-line bg-white px-6 py-12 text-center">
              <h2 className="my-0 text-lg font-bold text-ink">{t('site.listing.emptyTitle')}</h2>
              <p className="mt-1 mb-4 text-sm text-ink-muted">{listing.selected.length ? t('site.listing.emptyDescription') : t('shop.collection.emptyLead')}</p>
              {listing.selected.length ? (
                <Retry label={t('site.listing.clearFilters')} onRetry={listing.clear} />
              ) : (
                <Link href="/search/" className="inline-flex h-10 items-center rounded-lg bg-brand px-5 text-sm font-bold text-white no-underline transition-colors hover:bg-brand-dark">
                  {t('site.nav.shopAll')}
                </Link>
              )}
            </div>
          ) : null}
          {listing.status === 'ready' && listing.items.length ? (
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {listing.items.map((p) => (
                <ListingCard key={p.id} product={p} />
              ))}
            </div>
          ) : null}
          <Pagination listing={listing} />
        </div>
      </div>
    </div>
  )
}

/** The search and Shop All layout: sticky filters at 256px, a toolbar card, the four-across grid. */
export const SearchResults = ({ listing, nameOf }: { listing: Listing; nameOf: (p: ProductCard) => string | null }) => {
  const { t } = useStorefront()
  const empty = listing.status === 'ready' && listing.items.length === 0
  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[256px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,1fr)] xl:gap-6">
      <aside className="lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-104px)] lg:overflow-y-auto lg:rounded-xl">
        <FilterPanel listing={listing} />
      </aside>
      <div className="min-w-0 space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
          <p className="my-0 hidden min-w-0 truncate text-sm text-ink-muted lg:block" role="status">
            {t('site.listing.showing', { count: listing.items.length })}
          </p>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-ink-muted xl:inline">{t('site.listing.sortBy')}</span>
            <SortSelect listing={listing} />
          </div>
        </div>
        {listing.status === 'loading' || listing.status === 'idle' ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-5" aria-busy="true" aria-label={t('shop.listing.loading')}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : null}
        {listing.status === 'error' ? (
          <div className="rounded-xl border border-line bg-white px-6 py-12 text-center">
            <h2 className="my-0 text-lg font-bold text-ink">{t('shop.listing.failed')}</h2>
            <p className="mt-1 mb-4 text-sm text-ink-muted">{t('shop.listing.failedLead')}</p>
            <Retry label={t('shop.listing.retry')} onRetry={listing.retry} />
          </div>
        ) : null}
        {empty ? (
          <div className="rounded-xl border border-line bg-white px-6 py-12 text-center">
            <h2 className="my-0 text-lg font-bold text-ink">{t('site.listing.emptyTitle')}</h2>
            <p className="mt-1 mb-4 text-sm text-ink-muted">{t('site.listing.emptyDescription')}</p>
            {listing.selected.length ? <Retry label={t('site.listing.clearFilters')} onRetry={listing.clear} /> : null}
          </div>
        ) : null}
        <div className="space-y-8">
          {listing.status === 'ready' && listing.items.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {listing.items.map((p) => (
                <SearchCard key={p.id} product={p} category={nameOf(p)} />
              ))}
            </div>
          ) : null}
          <Pagination listing={listing} />
        </div>
      </div>
    </div>
  )
}
