import type { ReactNode } from 'react'
import { Link, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { ContactForm } from '../components/interactive/ContactForm'
import { Clock, Mail, MapPin, Phone } from '../components/Icons'
import { phoneDigits } from '../components/contact'

const Detail = ({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) => (
  <li className="flex items-start gap-3">
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">{icon}</span>
    <div className="min-w-0 pt-1.5">
      <p className="my-0 text-xs font-medium text-ink-muted">{label}</p>
      <div className="mt-0.5 space-y-0.5 text-sm leading-[1.55] font-semibold text-ink">{children}</div>
    </div>
  </li>
)

export const ContactPage = () => {
  const { store, t } = useStorefront()
  const address = store.address
  const streetParts = (address?.street ?? '').split(',').map((part) => part.trim()).filter(Boolean)
  const lastStreet = streetParts.length > 1 ? streetParts[streetParts.length - 1] : null
  const firstStreet = (lastStreet ? streetParts.slice(0, -1) : streetParts).join(', ')
  const cityLine = [lastStreet, address?.city].filter(Boolean).join(', ')
  const country = address?.country === 'IN' ? t('site.footer.india') : (address?.country ?? '')
  const phones = phoneDigits(store)
  return (
    <Layout>
      <div className="bg-white">
        <section className="border-b border-line bg-brand-tint">
          <div className="mx-auto max-w-[1200px] px-4 py-10 text-center md:py-12">
            <span className="mb-2 inline-block text-xs font-bold tracking-[0.1em] text-brand uppercase">{t('site.contact.eyebrow')}</span>
            <h1 className="my-0 text-[32px] font-extrabold tracking-tight text-ink md:text-[44px]">{t('site.contact.heading')}</h1>
            <p className="mx-auto mt-3 mb-0 max-w-[560px] text-[15px] leading-[1.7] text-ink-muted md:text-[17px]">{t('site.contact.supporting')}</p>
          </div>
        </section>
        <section className="mx-auto max-w-[1200px] px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-line bg-white p-5 shadow-sm md:p-7">
                <h2 className="my-0 text-lg font-bold text-ink">{t('site.contact.info')}</h2>
                <ul className="mt-5 mb-0 list-none space-y-5 pl-0">
                  {address ? (
                    <Detail icon={<MapPin className="size-[18px]" />} label={t('site.footer.location')}>
                      {firstStreet ? <span className="block">{t('site.footer.addressPart', { part: firstStreet })}</span> : null}
                      {cityLine ? <span className="block">{t('site.footer.addressPart', { part: cityLine })}</span> : null}
                      <span className="block">{t('site.footer.addressLine', { region: address.region ?? '', postal: address.postal ?? '', country })}</span>
                    </Detail>
                  ) : null}
                  {phones.length ? (
                    <Detail icon={<Phone className="size-[18px]" />} label={t('site.footer.phones')}>
                      {phones.map((digits) => (
                        <span key={digits} className="block w-fit">
                          {t('site.footer.phone', { code: digits.slice(0, -10), number: digits.slice(-10) })}
                        </span>
                      ))}
                    </Detail>
                  ) : null}
                  {store.contactEmail ? (
                    <Detail icon={<Mail className="size-[18px]" />} label={t('site.contact.emailUs')}>
                      <span className="block break-all">{store.contactEmail}</span>
                    </Detail>
                  ) : null}
                  <Detail icon={<Clock className="size-[18px]" />} label={t('site.footer.hours')}>
                    <span className="block">{t('site.footer.days')}</span>
                    <span className="block">{t('site.footer.time')}</span>
                  </Detail>
                </ul>
                <div className="mt-6 border-t border-line pt-5">
                  <p className="my-0 text-sm font-semibold text-ink">{t('site.contact.helpTitle')}</p>
                  <p className="mt-1.5 mb-0 text-sm leading-[1.6] text-ink-muted">{t('site.contact.helpText')}</p>
                </div>
              </div>
              <div className="rounded-xl border border-line bg-brand-tint p-5">
                <p className="my-0 text-sm font-semibold text-ink">{t('site.contact.signInTitle')}</p>
                <p className="mt-1 mb-0 text-sm leading-[1.6] text-ink-muted">{t('site.contact.signInText')}</p>
                <Link href="/sign-in/" className="mt-3 inline-flex h-8 items-center justify-center rounded-md border border-brand/40 bg-white px-4 text-sm font-medium text-brand no-underline transition-colors hover:bg-brand hover:text-white">
                  {t('site.contact.signIn')}
                </Link>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-line bg-white p-5 shadow-sm md:p-7">
                <h2 className="my-0 text-[22px] font-bold text-ink md:text-[24px]">{t('site.contact.formTitle')}</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
