'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Image, Link, Price, SearchField, StoreLogo, navigate, useAccount, useCart, useListing, useMenu, useStorefront, type MenuItem } from '@dripfunnel/storefront-core/theme'
import { ArrowRight, Bag, Cart, ChevronDown, ChevronUp, Close, Heart, MenuIcon, SearchIcon, UserIcon } from '../Icons'
import { pulsesFirst } from '../catalog'
import { WishlistLink } from './Wishlist'
import search from '../../styles/search.module.css'

const slugOf = (href: string) => href.split('/').filter(Boolean).pop() ?? ''

/** The store's logo in the reference's 1.42 frame. */
export const Logo = ({ className }: { className: string }) => (
  <span className="flex items-center">
    <span className={`relative aspect-[1.42] shrink-0 overflow-hidden ${className}`}>
      <StoreLogo className="absolute inset-0 size-full object-contain" />
    </span>
  </span>
)

/** Four of a collection's products and "View all", loaded the first time its panel opens. */
const Previews = ({ item, ready }: { item: MenuItem; ready: boolean }) => {
  const { store, locale, t } = useStorefront()
  const listing = useListing({ collection: slugOf(item.href) }, ready)
  const products = listing.items.slice(0, 4)
  return (
    <div className="flex flex-wrap items-start gap-4">
      {products.map((p) => (
        <Link key={p.id} href={p.href} className="group block w-[120px] shrink-0 overflow-hidden rounded-xl border border-line bg-white transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-brand/30 hover:shadow-md text-inherit no-underline">
          <span className="relative block aspect-square overflow-hidden bg-brand-tint">
            {p.photo ? (
              <Image image={p.photo} alt={p.photo.alt ?? p.name} ratio={1} sizes="120px" className="absolute inset-0 size-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-center text-[10px] text-[#98A2B3]">{t('site.nav.noImage')}</span>
            )}
          </span>
          <span className="block p-2">
            <span className="line-clamp-2 block text-xs leading-snug font-medium text-ink group-hover:text-brand">{p.name}</span>
            {p.price ? <Price money={p.price} compareAt={null} includesTax={store.pricesIncludeTax} locale={locale} t={t} className="mt-0.5 block text-xs font-bold text-brand" /> : null}
          </span>
        </Link>
      ))}
      <Link href={item.href} className="group ml-auto inline-flex shrink-0 items-center gap-1 self-center text-sm font-semibold text-brand transition-colors hover:text-brand-2 no-underline">
        {t('site.nav.viewAll', { name: item.label })}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-[3px]" />
      </Link>
    </div>
  )
}

/** One menu entry: its link, and on hover or focus the panel of its products under the header. */
const MegaItem = ({ item }: { item: MenuItem }) => {
  const [ready, setReady] = useState(false)
  return (
    <li className="group flex" onMouseEnter={() => setReady(true)} onFocus={() => setReady(true)}>
      <Link
        href={item.href}
        className="relative flex items-center gap-1 px-2.5 text-[13px] font-bold whitespace-nowrap text-ink uppercase transition-colors group-focus-within:text-brand group-hover:text-brand after:absolute after:right-2.5 after:bottom-0 after:left-2.5 after:h-[3px] after:scale-x-0 after:rounded-t-full after:bg-promo after:transition-transform group-focus-within:after:scale-x-100 group-hover:after:scale-x-100 xl:px-3.5 xl:text-sm xl:after:right-3.5 xl:after:left-3.5 no-underline"
      >
        {item.label}
        <ChevronDown className="size-3.5 text-ink-muted transition-transform group-focus-within:rotate-180 group-focus-within:text-brand group-hover:rotate-180 group-hover:text-brand" />
      </Link>
      <div
        role="region"
        aria-label={item.label}
        className="pointer-events-none invisible absolute inset-x-0 top-full z-40 -translate-y-1 border-t-4 border-brand bg-white opacity-0 shadow-xl transition-[opacity,transform] group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="mx-auto max-w-[1600px] px-4 py-6 lg:px-6">
          <div className="mb-4">
            <p className="text-lg font-bold text-ink uppercase my-0">{item.label}</p>
          </div>
          <Previews item={item} ready={ready} />
        </div>
      </div>
    </li>
  )
}

/** A menu entry in the drawer: opens to its products and "View all". */
const DrawerItem = ({ item }: { item: MenuItem }) => {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  return (
    <div className="border-b border-line last:border-b-0">
      <h3 className="flex my-0">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => {
            setReady(true)
            setOpen(!open)
          }}
          className="relative flex h-14 flex-1 items-start justify-between rounded-none px-3 py-0 text-left text-sm font-semibold text-ink uppercase transition-colors outline-none hover:bg-brand-tint hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30 bg-transparent border-0"
        >
          {item.label}
          {open ? <ChevronUp className="size-4 shrink-0 text-ink-muted" /> : <ChevronDown className="size-4 shrink-0 text-ink-muted" />}
        </button>
      </h3>
      {open ? (
        <div className="px-3 pb-4">
          <Previews item={item} ready={ready} />
        </div>
      ) : null}
    </div>
  )
}

/** The sticky header: logo, the store's menu with its product panels, search, cart and account; a drawer below lg. */
export const Header = () => {
  const { t } = useStorefront()
  const menu = useMenu()
  const cart = useCart()
  const account = useAccount()
  const [drawer, setDrawer] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const signedIn = account.status === 'ready' && account.account !== null
  const accountHref = signedIn ? '/account/' : '/sign-in/'
  const accountLabel = signedIn ? t('site.nav.account') : t('site.nav.signIn')
  const firstName = signedIn ? (account.account?.name ?? account.account?.email ?? '').trim().split(/\s+/)[0]?.split('@')[0] ?? '' : ''

  useEffect(() => {
    if (drawer) closeButton.current?.focus()
  }, [drawer])

  const escape = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return
    if (drawer) {
      setDrawer(false)
      toggle.current?.focus()
    }
  }
  const find = (words: string) => {
    navigate(`/search/?q=${words.trim()}`)
  }
  const searchBox = (
    <div className="relative w-full">
      <SearchField label={t('site.nav.search')} placeholder={t('site.nav.search')} button={t('site.nav.search')} value="" onSearch={find} suggest={4} className={search.pill} />
      <SearchIcon className="pointer-events-none absolute top-3 right-3 size-4 text-white" />
    </div>
  )

  return (
    <>
      <header onKeyDown={escape} className="sticky top-0 z-50 border-b-[3px] border-brand bg-white text-ink shadow-[0_2px_10px_rgba(44,47,48,0.08)]">
        <div className="relative mx-auto max-w-[1600px] px-4 lg:px-6">
          <div className="flex h-14 items-center gap-2 lg:h-16 lg:gap-4 xl:gap-6">
            <div className="flex shrink-0 items-center gap-2">
              <button ref={toggle} type="button" aria-expanded={drawer} aria-controls="site-drawer" onClick={() => setDrawer(true)} className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-transparent text-sm font-medium whitespace-nowrap text-ink outline-none transition-colors select-none hover:bg-brand-tint hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30 lg:hidden bg-transparent">
                <MenuIcon className="size-5" />
                <span className="sr-only">{t('site.nav.openMenu')}</span>
              </button>
              <Link href="/" className="flex shrink-0 items-center text-inherit no-underline">
                <Logo className="h-9 lg:h-10" />
                <span className="sr-only">{t('site.nav.home')}</span>
              </Link>
            </div>
            <div className="hidden h-full min-w-0 flex-1 justify-center lg:flex">
              <nav className="hidden h-full lg:flex" aria-label={t('site.nav.label')}>
                <ul className="flex h-full items-stretch my-0 list-none pl-0">
                  {pulsesFirst(menu.items).map((item) => (
                    <MegaItem key={item.id} item={item} />
                  ))}
                  <li className="flex items-center pl-2">
                    <Link href="/search/" className="group flex h-8 items-center gap-1 rounded-full bg-brand px-3.5 text-[13px] font-bold whitespace-nowrap text-white transition-colors hover:bg-brand-dark no-underline">
                      {t('site.nav.shopAll')}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
              <div className="hidden lg:block xl:hidden">
                <Link href="/search/" className="flex size-10 items-center justify-center rounded-full no-underline">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark">
                    <SearchIcon className="size-4" />
                  </span>
                  <span className="sr-only">{t('site.nav.search')}</span>
                </Link>
              </div>
              <div className="hidden w-[240px] xl:block">{searchBox}</div>
              <WishlistLink />
              <Link href="/cart/" className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-transparent text-sm font-medium whitespace-nowrap text-ink outline-none transition-colors select-none hover:bg-brand-tint hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30 relative no-underline">
                <Cart className="h-5 w-5" />
                {cart.count > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] leading-none font-bold text-white">{cart.count}</span>
                ) : null}
                <span className="sr-only">{t('site.nav.cart')}</span>
              </Link>
              <Link
                href={accountHref}
                className="inline-flex min-h-9 min-w-9 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md border border-transparent px-1.5 text-ink no-underline outline-none transition-colors select-none hover:bg-brand-tint hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30"
              >
                <UserIcon className="h-5 w-5" />
                {firstName ? <span className="max-w-20 truncate text-[10px] leading-none font-semibold">{firstName}</span> : null}
                <span className="sr-only">{accountLabel}</span>
              </Link>
            </div>
          </div>
          <div className="pb-2.5 lg:hidden">{searchBox}</div>
        </div>
      </header>

      {drawer ? (
        <div className="fixed inset-0 z-[60]" onKeyDown={escape}>
          <div className="absolute inset-0 bg-black/35 backdrop-blur-xs" aria-hidden="true" onClick={() => setDrawer(false)} />
          <div id="site-drawer" role="dialog" aria-modal="true" aria-label={t('site.nav.menu')} className="absolute inset-y-0 left-0 flex h-full w-3/4 flex-col border-r border-line bg-white text-sm shadow-lg sm:max-w-sm">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4">
              <Logo className="h-9" />
              <button ref={closeButton} type="button" onClick={() => setDrawer(false)} className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-transparent text-sm font-medium whitespace-nowrap text-ink outline-none transition-colors select-none hover:bg-brand-tint hover:text-brand focus-visible:ring-3 focus-visible:ring-brand/30 bg-transparent">
                <Close className="size-5" />
                <span className="sr-only">{t('site.nav.closeMenu')}</span>
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">
              <div>
                <p className="mb-1 px-3 text-xs font-semibold tracking-wider text-ink-muted uppercase mt-0">{t('site.nav.account')}</p>
                <Link href={accountHref} className="flex h-14 items-center gap-3 rounded-md px-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-tint hover:text-brand no-underline">
                  <UserIcon className="size-5" />
                  {accountLabel}
                </Link>
                <Link href="/account/wishlist/" className="flex h-14 items-center gap-3 rounded-md px-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-tint hover:text-brand no-underline">
                  <Heart className="size-5" />
                  {t('site.nav.wishlist')}
                </Link>
              </div>
              <div>
                <p className="mb-1 px-3 text-xs font-semibold tracking-wider text-ink-muted uppercase mt-0">{t('site.nav.mainMenu')}</p>
                <nav className="flex flex-col" aria-label={t('site.nav.mainMenu')}>
                  <Link href="/search/" className="flex h-14 items-center gap-3 rounded-md px-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-tint hover:text-brand no-underline">
                    <Bag className="size-5" />
                    {t('site.nav.shopAll')}
                  </Link>
                  <div className="flex w-full flex-col">
                    {pulsesFirst(menu.items).map((item) => (
                      <DrawerItem key={item.id} item={item} />
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </>
  )
}
