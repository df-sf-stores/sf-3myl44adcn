import { Link, useStorefront, useWishlist } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../../components/Layout'
import { CardSkeleton, GridCard } from '../../components/ProductCard'
import { useCategoryNames } from '../../components/catalog'
import { ChevronRight, Heart } from '../../components/Icons'

/** The signed-in shopper's saved products, each with its heart to remove it and Add to Cart. */
export const WishlistPage = () => {
  const { t } = useStorefront()
  const wishlist = useWishlist({ cards: true })
  const { nameOf } = useCategoryNames()

  const notice = (title: string, text: string, action: { href: string; label: string } | null) => (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-line bg-white px-6 py-12 text-center">
      <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Heart className="size-7" />
      </span>
      <h2 className="my-0 text-lg font-bold text-ink">{title}</h2>
      <p className="mt-1.5 mb-5 text-sm text-ink-muted">{text}</p>
      {action ? (
        <Link href={action.href} className="inline-flex h-10 items-center rounded-lg bg-brand px-5 text-sm font-bold text-white no-underline transition-colors hover:bg-brand-dark">
          {action.label}
        </Link>
      ) : null}
    </div>
  )

  return (
    <Layout>
      <div className="bg-cream-light">
        <div className="mx-auto w-full max-w-[1600px] px-4 pt-6 pb-12 lg:px-6 lg:pt-8">
          <div className="mb-5 lg:mb-6">
            <nav className="mb-2 flex items-center gap-1 text-xs text-ink-muted" aria-label={t('site.listing.breadcrumb')}>
              <Link href="/account/" className="text-inherit no-underline transition-colors hover:text-brand">
                {t('site.nav.account')}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-ink">{t('site.nav.wishlist')}</span>
            </nav>
            <h1 className="my-0 text-2xl font-extrabold tracking-tight text-ink sm:text-[28px] lg:text-[32px]">{t('pages.wishlist.title')}</h1>
            <p className="mt-1 mb-0 text-sm text-ink-muted">{t('pages.wishlist.lead')}</p>
          </div>

          {wishlist.error ? (
            <p role="alert" className="mt-0 mb-4 text-sm text-danger">
              {wishlist.error === 'LIMIT' ? t('site.wishlist.full') : t('site.wishlist.changeFailed')}
            </p>
          ) : null}

          {wishlist.status === 'loading' ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <CardSkeleton key={i} square />
              ))}
            </div>
          ) : null}

          {wishlist.status === 'signedOut' ? notice(t('site.wishlist.signInTitle'), t('site.wishlist.signInText'), { href: '/sign-in/', label: t('site.nav.signIn') }) : null}

          {wishlist.status === 'error' ? (
            <div className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
              <p className="mt-0 mb-4 text-sm text-ink-muted">{t('site.wishlist.failed')}</p>
              <button type="button" onClick={wishlist.retry} className="inline-flex h-10 cursor-pointer items-center rounded-lg border-0 bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
                {t('site.wishlist.retry')}
              </button>
            </div>
          ) : null}

          {wishlist.status === 'ready' && wishlist.items.length === 0
            ? notice(t('site.wishlist.emptyTitle'), t('site.wishlist.emptyText'), { href: '/search/', label: t('site.nav.shopAll') })
            : null}

          {wishlist.status === 'ready' && wishlist.items.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.items.map((p) => (
                <GridCard key={p.id} product={p} category={nameOf(p)} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
