import { useCollections, useListing, type CollectionCard, type ProductCard } from '@dripfunnel/storefront-core/theme'

const slugOf = (href: string) => href.split('/').filter(Boolean).pop() ?? ''

/**
 * Which collection each product is in, for the cards' category tag: the store's first six collections, each listed
 * once (hooks run in a fixed number, so six slots, the empty ones asking nothing).
 */
export const useCategoryNames = () => {
  const { collections, status } = useCollections({ first: 6 })
  const at = (i: number): CollectionCard | null => collections[i] ?? null
  const slug = (i: number) => {
    const c = at(i)
    return c ? slugOf(c.href) : null
  }
  const lists = [
    useListing({ collection: slug(0) }, slug(0) !== null),
    useListing({ collection: slug(1) }, slug(1) !== null),
    useListing({ collection: slug(2) }, slug(2) !== null),
    useListing({ collection: slug(3) }, slug(3) !== null),
    useListing({ collection: slug(4) }, slug(4) !== null),
    useListing({ collection: slug(5) }, slug(5) !== null),
  ]
  const names = new Map<string, string>()
  lists.forEach((list, i) => {
    const c = at(i)
    if (!c || list.status !== 'ready') return
    for (const p of list.items) if (!names.has(p.id)) names.set(p.id, c.name)
  })
  return { collections, status, nameOf: (product: ProductCard) => names.get(product.id) ?? null, nameById: (id: string) => names.get(id) ?? null }
}

/** Products with a picture first, in the store's order, so a row of cards leads with the ones that show. */
export const picturedFirst = (products: readonly ProductCard[]) => [...products.filter((p) => p.photo), ...products.filter((p) => !p.photo)]

/** The store's menu with Pulses moved to the front; every other item keeps the order set in Storefront › Menu. */
export const pulsesFirst = <T extends { href: string }>(items: readonly T[]) => [...items.filter((i) => slugOf(i.href) === 'pulses'), ...items.filter((i) => slugOf(i.href) !== 'pulses')]
