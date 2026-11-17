'use client'

import { useRef, useState } from 'react'
import { AddToCart, BuyNow, Link, Price, useInView, useStorefront, type ProductPage } from '@dripfunnel/storefront-core/theme'
import { Cart, Minus, Plus, Zap } from '../Icons'
import card from '../../styles/card.module.css'

/** Each option's values as pills; a value sold out with the other choices stays choosable but fades. */
const Options = ({ page }: { page: ProductPage }) => {
  const { t } = useStorefront()
  if (!page.options.length) return null
  return (
    <div className="space-y-3">
      {page.options.map((option) => (
        <div key={option.id} role="group" aria-label={option.name}>
          <p className="mt-0 mb-2 text-sm font-bold text-ink">{option.name}</p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => (
              <button
                key={value.id}
                type="button"
                aria-pressed={value.selected}
                aria-label={value.available ? value.name : t('shop.product.unavailable', { value: value.name })}
                onClick={() => page.choose(option.id, value.id)}
                className={`h-10 rounded-full border-2 px-4 text-sm font-semibold transition-colors ${value.selected ? 'border-brand bg-brand-tint text-brand-dark' : 'border-line bg-white text-ink hover:border-brand/50'} ${value.available ? '' : 'opacity-45'}`}
              >
                {value.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Quantity, Add to Cart and Buy Now for the chosen version; below 1024px a bar with Add to Cart follows once they scroll away. */
export const BuyButtons = ({ page }: { page: ProductPage }) => {
  const { store, locale, t } = useStorefront()
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState<'added' | 'failed' | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const version = page.version
  const buyable = version !== null && version.stock.inStock
  const most = version?.stock.available ?? 99
  const name = page.product?.name ?? ''
  return (
    <>
      <Options page={page} />
      <div ref={ref} className="mt-6 space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-ink">{t('site.product.quantity')}</span>
          <div className="inline-flex h-11 items-center rounded-full border-2 border-line bg-white" role="group" aria-label={t('site.product.quantity')}>
            <button
              type="button"
              aria-label={t('site.product.decrease')}
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
              className="flex size-10 items-center justify-center rounded-full border-0 bg-transparent p-0 text-ink transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-ink"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-9 text-center text-base font-bold text-ink tabular-nums" role="status">
              {quantity}
            </span>
            <button
              type="button"
              aria-label={t('site.product.increase')}
              disabled={quantity >= most}
              onClick={() => setQuantity(quantity + 1)}
              className="flex size-10 items-center justify-center rounded-full border-0 bg-transparent p-0 text-ink transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:text-ink"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <AddToCart
            versionId={version?.id ?? null}
            quantity={quantity}
            disabled={!buyable}
            onDone={(added) => setNote(added ? 'added' : 'failed')}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-0 bg-brand px-6 text-base font-bold text-white shadow-[0_12px_24px_-12px_rgba(226,77,34,0.7)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Cart className="size-5" />
            {t('site.card.add')}
          </AddToCart>
          <BuyNow
            versionId={version?.id ?? null}
            quantity={quantity}
            disabled={!buyable}
            onDone={(bought) => setNote(bought ? null : 'failed')}
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-charcoal bg-charcoal px-6 text-base font-bold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-charcoal-dark focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            <Zap className="size-5" />
            {t('site.card.buy')}
          </BuyNow>
        </div>
        {page.missing[0] ? <p className="my-0 text-sm text-ink-muted">{t('shop.product.choose', { option: page.missing[0].name })}</p> : null}
        {note ? (
          <p className="my-0 text-sm font-semibold text-ink" role="status">
            {note === 'added' ? t('shop.product.added') : t('shop.product.addFailed')}{' '}
            {note === 'added' ? (
              <Link href="/cart/" className="text-brand underline">
                {t('shop.product.viewCart')}
              </Link>
            ) : null}
          </p>
        ) : null}
      </div>
      <div
        aria-hidden={inView}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(44,47,48,0.25)] backdrop-blur transition-transform motion-reduce:transition-none lg:hidden ${inView ? 'translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="my-0 truncate text-xs font-semibold text-ink-muted">{name}</p>
            {page.price ? <Price money={page.price} compareAt={null} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={card.barPrice} /> : null}
          </div>
          <AddToCart
            versionId={version?.id ?? null}
            quantity={quantity}
            disabled={!buyable}
            onDone={(added) => setNote(added ? 'added' : 'failed')}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border-0 bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-ink/15 disabled:text-ink-muted"
          >
            <Cart className="size-5" />
            {t('site.card.add')}
          </AddToCart>
        </div>
      </div>
    </>
  )
}
