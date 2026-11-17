import { Link, useCollection, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { ListingResults } from '../components/ListingResults'
import { ChevronRight } from '../components/Icons'

/** A collection: breadcrumb, its name, then filters, sort, the grid and its pages. */
export const CollectionPage = () => {
  const { t } = useStorefront()
  const page = useCollection()
  const name = page.collection?.name ?? (page.all ? t('site.search.shopAllTitle') : null)
  return (
    <Layout>
      <div className="container mx-auto mt-16 px-4 py-8">
        {page.found === 'missing' || page.found === 'error' ? (
          <div className="mx-auto max-w-xl py-16 text-center">
            <h1 className="my-0 text-3xl font-bold tracking-tight text-ink">{page.found === 'missing' ? t('site.listing.notFound') : t('shop.listing.failed')}</h1>
            <p className="mt-2 mb-6 text-ink-muted">{page.found === 'missing' ? t('shop.collection.missingLead') : t('shop.listing.failedLead')}</p>
            <Link href="/search/" className="inline-flex h-10 items-center rounded-lg bg-brand px-5 text-sm font-bold text-white no-underline transition-colors hover:bg-brand-dark">
              {t('site.nav.shopAll')}
            </Link>
          </div>
        ) : (
          <>
            <nav className="mb-6" aria-label={t('site.listing.breadcrumb')}>
              <ol className="my-0 flex list-none flex-wrap items-center gap-1.5 pl-0 text-sm break-words text-[#62748e] sm:gap-2.5">
                <li className="inline-flex items-center gap-1.5">
                  <Link href="/" className="text-inherit no-underline transition-colors hover:text-[#020618]">
                    {t('site.nav.home')}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <span className="font-normal text-[#020618] uppercase">{name ?? ''}</span>
                </li>
              </ol>
            </nav>
            <div className="mb-8">
              <h1 className="my-0 text-3xl font-bold tracking-tight uppercase">{name ?? ''}</h1>
            </div>
            <ListingResults listing={page} />
          </>
        )}
      </div>
    </Layout>
  )
}
