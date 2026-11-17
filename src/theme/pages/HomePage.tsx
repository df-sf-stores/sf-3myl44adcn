import type { ReactNode } from 'react'
import { Image, Link, ThemeImage, useListing, useStorefront, type CollectionCard, type ProductCard } from '@dripfunnel/storefront-core/theme'
import { Layout } from '../components/Layout'
import { CardSkeleton, CatalogCard } from '../components/ProductCard'
import { Carousel } from '../components/interactive/Carousel'
import { Logo } from '../components/interactive/Header'
import { picturedFirst, useCategoryNames } from '../components/catalog'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BadgePercent,
  Building,
  Handshake,
  House,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  StoreIcon,
  Swoosh,
  Truck,
  Underline,
  Users,
} from '../components/Icons'
import base from '../styles/base.module.css'

const Hero = ({ products, collections }: { products: ProductCard[]; collections: CollectionCard[] }) => {
  const { store, t } = useStorefront()
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute inset-y-0 right-0 w-full bg-[radial-gradient(closest-side,#FFE3CF,transparent)] lg:w-[60%]" />
        <span className="absolute inset-0 bg-[radial-gradient(rgba(244,81,30,0.12)_1px,transparent_1.3px)] [background-size:22px_22px]" />
        <span className="absolute -top-24 -left-24 size-72 rounded-full bg-brand/10" />
      </div>
      <div className={`mx-auto max-w-[1600px] px-4 lg:px-6 relative grid items-center gap-4 pt-6 pb-4 sm:pt-7 lg:min-h-[400px] lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:pt-6 lg:pb-2 xl:min-h-[440px] xl:grid-cols-[1.12fr_1fr]`}>
        <div className="relative z-10 text-center lg:text-left">
          <p className="inline-flex max-w-full items-center gap-2 text-[10px] font-extrabold tracking-[0.14em] text-balance text-charcoal uppercase sm:text-xs sm:tracking-[0.22em] sm:whitespace-nowrap my-0">
            <span className="hidden h-0.5 w-6 bg-brand sm:block" aria-hidden="true" />
            <span className="size-1.5 rotate-45 bg-brand" aria-hidden="true" />
            <span className="min-w-0 italic">{t('site.hero.statement')}</span>
            <span className="size-1.5 rotate-45 bg-brand" aria-hidden="true" />
            <span className="hidden h-0.5 w-6 bg-brand sm:block" aria-hidden="true" />
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 sm:gap-5 lg:justify-start">
            <Logo className="h-14 drop-shadow-[0_6px_10px_rgba(37,37,37,0.18)] sm:h-20 xl:h-24" />
            <h1 className="min-w-0 text-left my-0">
              <span className="block text-[min(7.6vw,52px)] leading-[0.9] font-black tracking-[-0.03em] uppercase md:text-[min(8vw,64px)] lg:text-[min(calc(6.6vw-24px),84px)]">
                <span className="text-ink">{t('site.hero.brandLead')}</span>
                <span className="text-brand">{t('site.hero.brandHighlight')}</span>
              </span>
              <span className="mt-1.5 flex items-center gap-2 text-[11px] font-black tracking-[0.3em] whitespace-nowrap text-ink uppercase sm:mt-2 sm:text-base sm:tracking-[0.42em] xl:text-lg">{t('site.hero.legal')}</span>
            </h1>
          </div>
          {store.tagline ? (
            <div className="relative mx-auto mt-5 w-fit max-w-full lg:mx-0">
              <span className="absolute inset-x-3 -bottom-1.5 h-full bg-charcoal-dark [clip-path:polygon(0_0,100%_0,calc(100%-12px)_50%,100%_100%,0_100%,12px_50%)]" aria-hidden="true" />
              <p className="relative bg-brand px-6 py-2 text-[15px] font-black tracking-[0.05em] whitespace-nowrap text-white uppercase [clip-path:polygon(0_0,100%_0,calc(100%-16px)_50%,100%_100%,0_100%,16px_50%)] sm:px-12 sm:py-2.5 sm:text-2xl xl:text-[28px] my-0">
                {store.tagline}
              </p>
            </div>
          ) : null}
          <p className="mt-5 text-[26px] leading-[1.2] font-black text-ink sm:text-[34px] xl:text-[40px] mb-0">
            {t('site.hero.taglineLead')}{' '}
            <span className="relative inline-block text-brand">
              {t('site.hero.taglineHighlight')}
              <Underline className="absolute -bottom-1.5 left-0 h-2.5 w-full text-charcoal-dark" />
            </span>
          </p>
        </div>
        <div className="relative mx-auto h-[270px] w-full max-w-[560px] sm:h-[340px] lg:h-[380px] lg:max-w-none xl:h-[410px]" role="group" aria-label={t('site.hero.products')}>
          <span className="absolute inset-x-[4%] top-[4%] bottom-[18%] overflow-hidden opacity-30 [mask-image:radial-gradient(closest-side,black_45%,transparent)]" aria-hidden="true">
            <ThemeImage src="pulses.png" alt="" ratio={1.5} sizes="560px" className="absolute inset-0 size-full origin-[50%_66%] scale-[1.8] object-cover" />
          </span>
          <Leaf className="absolute top-[8%] left-[6%] w-9 -rotate-12 text-brand/35" />
          <Leaf className="absolute right-[10%] bottom-[30%] w-7 rotate-[70deg] text-charcoal/20" />
          <Swoosh className="absolute inset-x-0 bottom-0 h-[26%] w-full" />
          {products.slice(0, 5).map((p, i) =>
            p.photo ? (
              <Link
                key={p.id}
                href={p.href}
                className={`group absolute aspect-[3/4] overflow-hidden rounded-md shadow-[0_18px_28px_-12px_rgba(37,37,37,0.6)] ring-2 ring-white transition-transform hover:z-40 hover:-translate-y-2 ${i === 0 ? 'left-1/2 bottom-[7%] z-30 block w-[44%] -translate-x-1/2 sm:w-[33%]' : i === 1 ? 'left-[4%] bottom-[15%] z-20 block w-[34%] -rotate-[7deg] sm:left-[15%] sm:w-[26%]' : i === 2 ? 'right-[4%] bottom-[15%] z-20 block w-[34%] rotate-[7deg] sm:right-[15%] sm:w-[26%]' : i === 3 ? 'left-0 bottom-[25%] z-10 hidden w-[21%] -rotate-[13deg] sm:block' : 'right-0 bottom-[25%] z-10 hidden w-[21%] rotate-[13deg] sm:block'} text-inherit no-underline`}
              >
                <Image
                  image={p.photo}
                  alt={p.photo.alt ?? p.name}
                  ratio={0.75}
                  sizes="(min-width: 1024px) 15vw, 40vw"
                  className="absolute inset-0 size-full object-cover object-[50%_58%]"
                />
              </Link>
            ) : null,
          )}
          <div className="absolute top-0 right-0 z-40 flex size-[92px] items-center justify-center rounded-full bg-charcoal-dark p-1.5 shadow-[0_12px_24px_-12px_rgba(37,37,37,0.7)] sm:size-[118px] xl:size-[132px]">
            <span className="flex size-full items-center justify-center rounded-full border-2 border-dashed border-brand/70 bg-brand px-2 text-center text-[9px] leading-tight font-black text-white uppercase hyphens-manual sm:px-3 sm:text-[11px] xl:text-[12px]">
              {t('site.hero.badge')}
            </span>
          </div>
        </div>
      </div>
      <div className="relative bg-charcoal-dark text-white">
        <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden="true" />
        <div className={`mx-auto max-w-[1600px] px-4 lg:px-6 flex flex-col items-center gap-2 py-3 lg:flex-row lg:justify-between lg:gap-6`}>
          <p className="text-sm font-black tracking-wide text-brand-2 uppercase italic sm:text-base my-0">{t('site.hero.closing')}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 my-0 list-none pl-0">
            {collections.map((c, i) => (
              <li key={c.id} className="flex items-center">
                {i > 0 ? <span className="mr-1 size-1 rounded-full bg-brand" aria-hidden="true" /> : null}
                <Link href={c.href} className="rounded px-1.5 py-0.5 text-[11px] font-extrabold tracking-wide uppercase transition-colors hover:text-brand-2 sm:text-xs text-inherit no-underline">
                  {c.name}
                </Link>
              </li>
            ))}
            <li className="ml-2 flex items-center">
              <Link href="/search/" className="group inline-flex items-center gap-1 rounded bg-brand px-2.5 py-1 text-[11px] font-extrabold tracking-wide uppercase transition-colors hover:bg-brand-dark sm:text-xs text-inherit no-underline">
                {t('site.hero.shopAll')}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/** A collection's own picture, or the theme's copy of the reference's when the store has none. */
const CollectionPicture = ({ collection }: { collection: CollectionCard }) => {
  const sizes = '(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 84vw'
  if (collection.image) return <Image image={collection.image} alt={collection.name} ratio={1.5} sizes={sizes} className="absolute inset-0 size-full object-cover" />
  const slug = collection.href.split('/').filter(Boolean).pop()
  if (slug === 'grocery-essentials') return <ThemeImage src="grocery.png" alt={collection.name} ratio={1.5} sizes={sizes} className="absolute inset-0 size-full object-cover" />
  if (slug === 'pulses') return <ThemeImage src="pulses.png" alt={collection.name} ratio={1.5} sizes={sizes} className="absolute inset-0 size-full object-cover" />
  if (slug === 'whole-spices') return <ThemeImage src="whole-spices.png" alt={collection.name} ratio={1.5} sizes={sizes} className="absolute inset-0 size-full object-cover" />
  if (slug === 'dry-foods') return <ThemeImage src="dry-foods.png" alt={collection.name} ratio={1.5} sizes={sizes} className="absolute inset-0 size-full object-cover" />
  return null
}

const Categories = ({ collections, busy }: { collections: CollectionCard[]; busy: boolean }) => {
  const { t } = useStorefront()
  return (
    <section className="scroll-mt-28 bg-white pt-5 pb-3 sm:pt-6">
      <h2 className="sr-only my-0">{t('site.home.categories')}</h2>
      <div className="mx-auto max-w-[1600px] px-4 lg:px-6">
        <ul className="my-0 grid list-none grid-cols-1 gap-3 pl-0 sm:grid-cols-2 lg:gap-4 xl:grid-cols-4" aria-busy={busy}>
          {busy
            ? [0, 1, 2, 3].map((i) => (
                <li key={i}>
                  <span className="block aspect-[3/2] animate-pulse rounded-xl bg-cream ring-1 ring-charcoal/10" />
                </li>
              ))
            : collections.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    className="group relative block aspect-[3/2] overflow-hidden rounded-xl bg-cream shadow-[0_4px_14px_-8px_rgba(37,37,37,0.35)] ring-1 ring-charcoal/10 transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_22px_-12px_rgba(244,81,30,0.5)] hover:ring-brand/50 text-inherit no-underline"
                  >
                    <span className="relative block size-full">
                      <CollectionPicture collection={c} />
                    </span>
                    <span className="sr-only">{c.name}</span>
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </section>
  )
}

const ValueItem = ({ icon, title, text }: { icon: ReactNode; title: string; text: string }) => (
  <li className="flex items-center gap-3 rounded-xl border border-charcoal/10 bg-cream-light px-3 py-2.5 shadow-[0_3px_10px_-6px_rgba(37,37,37,0.3)] transition-colors hover:border-brand/40 sm:px-3.5 sm:py-3">
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white ring-[3px] ring-brand-tint">{icon}</span>
    <span className="min-w-0">
      <span className="block text-[13px] leading-tight font-black tracking-wide text-ink uppercase xl:text-sm">{title}</span>
      <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{text}</span>
    </span>
  </li>
)

const Values = () => {
  const { t } = useStorefront()
  return (
    <section className="bg-white pt-3 pb-6 sm:pb-8">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-6">
        <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-4 my-0 list-none pl-0">
          <ValueItem icon={<Award className="size-5" />} title={t('site.home.values.quality')} text={t('site.home.values.qualityText')} />
          <ValueItem icon={<BadgePercent className="size-5" />} title={t('site.home.values.prices')} text={t('site.home.values.pricesText')} />
          <ValueItem icon={<Truck className="size-5" />} title={t('site.home.values.supply')} text={t('site.home.values.supplyText')} />
          <ValueItem icon={<Handshake className="size-5" />} title={t('site.home.values.partnership')} text={t('site.home.values.partnershipText')} />
        </ul>
      </div>
    </section>
  )
}

const Showcase = ({ products, busy, nameOf }: { products: ProductCard[]; busy: boolean; nameOf: (p: ProductCard) => string | null }) => {
  const { t } = useStorefront()
  return (
    <section className="bg-white py-7 md:py-9">
      <div className={`mx-auto max-w-[1600px] px-4 lg:px-6 ${base.reveal} grid gap-4 lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] xl:gap-5`}>
        <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-charcoal p-5 text-white sm:p-6">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-brand" aria-hidden="true" />
          <span className="pointer-events-none absolute -right-14 -bottom-14 size-44 rounded-full border-[18px] border-brand/25" aria-hidden="true" />
          <span className="flex size-11 items-center justify-center rounded-full bg-brand text-white">
            <PackageCheck className="size-5" />
          </span>
          <span className="mt-4 text-[11px] font-bold tracking-[0.16em] text-brand-2 uppercase">{t('site.home.showcase.eyebrow')}</span>
          <h2 className="mt-1 text-[26px] leading-[1.08] font-black tracking-[-0.045em] uppercase xl:text-[30px] mb-0">
            {t('site.home.showcase.titleLead')}
            <span className="block text-brand">{t('site.home.showcase.titleHighlight')}</span>
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-white/75 mb-0">{t('site.home.showcase.subtitle')}</p>
          <Link href="/search/" className="group relative mt-5 inline-flex h-10 w-fit items-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-bold text-white transition-colors hover:bg-brand-dark no-underline">
            {t('site.home.showcase.cta')}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="min-w-0">
          {busy ? (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4 2xl:grid-cols-5" aria-busy="true" aria-label={t('shop.listing.loading')}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={i >= 2 ? (i >= 4 ? 'hidden 2xl:block' : i >= 3 ? 'hidden lg:block' : 'hidden sm:block') : ''}>
                  <CardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <Carousel label={t('site.home.showcase.label')} slides={products.map((p) => ({ key: p.id, content: <CatalogCard product={p} category={nameOf(p)} /> }))} />
          )}
        </div>
      </div>
    </section>
  )
}


const Distribution = () => {
  const { t } = useStorefront()
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute inset-x-0 top-0 h-1 bg-brand" />
        <span className="absolute inset-x-0 bottom-0 h-px bg-brand/30" />
        <span className="absolute -top-20 -left-24 size-64 rounded-full bg-brand/10" />
        <span className="absolute -right-20 -bottom-24 size-64 rounded-full bg-brand/10" />
        <span className="absolute inset-0 bg-[radial-gradient(rgba(244,81,30,0.1)_1px,transparent_1.3px)] [background-size:22px_22px]" />
      </div>
      <div className={`mx-auto max-w-[1600px] px-4 lg:px-6 ${base.reveal} relative grid grid-cols-2 items-center gap-x-4 gap-y-3 py-5 sm:py-6 lg:grid-cols-[17%_1fr_17%] lg:gap-x-5 lg:py-7`}>
        <div className="relative order-1 pl-1 lg:pl-0">
          <Leaf className="absolute -top-2 left-[58%] w-6 rotate-[25deg] text-leaf sm:w-7 lg:-top-5 lg:right-2 lg:left-auto" />
          <Leaf className="absolute top-3 left-[70%] w-4 rotate-[80deg] text-leaf/60 sm:w-5 lg:-top-1 lg:right-[-2px] lg:left-auto" />
          <p className={`${base.script} text-[22px] leading-[1.08] sm:text-[28px] lg:text-[30px] xl:text-[38px] my-0`}>
            <span className="block text-charcoal">{t('site.home.distribution.leftLead')}</span>
            <span className="block text-brand">{t('site.home.distribution.leftHighlight')}</span>
          </p>
          <span className="mt-2 flex items-center gap-1.5" aria-hidden="true">
            <span className="h-0.5 w-10 rounded-full bg-brand sm:w-14" />
            <span className="size-1.5 rotate-45 bg-brand" />
            <span className="h-0.5 w-4 rounded-full bg-charcoal/40" />
          </span>
        </div>
        <div className="relative order-2 pr-1 text-right lg:order-3 lg:pr-0 lg:text-left">
          <Leaf className="absolute -top-5 right-3 hidden w-6 -rotate-[35deg] text-leaf/80 lg:block" />
          <p className={`${base.script} text-[22px] leading-[1.08] sm:text-[28px] lg:text-[30px] xl:text-[38px] my-0`}>
            <span className="block text-charcoal">{t('site.home.distribution.rightLead')}</span>
            <span className="relative inline-block text-brand">
              {t('site.home.distribution.rightHighlight')}
              <Underline tall className="absolute -bottom-2 left-0 h-2.5 w-full text-brand" />
            </span>
          </p>
        </div>
        <div
          className="relative order-3 col-span-2 min-w-0 overflow-hidden bg-cream pb-[18px] [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] sm:pb-[22px] lg:order-2 lg:col-span-1 lg:pb-[26px]"
          role="group"
          aria-label={t('site.home.distribution.label')}
        >
          <Swoosh thin className="absolute inset-x-[2%] bottom-0 h-[20px] w-[96%] sm:h-[24px] lg:h-[28px]" />
          <ul className="flex items-end justify-center my-0 list-none pl-0">
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 block">
              <Link href={`/search/?q=${t('site.home.distribution.mozzarella')}`} className="group block text-inherit no-underline">
                <ThemeImage src="distribute-01.png" alt="" ratio={458 / 478} sizes="140px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[86px] sm:h-[118px] lg:h-[112px] xl:h-[132px]" />
                <span className="sr-only">{t('site.home.distribution.mozzarella')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 block">
              <Link href="/products/amu-gold-1l/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-02.png" alt="" ratio={500 / 674} sizes="100px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[72px] sm:h-[98px] lg:h-[94px] xl:h-[110px]" />
                <span className="sr-only">{t('site.home.distribution.gold')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 block">
              <Link href={`/search/?q=${t('site.home.distribution.delicious')}`} className="group block text-inherit no-underline">
                <ThemeImage src="distribute-03.png" alt="" ratio={482 / 408} sizes="150px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[80px] sm:h-[108px] lg:h-[104px] xl:h-[122px]" />
                <span className="sr-only">{t('site.home.distribution.delicious')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 block">
              <Link href="/products/amu-creamer-24x120x3g/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-04.png" alt="" ratio={448 / 368} sizes="170px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[86px] sm:h-[118px] lg:h-[112px] xl:h-[132px]" />
                <span className="sr-only">{t('site.home.distribution.creamer')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 block">
              <Link href="/products/amu-fresh-cream-1l/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-05.png" alt="" ratio={350 / 492} sizes="80px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[72px] sm:h-[98px] lg:h-[94px] xl:h-[110px]" />
                <span className="sr-only">{t('site.home.distribution.cream')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 block">
              <Link href="/products/amul-processed-cheese-block-1kg/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-06.png" alt="" ratio={476 / 464} sizes="130px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[80px] sm:h-[108px] lg:h-[104px] xl:h-[122px]" />
                <span className="sr-only">{t('site.home.distribution.cheese')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 hidden sm:block">
              <Link href={`/search/?q=${t('site.home.distribution.lite')}`} className="group block text-inherit no-underline">
                <ThemeImage src="distribute-07.png" alt="" ratio={474 / 410} sizes="160px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[86px] sm:h-[118px] lg:h-[112px] xl:h-[132px]" />
                <span className="sr-only">{t('site.home.distribution.lite')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 hidden sm:block lg:hidden xl:block">
              <Link href={`/search/?q=${t('site.home.distribution.chiplet')}`} className="group block text-inherit no-underline">
                <ThemeImage src="distribute-08.png" alt="" ratio={316 / 474} sizes="80px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[72px] sm:h-[98px] lg:h-[94px] xl:h-[110px]" />
                <span className="sr-only">{t('site.home.distribution.chiplet')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 hidden sm:block lg:hidden xl:block">
              <Link href="/products/amul-butter-30x500gm/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-09.png" alt="" ratio={476 / 486} sizes="120px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[80px] sm:h-[108px] lg:h-[104px] xl:h-[122px]" />
                <span className="sr-only">{t('site.home.distribution.butter')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 hidden xl:block">
              <Link href="/products/amul-moti-long-life-milk-450ml/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-10.webp" alt="" ratio={1} sizes="140px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[86px] sm:h-[118px] lg:h-[112px] xl:h-[132px]" />
                <span className="sr-only">{t('site.home.distribution.calci')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 hidden 2xl:block">
              <Link href="/products/amul-lactose-free-milk-250ml/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-11.jpg" alt="" ratio={346 / 350} sizes="110px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[72px] sm:h-[98px] lg:h-[94px] xl:h-[110px]" />
                <span className="sr-only">{t('site.home.distribution.lactose')}</span>
              </Link>
            </li>
            <li className="-mx-1.5 shrink-0 sm:-mx-2.5 lg:-mx-3 hidden 2xl:block">
              <Link href="/products/amul-moti-long-life-milk-450ml-1/" className="group block text-inherit no-underline">
                <ThemeImage src="distribute-12.webp" alt="" ratio={1} sizes="130px" className="w-auto max-w-none object-contain mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent),linear-gradient(transparent,black_10%)] [mask-composite:intersect] transition-transform group-hover:-translate-y-1.5 h-[80px] sm:h-[108px] lg:h-[104px] xl:h-[122px]" />
                <span className="sr-only">{t('site.home.distribution.moti')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

const Segment = ({ icon, title, text }: { icon: ReactNode; title: string; text: string }) => (
  <li className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl border border-line bg-white p-4 shadow-[0_4px_14px_-10px_rgba(51,51,51,0.3)] transition-colors hover:border-brand/50 sm:p-5">
    <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.35] bg-brand transition-transform group-hover:scale-x-100" aria-hidden="true" />
    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand ring-1 ring-brand/25 transition-colors group-hover:bg-brand group-hover:text-white sm:size-14">{icon}</span>
    <span className="min-w-0">
      <span className="block text-[13px] leading-tight font-extrabold tracking-wide text-ink uppercase sm:text-sm">{title}</span>
      <span className="mt-1 block text-xs leading-snug text-ink-muted sm:text-[13px]">{text}</span>
    </span>
  </li>
)

const Segments = () => {
  const { t } = useStorefront()
  return (
    <section className="bg-white py-7 md:py-9">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-6">
        <div className="mb-4 md:mb-5">
          <span className="mb-1 block text-[11px] font-bold tracking-[0.14em] text-promo uppercase">{t('site.home.segments.eyebrow')}</span>
          <div className="flex items-center gap-3">
            <span className="h-6 w-1.5 shrink-0 rounded-full bg-promo sm:h-7" aria-hidden="true" />
            <h2 className="text-lg leading-tight font-black tracking-tight text-ink uppercase sm:text-xl md:text-2xl my-0">{t('site.home.segments.title')}</h2>
            <span className="hidden h-0.5 flex-1 bg-brand/20 sm:block" aria-hidden="true" />
          </div>
        </div>
        <ul className={`${base.reveal} grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-4 my-0 list-none pl-0`}>
          <Segment icon={<House className="size-6" />} title={t('site.home.segments.homes')} text={t('site.home.segments.homesText')} />
          <Segment icon={<StoreIcon className="size-6" />} title={t('site.home.segments.retail')} text={t('site.home.segments.retailText')} />
          <Segment icon={<Building className="size-6" />} title={t('site.home.segments.business')} text={t('site.home.segments.businessText')} />
          <Segment icon={<Users className="size-6" />} title={t('site.home.segments.community')} text={t('site.home.segments.communityText')} />
        </ul>
      </div>
    </section>
  )
}

const Indicator = ({ icon, title, text }: { icon: ReactNode; title: string; text: string }) => (
  <li className="flex flex-col justify-center gap-2.5 rounded-2xl border border-brand/20 bg-white p-4 shadow-[0_4px_14px_-10px_rgba(51,51,51,0.3)] sm:p-5">
    <span className="flex size-11 items-center justify-center rounded-full bg-brand text-white ring-4 ring-brand-tint">{icon}</span>
    <span>
      <span className="block text-[13px] font-extrabold tracking-wide text-ink uppercase sm:text-sm">{title}</span>
      <span className="mt-0.5 block text-xs text-ink-muted sm:text-[13px]">{text}</span>
    </span>
  </li>
)

const Supplier = () => {
  const { store, t } = useStorefront()
  return (
    <section className="bg-cream py-7 md:py-9">
      <div className={`mx-auto max-w-[1600px] px-4 lg:px-6 ${base.reveal} grid gap-3 sm:gap-4 lg:grid-cols-[1.35fr_1fr]`}>
        <div className="relative overflow-hidden rounded-2xl bg-charcoal p-5 text-white sm:p-7 lg:p-8">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-brand" aria-hidden="true" />
          <span className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full border-[26px] border-brand/20" aria-hidden="true" />
          <div className="relative">
            <span className="inline-flex rounded-lg bg-white px-2.5 py-1.5">
              <Logo className="h-9 sm:h-10" />
            </span>
            <span className="mt-4 block text-[11px] font-bold tracking-[0.16em] text-brand-2 uppercase sm:text-xs">{t('site.home.supplier.eyebrow')}</span>
            <h2 className="mt-1.5 max-w-[640px] text-[22px] leading-tight font-black tracking-tight text-balance sm:text-[28px] lg:text-[32px] mb-0">{t('site.home.supplier.title')}</h2>
            <p className="mt-3 max-w-[560px] text-sm leading-relaxed text-white/75 mb-0">{t('site.home.supplier.statement', { store: store.name })}</p>
            <Link href="/about/" className="group mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-2 hover:text-white no-underline">
              {t('site.home.supplier.about', { store: store.name })}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link href="/search/" className="group inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-brand-dark no-underline">
                {t('site.home.supplier.shopNow')}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/sign-in/" className="inline-flex h-11 items-center rounded-lg bg-white px-6 text-sm font-bold text-ink transition-colors hover:bg-brand-tint no-underline">
                {t('site.home.supplier.signIn')}
              </Link>
              <Link href="/register/" className="inline-flex h-11 items-center rounded-lg border-2 border-white/60 px-6 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-ink no-underline">
                {t('site.home.supplier.createAccount')}
              </Link>
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 my-0 list-none pl-0">
          <Indicator icon={<BadgeCheck className="size-5" />} title={t('site.home.supplier.quality')} text={t('site.home.supplier.qualityText')} />
          <Indicator icon={<ShieldCheck className="size-5" />} title={t('site.home.supplier.brands')} text={t('site.home.supplier.brandsText')} />
          <Indicator icon={<PackageCheck className="size-5" />} title={t('site.home.supplier.supply')} text={t('site.home.supplier.supplyText')} />
          <Indicator icon={<Sparkles className="size-5" />} title={t('site.home.supplier.fresh')} text={t('site.home.supplier.freshText')} />
        </ul>
      </div>
    </section>
  )
}

export const HomePage = () => {
  const catalog = useListing({})
  const { collections, status, nameOf } = useCategoryNames()
  const ordered = picturedFirst(catalog.items)
  const pictured = ordered.filter((p) => p.photo)
  const showcase = ordered.slice(0, 12)
  // The hero's first two products trade places: the second stands in the centre, the first beside it on the left.
  const fanned = pictured.slice(0, 5)
  const hero = [...fanned.slice(1, 2), ...fanned.slice(0, 1), ...fanned.slice(2)]
  return (
    <Layout>
      <Hero products={hero} collections={collections} />
      <Categories collections={collections} busy={status === 'loading' || status === 'idle'} />
      <Values />
      {catalog.status === 'ready' && showcase.length === 0 ? null : <Showcase products={showcase} busy={catalog.status !== 'ready'} nameOf={nameOf} />}
      <Distribution />
      <Segments />
      <Supplier />
    </Layout>
  )
}
