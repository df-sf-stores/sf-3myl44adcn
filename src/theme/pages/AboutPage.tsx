import { useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'

export const AboutPage = () => {
  const { store, t } = useStorefront()
  return (
    <Layout>
      <div className="mx-auto max-w-[820px] px-4 py-12 md:py-16">
        <h1 className="my-0 text-3xl font-extrabold tracking-tight text-[#101828] md:text-4xl">{t('site.about.heading', { store: store.name })}</h1>
        <div className="mt-8 space-y-8">
          <p className="text-sm leading-[1.7] text-[#52637A] md:text-base">{t('site.about.paragraph1', { store: store.name })}</p>
          <p className="mb-0 text-sm leading-[1.7] text-[#52637A] md:text-base">{t('site.about.paragraph2')}</p>
        </div>
      </div>
    </Layout>
  )
}
