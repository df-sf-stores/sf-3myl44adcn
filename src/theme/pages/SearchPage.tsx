import { Link, useListing, useSearch, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { SearchResults } from '../components/ListingResults'
import { useCategoryNames } from '../components/catalog'
import { ChevronRight } from '../components/Icons'

/** Shop All (no words: every product) and search results, in the reference's catalog layout. */
export const SearchPage = () => {
  const { t } = useStorefront()
  const search = useSearch()
  const all = useListing({}, search.query === '')
  const { nameOf } = useCategoryNames()
  const listing = search.query ? search : all
  return (
    <Layout>
      <div className="bg-cream-light">
        <div className="mx-auto w-full max-w-[1600px] px-4 pt-6 pb-12 lg:px-6 lg:pt-8">
          <div className="mb-5 lg:mb-6">
            <nav className="mb-2 flex items-center gap-1 text-xs text-ink-muted" aria-label={t('site.listing.breadcrumb')}>
              <Link href="/" className="text-inherit no-underline transition-colors hover:text-brand">
                {t('site.nav.home')}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-ink">{search.query ? t('site.search.title') : t('site.nav.shopAll')}</span>
            </nav>
            <h1 className="my-0 text-2xl font-extrabold tracking-tight text-ink sm:text-[28px] lg:text-[32px]">
              {search.query ? t('site.search.resultsFor', { query: search.query }) : t('site.search.shopAllTitle')}
            </h1>
            <p className="mt-1 mb-0 h-5 text-sm text-ink-muted">{listing.status === 'ready' ? t('site.listing.count', { count: listing.items.length }) : ''}</p>
          </div>
          <SearchResults listing={listing} nameOf={nameOf} />
        </div>
      </div>
    </Layout>
  )
}
