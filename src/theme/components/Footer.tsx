import type { ReactNode } from 'react'
import { ConsentSettingsButton, Link, PoweredBy, StoreLogo, ThemeImage, useMenu, useStorefront } from '@dripfunnel/storefront-core/theme'
import { BadgeCheck, Basket, Clock, MapPin, Phone, Truck, WhatsAppMark } from './Icons'
import { phoneDigits, whatsappLink } from './contact'
import { pulsesFirst } from './catalog'
import layout from '../styles/layout.module.css'

const Column = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <p className="mb-4 text-[13px] font-extrabold tracking-[0.12em] text-white uppercase mt-0">{title}</p>
    <ul className="space-y-2.5 text-sm my-0 list-none pl-0">{children}</ul>
  </div>
)

const Detail = ({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) => (
  <div>
    <p className="mb-2 flex items-center gap-2 text-[13px] font-extrabold tracking-[0.12em] text-white uppercase mt-0">
      {icon}
      {title}
    </p>
    <div className="space-y-1 pl-6 text-sm leading-relaxed text-white/75">{children}</div>
  </div>
)

export const Footer = () => {
  const { store, t, poweredBy } = useStorefront()
  const menu = useMenu()
  const address = store.address
  const streetParts = (address?.street ?? '').split(',').map((part) => part.trim()).filter(Boolean)
  const lastStreet = streetParts.length > 1 ? streetParts[streetParts.length - 1] : null
  const firstStreet = (lastStreet ? streetParts.slice(0, -1) : streetParts).join(', ')
  const cityLine = [lastStreet, address?.city].filter(Boolean).join(', ')
  const country = address?.country === 'IN' ? t('site.footer.india') : (address?.country ?? '')
  const phones = phoneDigits(store)
  return (
    <footer className="mt-auto bg-charcoal-dark text-white">
      <div className="h-1.5 bg-promo" />
      <div className="mx-auto max-w-[1600px] px-4 pt-12 pb-6 md:pt-14 lg:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] lg:gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block text-inherit no-underline">
              <span className="relative block aspect-[1.42] h-12 shrink-0 overflow-hidden rounded-lg bg-white">
                <StoreLogo className="absolute inset-0 size-full object-contain" />
              </span>
              <span className="sr-only">{t('site.nav.home')}</span>
            </Link>
            <p className="mt-5 max-w-[340px] text-sm leading-relaxed text-white/75 mb-0">{t('site.footer.statement')}</p>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold mb-0 list-none pl-0">
              {store.tagline ? (
                <li className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white/90">
                  <Truck className="size-3.5 text-brand-2" />
                  {store.tagline}
                </li>
              ) : null}
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white/90">
                <BadgeCheck className="size-3.5 text-brand-2" />
                {t('site.announce.quality')}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white/90">
                <Basket className="size-3.5 text-brand-2" />
                {t('site.announce.essentials')}
              </li>
            </ul>
          </div>
          <Column title={t('site.footer.shop')}>
            {pulsesFirst(menu.items).map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="inline-flex items-center gap-2 text-white/75 transition-colors before:size-1 before:rounded-full before:bg-white/30 before:transition-colors hover:text-white hover:before:bg-promo uppercase no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/search/" className="inline-flex items-center gap-2 text-white/75 transition-colors before:size-1 before:rounded-full before:bg-white/30 before:transition-colors hover:text-white hover:before:bg-promo no-underline">
                {t('site.footer.shopAll')}
              </Link>
            </li>
          </Column>
          <Column title={t('site.footer.company')}>
            <li>
              <Link href="/about/" className="inline-flex items-center gap-2 text-white/75 transition-colors before:size-1 before:rounded-full before:bg-white/30 before:transition-colors hover:text-white hover:before:bg-promo no-underline">
                {t('site.footer.about')}
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="inline-flex items-center gap-2 text-white/75 transition-colors before:size-1 before:rounded-full before:bg-white/30 before:transition-colors hover:text-white hover:before:bg-promo no-underline">
                {t('site.footer.contact')}
              </Link>
            </li>
          </Column>
          <Column title={t('site.footer.legal')}>
            <li>
              <Link href="/policies/privacy/" className="inline-flex items-center gap-2 text-white/75 transition-colors before:size-1 before:rounded-full before:bg-white/30 before:transition-colors hover:text-white hover:before:bg-promo no-underline">
                {t('site.footer.privacy')}
              </Link>
            </li>
            <li>
              <Link href="/policies/terms/" className="inline-flex items-center gap-2 text-white/75 transition-colors before:size-1 before:rounded-full before:bg-white/30 before:transition-colors hover:text-white hover:before:bg-promo no-underline">
                {t('site.footer.terms')}
              </Link>
            </li>
          </Column>
          <div className="col-span-2 space-y-5 md:col-span-3 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 lg:col-span-1 lg:block lg:space-y-5">
            {address ? (
              <Detail icon={<MapPin className="size-4 shrink-0 text-brand-2" />} title={t('site.footer.location')}>
                <p className="my-0">
                  {firstStreet ? <span className="block">{t('site.footer.addressPart', { part: firstStreet })}</span> : null}
                  {cityLine ? <span className="block">{t('site.footer.addressPart', { part: cityLine })}</span> : null}
                  <span className="block">{t('site.footer.addressLine', { region: address.region ?? '', postal: address.postal ?? '', country })}</span>
                </p>
              </Detail>
            ) : null}
            {phones.length ? (
              <Detail icon={<Phone className="size-4 shrink-0 text-brand-2" />} title={t('site.footer.phones')}>
                {phones.map((digits) => (
                  <span key={digits} className="block w-fit">
                    {t('site.footer.phone', { code: digits.slice(0, -10), number: digits.slice(-10) })}
                  </span>
                ))}
              </Detail>
            ) : null}
            <Detail icon={<Clock className="size-4 shrink-0 text-brand-2" />} title={t('site.footer.hours')}>
              <span className="block">{t('site.footer.days')}</span>
              <span className="block">{t('site.footer.time')}</span>
            </Detail>
          </div>
        </div>
      </div>
      {/* Footer bottom bar: inside <footer>, so it shares the footer's bg-charcoal-dark with no seam. */}
      <div className={layout.base}>
        <div className={`mx-auto max-w-[1600px] px-4 lg:px-6 ${layout.baseInner}`}>
          <p className={layout.copyright}>{t('site.footer.copyright', { store: store.name })}</p>
          <div className={layout.baseEnd}>
            <ConsentSettingsButton t={t} className={layout.cookies} />
            <span className={layout.divider} aria-hidden="true" />
            <div className={layout.poweredGroup}>
              {poweredBy ? (
                <PoweredBy brand={poweredBy} t={t} className={layout.powered} />
              ) : (
                <span className={layout.powered}>{t('site.footer.poweredBy')}</span>
              )}
              <Link href={t('site.footer.poweredUrl')} className={layout.brandLink}>
                <ThemeImage src="dripfunnel-white-logo.png" alt={t('site.footer.poweredLogo')} ratio={2077 / 369} sizes="104px" className={layout.brandLogo} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** The floating WhatsApp button, to the store's WhatsApp from Site settings. */
export const WhatsAppButton = () => {
  const { store, t } = useStorefront()
  const href = whatsappLink(store)
  if (!href) return null
  return (
    <div className="group fixed right-5 bottom-5 z-40 sm:right-6 sm:bottom-6">
      <Link
        href={href}
        className="flex h-14 items-center rounded-full bg-whatsapp pr-3 pl-3 text-white shadow-lg shadow-black/20 transition-shadow ease-out hover:pl-6 hover:shadow-xl focus-visible:pl-6 focus-visible:ring-4 focus-visible:ring-whatsapp/40 focus-visible:outline-none no-underline"
      >
        <span
          aria-hidden="true"
          className="max-w-0 overflow-hidden text-base font-semibold whitespace-nowrap text-ink opacity-0 transition-opacity ease-out group-focus-within:mr-3 group-focus-within:max-w-40 group-focus-within:opacity-100 group-hover:mr-3 group-hover:max-w-40 group-hover:opacity-100"
        >
          {t('site.footer.chat')}
        </span>
        <span className="sr-only">{t('site.footer.whatsapp')}</span>
        <WhatsAppMark className="size-8 shrink-0 fill-current" />
      </Link>
    </div>
  )
}
