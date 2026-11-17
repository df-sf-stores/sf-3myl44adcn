'use client'

import { useState } from 'react'
import { CodeField, EditAnswers, Image, LineAnswers, Link, OrderSummary, Price, useCart, useStorefront, type CartLine } from '@dripfunnel/storefront-core/theme'
import { Retry } from './Retry'
import { Close, Minus, Plus } from '../Icons'
import card from '../../styles/card.module.css'
import styles from '../../styles/cart.module.css'

/** The cart page: lines with their steppers, then the order summary, checkout and promotion code beside them. */
export const CartView = () => {
  const { store, locale, t } = useStorefront()
  const page = useCart()
  const [codeNote, setCodeNote] = useState<{ words: string; refused: boolean } | null>(null)
  const codeWord = (state: string) =>
    state === 'APPLIED'
      ? t('shop.cart.codes.applied')
      : state === 'NOT_ELIGIBLE'
        ? t('shop.cart.codes.notEligible')
        : state === 'DOESNT_COMBINE'
          ? t('shop.cart.codes.doesntCombine')
          : state === 'SIGN_IN_REQUIRED'
            ? t('shop.cart.codes.signIn')
            : state === 'EXPIRED'
              ? t('shop.cart.codes.expired')
              : state === 'USED_UP'
                ? t('shop.cart.codes.usedUp')
                : state === 'ALREADY_USED'
                  ? t('shop.cart.codes.alreadyUsed')
                  : t('shop.cart.codes.invalid')
  const problemWords = (line: CartLine) =>
    line.problem === 'short' && line.available !== null ? t('shop.cart.problems.short', { count: line.available }) : line.problem === 'not_sold_here' ? t('shop.cart.problems.notSoldHere') : line.problem === 'check_answers' ? t('shop.cart.problems.checkAnswers') : line.problem ? t('shop.cart.problems.unavailable') : null

  if (page.status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-20" aria-busy="true" aria-label={t('shop.cart.loading')}>
        <h1 className="mt-0 mb-8 text-3xl font-bold">{t('site.cart.title')}</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <span className="block h-36 animate-pulse rounded-xl bg-muted lg:col-span-2" />
          <span className="block h-72 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    )
  }
  if (page.status === 'error') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mt-0 mb-4 text-3xl font-bold">{t('shop.cart.failed')}</h1>
        <p className="mt-0 mb-8 text-[#62748e]">{t('shop.listing.failedLead')}</p>
        <Retry label={t('shop.listing.retry')} onRetry={page.retry} />
      </div>
    )
  }
  const cart = page.cart
  if (!cart || cart.lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="mt-0 mb-8 text-3xl font-bold">{t('site.cart.title')}</h1>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="mt-0 mb-4 text-3xl font-bold">{t('site.cart.empty')}</h2>
            <p className="mt-0 mb-8 text-[#62748e]">{t('site.cart.emptyMessage')}</p>
            <Link href="/search/" className="inline-flex h-10 items-center justify-center rounded-md bg-[#0f172b] px-6 text-sm font-medium text-white no-underline transition-colors hover:bg-[#0f172b]/90">
              {t('site.cart.continue')}
            </Link>
          </div>
        </div>
      </div>
    )
  }
  const blocked = cart.lines.some((l) => l.problem !== null)
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="mt-0 mb-8 text-3xl font-bold">{t('site.cart.title')}</h1>
      {page.error ? (
        <p className="mt-0 mb-4 rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
          {t('shop.cart.changeFailed')}
        </p>
      ) : null}
      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="my-0 list-none space-y-4 pl-0 lg:col-span-2">
          {cart.lines.map((line) => (
            <li key={line.versionId} className={`flex gap-4 rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-xs transition-opacity ${line.pending ? 'opacity-60' : ''}`}>
              <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-brand-tint sm:size-[108px]">
                {line.photo ? <Image image={line.photo} alt={line.name} ratio={1} sizes="108px" className="absolute inset-0 size-full object-cover" /> : null}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:justify-between">
                <div className="min-w-0">
                  {line.href ? (
                    <Link href={line.href} className="font-medium text-ink no-underline hover:text-brand">
                      {line.name}
                    </Link>
                  ) : (
                    <p className="my-0 font-medium text-ink">{line.name}</p>
                  )}
                  {line.versionName ? <p className="mt-1 mb-0 text-sm text-[#62748e]">{line.versionName}</p> : null}
                  <LineAnswers line={line} className="mt-1 text-sm text-[#62748e]" />
                  <EditAnswers line={line} className="mt-1 text-sm text-brand underline" />
                  {line.gift ? <p className="mt-1 mb-0 text-sm text-[#62748e]">{t('shop.cart.giftFor', { name: line.gift.recipientName, email: line.gift.recipientEmail })}</p> : null}
                  {problemWords(line) ? <p className="mt-1 mb-0 text-sm font-semibold text-danger">{problemWords(line)}</p> : null}
                  <div className="mt-3 flex items-center gap-4">
                    <div className="inline-flex h-10 items-center rounded-full border border-[#e2e8f0]" role="group" aria-label={t('shop.cart.quantity', { name: line.name })}>
                      <button type="button" aria-label={t('shop.cart.less')} disabled={line.quantity <= 1} onClick={() => void page.setQuantity(line.versionId, line.quantity - 1)} className="flex size-9 items-center justify-center rounded-full border-0 bg-transparent p-0 text-ink hover:bg-muted disabled:opacity-40">
                        <Minus className="size-4" />
                      </button>
                      <span className="w-9 text-center font-medium tabular-nums" aria-live="polite">
                        {line.quantity}
                      </span>
                      <button type="button" aria-label={t('shop.cart.more')} onClick={() => void page.setQuantity(line.versionId, line.quantity + 1)} className="flex size-9 items-center justify-center rounded-full border-0 bg-transparent p-0 text-ink hover:bg-muted">
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <button type="button" onClick={() => void page.remove(line.versionId)} className="inline-flex size-8 items-center justify-center rounded-md border-0 bg-transparent p-0 text-danger hover:bg-danger/10">
                      <Close className="size-4" />
                      <span className="sr-only">{t('site.cart.remove')}</span>
                    </button>
                  </div>
                </div>
                <div className="shrink-0 sm:text-right">
                  {line.lineTotal ? <Price money={line.lineTotal} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={card.lineTotal} /> : null}
                  {line.unitPrice ? (
                    <p className="mt-1 mb-0 text-sm text-[#62748e]">
                      <Price money={line.unitPrice} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={card.unitPrice} /> {t('site.cart.each')}
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="space-y-4">
          <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-xs">
            <h2 className="mt-0 mb-4 text-xl font-semibold text-[#020618]">{t('site.cart.summary')}</h2>
            <OrderSummary cart={cart} at="cart" locale={locale} t={t} className={styles.summary} />
            <div className="mt-6 space-y-3">
              {blocked ? (
                <>
                  <p className="my-0 text-sm text-danger">{t('shop.cart.blocked')}</p>
                  <button type="button" disabled className="flex h-10 w-full items-center justify-center rounded-md border-0 bg-[#0f172b] text-sm font-medium text-white opacity-50">
                    {t('site.cart.checkout')}
                  </button>
                </>
              ) : (
                <Link href="/checkout/" className="flex h-10 w-full items-center justify-center rounded-md bg-[#0f172b] text-sm font-medium text-white no-underline transition-colors hover:bg-[#0f172b]/90">
                  {t('site.cart.checkout')}
                </Link>
              )}
              <p className="my-0 flex items-center justify-center gap-1.5 text-xs text-[#62748e]">
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {t('site.cart.secure')}
              </p>
              <Link href="/search/" className="flex h-10 w-full items-center justify-center rounded-md border border-[#e2e8f0] bg-white text-sm font-medium text-ink no-underline shadow-xs transition-colors hover:bg-muted">
                {t('site.cart.continue')}
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-xs">
            <h2 className="mt-0 mb-1 flex items-center gap-2 text-lg font-medium text-[#020618]">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              {t('site.cart.promotion')}
            </h2>
            <p className="mt-0 mb-4 text-sm text-[#62748e]">{t('site.cart.enterCode')}</p>
            <CodeField
              label={t('site.cart.codeLabel')}
              button={t('site.cart.apply')}
              message={codeNote?.words ?? null}
              refused={codeNote?.refused ?? false}
              className={styles.code}
              onApply={async (code) => {
                const state = await page.applyCode(code)
                setCodeNote({ words: state ? codeWord(state) : t('shop.cart.changeFailed'), refused: state !== 'APPLIED' })
                return state === 'APPLIED'
              }}
            />
            {cart.codes.length ? (
              <ul className="mt-3 mb-0 flex list-none flex-wrap gap-2 pl-0">
                {cart.codes.map((c) => (
                  <li key={c.code} className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1 text-sm font-semibold text-brand-dark">
                    {c.code}
                    <button type="button" aria-label={t('shop.cart.removeCode', { code: c.code })} onClick={() => void page.removeCode(c.code)} className="border-0 bg-transparent p-0 text-brand-dark">
                      <Close className="size-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  )
}
