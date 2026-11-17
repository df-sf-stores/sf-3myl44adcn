import type { ReactNode } from 'react'
import { useLocation, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'

const Part = ({ title, children }: { title: string; children: ReactNode }) => (
  <section>
    <h2 className="my-0 text-lg font-bold text-[#101828]">{title}</h2>
    <p className="mt-2 mb-0 text-sm leading-[1.7] text-[#52637A] md:text-base">{children}</p>
  </section>
)

/** Privacy Policy (/policies/privacy/) and Terms & Conditions (/policies/terms/), in the reference's words. */
export const PolicyPage = () => {
  const { store, t } = useStorefront()
  const { path } = useLocation()
  const terms = path.includes('/terms')
  return (
    <Layout>
      <div className="mx-auto max-w-[820px] px-4 py-12 md:py-16">
        <h1 className="my-0 text-3xl font-extrabold tracking-tight text-[#101828] md:text-4xl">{terms ? t('site.terms.heading') : t('site.privacy.heading')}</h1>
        <p className="mt-2 mb-0 text-sm text-[#667085]">{t('site.policy.updated')}</p>
        {terms ? (
          <div className="mt-8 space-y-8">
            <Part title={t('site.terms.acceptance')}>{t('site.terms.acceptanceBody', { store: store.name })}</Part>
            <Part title={t('site.terms.use')}>{t('site.terms.useBody')}</Part>
            <Part title={t('site.terms.orders')}>{t('site.terms.ordersBody')}</Part>
            <Part title={t('site.terms.pricing')}>{t('site.terms.pricingBody')}</Part>
            <Part title={t('site.terms.returns')}>{t('site.terms.returnsBody')}</Part>
            <Part title={t('site.terms.changes')}>{t('site.terms.changesBody')}</Part>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <Part title={t('site.privacy.collect')}>{t('site.privacy.collectBody')}</Part>
            <Part title={t('site.privacy.use')}>{t('site.privacy.useBody')}</Part>
            <Part title={t('site.privacy.cookies')}>{t('site.privacy.cookiesBody')}</Part>
            <Part title={t('site.privacy.third')}>{t('site.privacy.thirdBody')}</Part>
            <Part title={t('site.privacy.rights')}>{t('site.privacy.rightsBody')}</Part>
            <Part title={t('site.privacy.changes')}>{t('site.privacy.changesBody')}</Part>
          </div>
        )}
      </div>
    </Layout>
  )
}
