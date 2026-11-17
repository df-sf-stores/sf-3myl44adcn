import { Image, Link, Price, useStorefront, type ProductCard as Card } from '@dripfunnel/storefront-core/theme'
import { CatalogActions, GridAction, SearchActions } from './interactive/CardActions'
import { WishlistHeart } from './interactive/Wishlist'
import { ImageOff } from './Icons'
import styles from '../styles/card.module.css'

/** In Stock / Out of Stock with its dot. */
const StockMark = ({ inStock, large = false }: { inStock: boolean; large?: boolean }) => {
  const { t } = useStorefront()
  const size = large ? 'text-[10px] sm:text-[11px]' : 'text-[9px] sm:text-[10px]'
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 font-semibold ${size} ${inStock ? (large ? 'text-brand-dark' : 'text-brand') : 'text-ink-muted'}`}>
      <span className={`size-1.5 rounded-full ${inStock ? 'bg-brand' : 'bg-ink-muted'}`} aria-hidden="true" />
      {inStock ? t('site.card.inStock') : t('site.card.outOfStock')}
    </span>
  )
}

/** The home page's catalog card: category tag on the picture, Add to Cart and Buy Now. */
export const CatalogCard = ({ product, category }: { product: Card; category: string | null }) => {
  const { store, locale, t } = useStorefront()
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border-2 border-brand/25 bg-white shadow-[0_4px_14px_-10px_rgba(51,51,51,0.3)] transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_14px_26px_-16px_rgba(241,90,36,0.45)]">
      <div className="flex flex-1 flex-col">
        <div className="relative block aspect-[5/4] overflow-hidden bg-white">
          {category ? (
            <span className="absolute top-2 left-2 z-10 max-w-[calc(100%-16px)] truncate rounded bg-charcoal px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white uppercase sm:text-[10px]">{category}</span>
          ) : null}
          {product.photo ? (
            <Image
              image={product.photo}
              alt={product.photo.alt ?? product.name}
              ratio={1.25}
              sizes="(min-width: 1536px) 18vw, (min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
              className="absolute inset-0 size-full object-contain p-3 pt-7 transition-transform group-hover:scale-[1.04] sm:p-4 sm:pt-8"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm text-ink-muted">{t('site.card.noImage')}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col border-t border-line px-2.5 pt-2 sm:px-3">
          <div className="flex items-start gap-1">
            <h3 className="my-0 line-clamp-2 min-h-[2lh] min-w-0 flex-1 text-xs leading-snug font-bold text-ink transition-colors group-hover:text-brand sm:text-[13px]">
              <Link href={product.href} className="text-inherit no-underline after:absolute after:inset-0 after:content-['']">
                {product.name}
              </Link>
            </h3>
            <WishlistHeart productId={product.id} name={product.name} className="-mt-1 -mr-1" />
          </div>
          <div className="mt-1 flex items-center justify-between gap-1.5">
            {product.price ? <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.catalogPrice} /> : <span />}
            <StockMark inStock={product.stock.inStock} />
          </div>
        </div>
      </div>
      <CatalogActions product={product} />
    </div>
  )
}

/** The listing and related-products card: category line under the picture and one button. */
export const GridCard = ({ product, category }: { product: Card; category: string | null }) => {
  const { store, locale, t } = useStorefront()
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_18px_36px_-22px_rgba(44,47,48,0.45)] motion-reduce:hover:translate-y-0">
      <div className="flex flex-1 flex-col">
        <div className="relative block aspect-square overflow-hidden bg-white">
          {product.photo ? (
            <Image
              image={product.photo}
              alt={product.photo.alt ?? product.name}
              ratio={1}
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 32vw, 48vw"
              className="absolute inset-0 size-full object-contain p-5 transition-transform group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm text-ink-muted">{t('site.card.noImage')}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col border-t border-line px-3.5 pt-3 sm:px-4">
          {category ? <span className="truncate text-[10px] font-bold tracking-[0.12em] text-brand uppercase sm:text-[11px]">{category}</span> : null}
          <div className="mt-1 flex items-start gap-1.5">
            <h3 className="my-0 line-clamp-2 min-h-[2lh] min-w-0 flex-1 text-sm leading-snug font-bold text-ink transition-colors group-hover:text-brand">
              <Link href={product.href} className="text-inherit no-underline after:absolute after:inset-0 after:content-['']">
                {product.name}
              </Link>
            </h3>
            <WishlistHeart productId={product.id} name={product.name} className="-mt-1 -mr-1" />
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            {product.price ? <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.gridPrice} /> : <span />}
            <StockMark inStock={product.stock.inStock} large />
          </div>
        </div>
      </div>
      <GridAction product={product} />
    </article>
  )
}

/** A card's shape while its products load, so nothing moves when they arrive. */
export const CardSkeleton = ({ square = false }: { square?: boolean }) => (
  <div className="flex h-full flex-col overflow-hidden rounded-xl border-2 border-line bg-white">
    <span className={`block animate-pulse bg-muted ${square ? 'aspect-square' : 'aspect-[5/4]'}`} />
    <span className="flex flex-col gap-2 border-t border-line p-3">
      <span className="block h-3 w-3/4 animate-pulse rounded bg-muted" />
      <span className="block h-3 w-1/3 animate-pulse rounded bg-muted" />
      <span className="mt-1 block h-8 w-full animate-pulse rounded-md bg-muted" />
    </span>
  </div>
)

/** The collection and search grid's card: picture, name and price. */
export const ListingCard = ({ product }: { product: Card }) => {
  const { store, locale, t } = useStorefront()
  return (
    <article className="group relative block overflow-hidden rounded-2xl border border-line bg-white transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-brand-tint">
        {product.photo ? (
          <Image
            image={product.photo}
            alt={product.photo.alt ?? product.name}
            ratio={1}
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 24vw, 46vw"
            className="absolute inset-0 size-full object-contain p-4 transition-transform group-hover:scale-[1.03]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-ink-muted">{t('site.card.noImage')}</span>
        )}
      </div>
      <div className="space-y-1 p-3">
        <div className="flex items-start gap-1.5">
          <h3 className="my-0 line-clamp-2 min-w-0 flex-1 text-[14px] leading-snug font-semibold text-ink transition-colors group-hover:text-brand">
            <Link href={product.href} className="text-inherit no-underline after:absolute after:inset-0 after:content-['']">
              {product.name}
            </Link>
          </h3>
          <WishlistHeart productId={product.id} name={product.name} className="-mt-1 -mr-1" />
        </div>
        {product.price ? <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.listingPrice} /> : null}
      </div>
    </article>
  )
}

/** The search grid's card: category line, name, price and stock, Add to Cart and Buy Now. */
export const SearchCard = ({ product, category }: { product: Card; category: string | null }) => {
  const { store, locale, t } = useStorefront()
  return (
    <article className="group @container flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-[transform,border-color,box-shadow] hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_14px_28px_-18px_rgba(41,41,41,0.4)]">
      <Link href={product.href} className="relative block aspect-[5/4] w-full shrink-0 overflow-hidden border-b border-line bg-white text-inherit no-underline">
        {product.photo ? (
          <Image image={product.photo} alt={product.photo.alt ?? product.name} ratio={1.25} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw" className="absolute inset-0 size-full object-contain p-3" />
        ) : (
          <span className="flex size-full flex-col items-center justify-center gap-2 bg-cream-light text-ink-muted">
            <ImageOff className="size-7 text-ink-muted/50" />
            <span className="px-2 text-center text-[11px] font-medium">{t('site.card.noImageAvailable')}</span>
          </span>
        )}
        <span className="sr-only">{product.name}</span>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-3.5">
        {category ? <p className="my-0 truncate text-[11px] font-bold tracking-[0.08em] text-brand uppercase">{category}</p> : null}
        <div className="flex items-start gap-1.5">
          <h3 className="my-0 line-clamp-2 min-h-[2lh] min-w-0 flex-1 text-sm leading-snug font-semibold text-ink">
            <Link href={product.href} className="text-inherit no-underline transition-colors hover:text-brand">
              {product.name}
            </Link>
          </h3>
          <WishlistHeart productId={product.id} name={product.name} className="-mt-1 -mr-1" />
        </div>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          {product.price ? <Price money={product.price} compareAt={product.compareAt} includesTax={store.pricesIncludeTax} locale={locale} t={t} className={styles.searchPrice} /> : <span />}
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${product.stock.inStock ? 'text-brand-dark' : 'text-ink-muted'}`}>
            <span className={`size-2 rounded-full ${product.stock.inStock ? 'bg-brand' : 'bg-[#BDBDBD]'}`} aria-hidden="true" />
            {product.stock.inStock ? t('site.card.inStock') : t('site.card.outOfStock')}
          </span>
        </div>
        <SearchActions product={product} />
      </div>
    </article>
  )
}
