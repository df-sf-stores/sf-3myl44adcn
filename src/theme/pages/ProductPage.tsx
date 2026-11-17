import type { ReactNode } from 'react'
import { LegalNotices, Link, Price, RichText, SizeChart, useProduct, useStorefront } from '@dripfunnel/storefront-core/theme'
import { BuyButtons } from '../components/interactive/BuyButtons'
import { Carousel } from '../components/interactive/Carousel'
import { Faq, Gallery } from '../components/interactive/Gallery'
import { Retry } from '../components/interactive/Retry'
import { WishlistHeart } from '../components/interactive/Wishlist'
import { Layout } from '../components/Layout'
import { GridCard } from '../components/ProductCard'
import { useCategoryNames } from '../components/catalog'
import { ArrowRight, BadgeCheck, ChevronRight, CircleCheck, Milk, ShieldCheck, Truck } from '../components/Icons'
import card from '../styles/card.module.css'

const Trust = ({ icon, title, text }: { icon: ReactNode; title: string; text: string }) => (
  <li className="flex items-center gap-3 rounded-xl border border-line bg-white p-3">
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">{icon}</span>
    <span className="min-w-0">
      <span className="block text-[13px] leading-tight font-bold text-ink">{title}</span>
      <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{text}</span>
    </span>
  </li>
)

const Row = ({ term, children }: { term: string; children: ReactNode }) => (
  <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 px-4 py-3 text-sm sm:px-5">
    <dt className="font-semibold text-ink-muted">{term}</dt>
    <dd className="m-0 font-semibold break-words text-ink">{children}</dd>
  </div>
)

export const ProductPage = () => {
  const { store, locale, t } = useStorefront()
  const page = useProduct()
  const { collections, nameOf, nameById } = useCategoryNames()
  const product = page.product
  if (page.status === 'missing' || page.status === 'error' || !product) {
    return (
      <Layout>
        <div className="mx-auto max-w-[1320px] px-4 py-16 lg:px-6">
          {page.status === 'missing' || page.status === 'error' ? (
            <div className="mx-auto max-w-xl text-center">
              <h1 className="my-0 text-3xl font-black tracking-tight text-ink">{page.status === 'missing' ? t('shop.product.missing') : t('shop.product.failed')}</h1>
              <p className="mt-2 mb-6 text-ink-muted">{page.status === 'missing' ? t('shop.product.missingLead') : t('shop.listing.failedLead')}</p>
              {page.status === 'missing' ? (
                <Link href="/search/" className="inline-flex h-10 items-center rounded-lg bg-brand px-5 text-sm font-bold text-white no-underline hover:bg-brand-dark">
                  {t('site.nav.shopAll')}
                </Link>
              ) : (
                <Retry label={t('shop.listing.retry')} onRetry={page.retry} />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12" aria-busy="true" aria-label={t('shop.product.loading')}>
              <span className="block aspect-square animate-pulse rounded-2xl bg-brand-tint" />
              <span className="block space-y-4">
                <span className="block h-4 w-24 animate-pulse rounded bg-muted" />
                <span className="block h-10 w-3/4 animate-pulse rounded bg-muted" />
                <span className="block h-8 w-40 animate-pulse rounded bg-muted" />
                <span className="block h-13 w-full animate-pulse rounded-full bg-muted" />
              </span>
            </div>
          )}
        </div>
      </Layout>
    )
  }
  const categoryName = nameById(product.id)
  const category = collections.find((c) => c.name === categoryName) ?? null
  const specs = product.specs.filter((s) => s.versionId === null || s.versionId === page.version?.id)
  const inStock = page.stock?.inStock ?? product.stock.inStock
  const faqs = [
    { question: t('site.product.faq.ordering'), answer: t('site.product.faq.orderingAnswer') },
    { question: t('site.product.faq.pricing'), answer: t('site.product.faq.pricingAnswer') },
    { question: t('site.product.faq.status'), answer: t('site.product.faq.statusAnswer') },
    { question: t('site.product.faq.issues'), answer: t('site.product.faq.issuesAnswer') },
    ...product.faqs,
  ]
  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-[1320px] px-4 lg:px-6">
          <nav className="py-4 sm:py-5" aria-label={t('site.listing.breadcrumb')}>
            <ol className="my-0 flex list-none flex-nowrap items-center gap-1.5 pl-0 text-[13px] text-ink-muted sm:gap-2.5">
              <li className="inline-flex shrink-0 items-center gap-1.5">
                <Link href="/" className="text-inherit no-underline transition-colors hover:text-brand">
                  {t('site.nav.home')}
                </Link>
              </li>
              {category ? (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="size-3.5" />
                  </li>
                  <li className="inline-flex min-w-0 shrink-0 items-center gap-1.5">
                    <Link href={category.href} className="text-inherit uppercase no-underline transition-colors hover:text-brand">
                      {category.name}
                    </Link>
                  </li>
                </>
              ) : null}
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li className="inline-flex min-w-0 items-center gap-1.5">
                <span className="truncate font-semibold text-ink" aria-current="page">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 gap-6 pb-10 sm:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Gallery photos={page.photos} name={product.name} />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                {category ? (
                  <Link href={category.href} className="w-fit text-xs font-bold tracking-[0.14em] text-brand uppercase no-underline transition-colors hover:text-brand-dark">
                    {category.name}
                  </Link>
                ) : null}
                <div className="mt-2 flex items-start gap-3">
                  <h1 className="my-0 min-w-0 flex-1 text-[28px] leading-[1.1] font-black tracking-tight text-ink sm:text-4xl xl:text-[42px]">{product.name}</h1>
                  <WishlistHeart productId={product.id} versionId={page.version?.id ?? null} name={product.name} large />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {page.price ? <Price money={page.price} compareAt={page.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={card.productPrice} /> : null}
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${inStock ? 'bg-brand-tint text-brand-dark' : 'bg-line text-ink-muted'}`} role="status">
                    <CircleCheck className="size-3.5" />
                    {inStock ? t('site.card.inStock') : t('site.card.outOfStock')}
                  </span>
                </div>
                {store.pricesIncludeTax ? <p className="mt-2 mb-0 text-xs text-ink-muted">{t('site.product.taxes')}</p> : null}
                <SizeChart chart={product.sizeChart} className="mt-3 w-fit text-sm font-semibold text-brand underline" />
                <BuyButtons page={page} />
              </div>
              <ul className="my-0 grid list-none grid-cols-2 gap-2.5 pl-0">
                <Trust icon={<BadgeCheck className="size-[18px]" />} title={t('site.product.trust.brands')} text={t('site.product.trust.brandsText')} />
                <Trust icon={<Milk className="size-[18px]" />} title={t('site.product.trust.fresh')} text={t('site.product.trust.freshText')} />
                <Trust icon={<ShieldCheck className="size-[18px]" />} title={t('site.product.trust.secure')} text={t('site.product.trust.secureText')} />
                <Trust icon={<Truck className="size-[18px]" />} title={t('site.product.trust.delivery')} text={t('site.product.trust.deliveryText')} />
              </ul>
              <LegalNotices notices={product.legal} t={t} className="text-sm text-ink-muted" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-y border-line bg-cream-light/60 py-10 md:py-12">
        <div className="mx-auto grid max-w-[1320px] gap-5 px-4 lg:grid-cols-2 lg:items-start lg:gap-6 lg:px-6">
          <section className="rounded-2xl border border-line bg-cream-light p-5 sm:p-6">
            <h2 className="my-0 text-lg font-black tracking-tight text-ink sm:text-xl">{t('site.product.information')}</h2>
            <div className="mt-4">
              <dl className="my-0 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
                {category ? <Row term={t('site.product.category')}>{category.name}</Row> : null}
                {specs.map((s) => (
                  <Row key={`${s.name}-${s.versionId ?? ''}`} term={s.name}>
                    {s.value}
                  </Row>
                ))}
                {!category && !specs.length ? <Row term={t('site.product.name')}>{product.name}</Row> : null}
              </dl>
              {product.description ? <RichText html={product.description} className="mt-4 text-sm leading-relaxed text-ink-muted" /> : null}
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 className="my-0 text-lg font-black tracking-tight text-ink sm:text-xl">{t('site.product.faqTitle')}</h2>
            <Faq items={faqs} />
          </section>
        </div>
      </div>
      {product.related.length ? (
        <section className="py-10 md:py-12">
          <div className="mx-auto max-w-[1320px] px-4 lg:px-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-[0.14em] text-brand uppercase">{t('site.product.alsoLike')}</span>
                <h2 className="mt-1 mb-0 text-2xl font-black tracking-tight text-ink sm:text-[28px]">{t('site.product.related')}</h2>
              </div>
              <Link href={category?.href ?? '/search/'} className="group inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand no-underline transition-colors hover:text-brand-dark">
                {t('site.product.viewAll')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <Carousel related label={t('site.product.related')} slides={product.related.map((p) => ({ key: p.id, content: <GridCard product={p} category={nameOf(p)} /> }))} />
          </div>
        </section>
      ) : null}
    </Layout>
  )
}
