'use client'

import { useState } from 'react'
import { Link, navigate, useCart, useStorefront, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { ArrowRight, Cart, Zap } from '../Icons'

type Versions = { product: { versions: { id: string; inStock: boolean; available: boolean }[] } | null }

const versionsQuery = 'query($slug:String!){product(slug:$slug){versions{id,inStock,available}}}'

/**
 * A card's buying: the product's one version goes straight to the cart (or checkout); a product with options to
 * choose opens its page instead, as the shopper picks them there.
 */
const useQuickBuy = (product: ProductCard) => {
  const { client } = useStorefront()
  const cart = useCart()
  const [busy, setBusy] = useState<'add' | 'buy' | null>(null)
  const [failed, setFailed] = useState(false)
  const run = async (how: 'add' | 'buy') => {
    if (busy) return
    setBusy(how)
    setFailed(false)
    try {
      const slug = product.href.split('/').filter(Boolean).pop() ?? ''
      const answer = await client.request<Versions>(versionsQuery, { slug })
      const versions = (answer.product?.versions ?? []).filter((v) => v.available)
      const only = versions.length === 1 ? versions[0] : undefined
      if (!only) {
        navigate(product.href)
        return
      }
      const worked = how === 'add' ? await cart.add(only.id, 1) : await cart.buyNow(only.id, 1)
      setFailed(!worked)
    } catch {
      setFailed(true)
    } finally {
      setBusy(null)
    }
  }
  return { busy, failed, add: () => run('add'), buy: () => run('buy') }
}

/** The home catalog card's Add to Cart and Buy Now. */
export const CatalogActions = ({ product }: { product: ProductCard }) => {
  const { t } = useStorefront()
  const quick = useQuickBuy(product)
  const soldOut = !product.stock.inStock
  return (
    <div className="@container relative z-10 px-2.5 pt-2 pb-2.5 sm:px-3 sm:pb-3">
      <div className="grid grid-cols-1 gap-1.5 @[200px]:grid-cols-2">
        <button type="button" aria-label={t('site.card.addLabel', { name: product.name })} aria-busy={quick.busy === 'add'} disabled={soldOut || quick.busy !== null} onClick={quick.add} className={`flex h-8 w-full min-w-0 items-center justify-center gap-1 rounded-md px-1.5 text-[11px] font-bold whitespace-nowrap text-white transition-colors disabled:cursor-not-allowed disabled:opacity-45 sm:h-9 bg-brand hover:bg-brand-dark border-0`}>
          <Cart className="size-3.5 shrink-0" />
          <span className="truncate">{t('site.card.add')}</span>
        </button>
        <button type="button" aria-label={t('site.card.buyLabel', { name: product.name })} aria-busy={quick.busy === 'buy'} disabled={soldOut || quick.busy !== null} onClick={quick.buy} className={`flex h-8 w-full min-w-0 items-center justify-center gap-1 rounded-md px-1.5 text-[11px] font-bold whitespace-nowrap text-white transition-colors disabled:cursor-not-allowed disabled:opacity-45 sm:h-9 bg-charcoal-dark hover:bg-charcoal border-0`}>
          <Zap className="size-3.5 shrink-0" />
          <span className="truncate">{t('site.card.buy')}</span>
        </button>
      </div>
      {quick.failed ? (
        <p role="alert" className="mt-1.5 text-[11px] text-danger mb-0">
          {t('site.card.failed')}
        </p>
      ) : null}
    </div>
  )
}

/** The listing and related card's one button: Add to Cart, or View Details once it's sold out. */
export const GridAction = ({ product }: { product: ProductCard }) => {
  const { t } = useStorefront()
  const quick = useQuickBuy(product)
  return (
    <div className="relative z-10 px-3.5 pt-3 pb-3.5 sm:px-4 sm:pb-4">
      {product.stock.inStock ? (
        <button type="button" aria-label={t('site.card.addLabel', { name: product.name })} aria-busy={quick.busy === 'add'} disabled={quick.busy !== null} onClick={quick.add} className={`flex h-10 w-full items-center justify-center gap-1.5 rounded-full text-[13px] font-bold transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none bg-brand text-white hover:bg-brand-dark disabled:cursor-wait disabled:opacity-80 border-0 p-0`}>
          <Cart className="size-4" />
          {t('site.card.add')}
        </button>
      ) : (
        <Link href={product.href} className={`flex h-10 w-full items-center justify-center gap-1.5 rounded-full text-[13px] font-bold transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none border-2 border-line bg-white text-ink hover:border-brand hover:text-brand no-underline`}>
          {t('site.card.details')}
          <ArrowRight className="size-4" />
        </Link>
      )}
      {quick.failed ? (
        <p role="alert" className="mt-1.5 text-[11px] text-danger mb-0">
          {t('site.card.failed')}
        </p>
      ) : null}
    </div>
  )
}

/** The search grid card's Add to Cart and Buy Now. */
export const SearchActions = ({ product }: { product: ProductCard }) => {
  const { t } = useStorefront()
  const quick = useQuickBuy(product)
  const soldOut = !product.stock.inStock
  return (
    <div className="mt-auto pt-2.5">
      <div className="grid grid-cols-1 gap-2 @[236px]:grid-cols-2">
        <button
          type="button"
          aria-label={t('site.card.addLabel', { name: product.name })}
          aria-busy={quick.busy === 'add'}
          disabled={soldOut || quick.busy !== null}
          onClick={quick.add}
          className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border-0 bg-brand px-2 text-xs font-bold whitespace-nowrap text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Cart className="size-3.5 shrink-0" />
          <span className="truncate">{t('site.card.add')}</span>
        </button>
        <button
          type="button"
          aria-label={t('site.card.buyLabel', { name: product.name })}
          aria-busy={quick.busy === 'buy'}
          disabled={soldOut || quick.busy !== null}
          onClick={quick.buy}
          className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-lg border border-charcoal-dark bg-charcoal-dark px-2 text-xs font-bold whitespace-nowrap text-white transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Zap className="size-3.5 shrink-0" />
          <span className="truncate">{t('site.card.buy')}</span>
        </button>
      </div>
      {quick.failed ? (
        <p role="alert" className="mt-1.5 mb-0 text-[11px] text-danger">
          {t('site.card.failed')}
        </p>
      ) : null}
    </div>
  )
}
