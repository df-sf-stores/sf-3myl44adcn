import type { ReactNode } from 'react'
import { Link, StoreLogo, useStorefront } from '@dripfunnel/storefront-core/theme'
import { Logo } from './interactive/Header'

/** Sign in and register: the dark brand panel at the left from 1024px, the form centred beside it. */
export const AuthLayout = ({ lead, title, subtitle, children }: { lead: string; title: string; subtitle: string; children: ReactNode }) => {
  const { t } = useStorefront()
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden overflow-hidden bg-charcoal-dark text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:rounded-br-3xl lg:p-12">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-promo/35 blur-3xl" />
          <div className="absolute -right-24 -bottom-40 size-[32rem] rounded-full bg-brand-2/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1.3px)] [background-size:22px_22px] opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-charcoal-dark/40 to-charcoal-dark/80" />
        </div>
        <Link href="/" className="relative inline-block w-fit">
          <span className="relative block aspect-[1.42] h-14 overflow-hidden rounded-lg bg-white">
            <StoreLogo className="absolute inset-0 size-full object-contain" />
          </span>
          <span className="sr-only">{t('site.nav.home')}</span>
        </Link>
        <div className="relative max-w-md space-y-6">
          <div className="h-1.5 w-16 rounded-full bg-promo" />
          <h2 className="text-4xl font-bold tracking-tight">{t('site.nav.logo')}</h2>
          <p className="text-xl leading-relaxed text-white/80">{lead}</p>
          <div className="flex gap-4 pt-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <p className="my-0 text-2xl font-bold">{t('site.auth.fast')}</p>
              <p className="my-0 text-sm text-white/70">{t('site.auth.checkout')}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <p className="my-0 text-2xl font-bold">{t('site.auth.secure')}</p>
              <p className="my-0 text-sm text-white/70">{t('site.auth.payments')}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
              <p className="my-0 text-2xl font-bold">{t('site.auth.easy')}</p>
              <p className="my-0 text-sm text-white/70">{t('site.auth.returns')}</p>
            </div>
          </div>
        </div>
        <p className="relative my-0 text-sm text-white/50">{t('site.auth.copyright')}</p>
      </div>
      <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <Link href="/" className="mx-auto mb-4 inline-block lg:hidden">
              <Logo className="h-12" />
              <span className="sr-only">{t('site.nav.home')}</span>
            </Link>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mb-0 text-[#62748e]">{subtitle}</p>
          </div>
          <div className="flex flex-col gap-6 overflow-hidden rounded-xl bg-white py-6 text-sm shadow-xs ring-1 ring-[#020618]/10">{children}</div>
        </div>
      </div>
    </div>
  )
}
