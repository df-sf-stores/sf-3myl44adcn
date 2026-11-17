import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'

/** The reference's Not Found words, in its page column, with the way home and to the catalog. */
export const NotFoundPage = () => {
  const { t } = useStorefront()
  return (
    <Layout>
      <div className="mx-auto max-w-[820px] px-4 py-20 text-center md:py-28">
        <p className="my-0 text-6xl font-black tracking-tight text-brand">{t('site.notFound.code')}</p>
        <h1 className="mt-4 mb-0 text-3xl font-extrabold tracking-tight text-[#101828] md:text-4xl">{t('site.notFound.title')}</h1>
        <p className="mx-auto mt-3 mb-0 max-w-[520px] text-sm leading-[1.7] text-[#52637A] md:text-base">{t('site.notFound.message')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-bold text-white no-underline transition-colors hover:bg-brand-dark">
            {t('site.notFound.home')}
          </Link>
          <Link href="/search/" className="inline-flex h-11 items-center rounded-lg border-2 border-line bg-white px-6 text-sm font-bold text-ink no-underline transition-colors hover:border-brand hover:text-brand">
            {t('site.notFound.browse')}
          </Link>
        </div>
      </div>
    </Layout>
  )
}
