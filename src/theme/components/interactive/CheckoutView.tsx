'use client'

import { useState, type ReactNode } from 'react'
import {
  AddressFields,
  Choices,
  Form,
  Link,
  OrderSummary,
  PaymentElement,
  PhoneField,
  PlaceOrder,
  Price,
  SubmitButton,
  TextField,
  addressDraft,
  useCheckout,
  useStorefront,
  type AddressDraft,
  type AddressField,
  type CheckoutStepId,
  type FieldProblem,
} from '@dripfunnel/storefront-core/theme'
import { Retry } from './Retry'
import { ChevronDown, ChevronUp } from '../Icons'
import styles from '../../styles/checkout.module.css'

/** One step's card: its number and title; open, it shows its fields; done, a Change button. */
const Step = ({ title, state, onEdit, change, children }: { title: string; state: 'done' | 'open' | 'later'; onEdit: () => void; change: string; children: ReactNode }) => (
  <section className="rounded-xl border border-[#e2e8f0] bg-white shadow-xs">
    <div className="flex items-center justify-between px-5 py-5 sm:px-6">
      <h2 className="my-0 flex items-center gap-3 text-lg font-medium">
        <span className={`${styles.cardNumber} flex size-8 items-center justify-center rounded-full text-sm font-semibold ${state === 'later' ? 'bg-muted text-[#62748e]' : 'bg-[#0f172b] text-white'}`} aria-hidden="true" />
        <span className={state === 'later' ? 'text-[#62748e]' : 'text-[#020618]'}>{title}</span>
      </h2>
      {state === 'done' ? (
        <button type="button" onClick={onEdit} className="border-0 bg-transparent p-0 text-sm font-medium text-ink underline underline-offset-4">
          {change}
        </button>
      ) : state === 'open' ? (
        <ChevronUp className="size-4 text-[#62748e]" />
      ) : (
        <ChevronDown className="size-4 text-[#62748e]" />
      )}
    </div>
    {state === 'open' ? <div className="px-5 pb-6 sm:px-6">{children}</div> : null}
  </section>
)

/** Checkout: the steps on the left, the order summary on the right, each state handled. */
export const CheckoutView = () => {
  const { store, locale, t } = useStorefront()
  const page = useCheckout()
  const cart = page.cart
  const home = store.address?.country ?? page.countries[0] ?? 'IN'
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contactErrors, setContactErrors] = useState<Partial<Record<'email' | 'phone', FieldProblem>>>({})
  const [draft, setDraft] = useState<AddressDraft | null>(null)
  const [addressErrors, setAddressErrors] = useState<Partial<Record<AddressField, FieldProblem>>>({})
  const [delivery, setDelivery] = useState<string | null>(null)

  if (page.status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-10" aria-busy="true" aria-label={t('shop.checkout.loading')}>
        <h1 className="mt-0 mb-8 text-3xl font-bold">{t('site.checkout.title')}</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <span className="block h-72 animate-pulse rounded-xl bg-muted lg:col-span-2" />
          <span className="block h-60 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    )
  }
  if (page.status === 'error' || page.status === 'empty' || !cart) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mt-0 mb-4 text-3xl font-bold">{page.status === 'error' ? t('shop.checkout.failed') : t('shop.checkout.empty')}</h1>
        <p className="mt-0 mb-8 text-[#62748e]">{page.status === 'error' ? t('shop.listing.failedLead') : t('site.cart.emptyMessage')}</p>
        {page.status === 'error' ? (
          <Retry label={t('shop.listing.retry')} onRetry={page.retry} />
        ) : (
          <Link href="/search/" className="inline-flex h-10 items-center rounded-md bg-[#0f172b] px-6 text-sm font-medium text-white no-underline">
            {t('site.cart.continue')}
          </Link>
        )}
      </div>
    )
  }
  const address = draft ?? addressDraft(cart.shippingAddress, home)
  const chosenDelivery = delivery ?? cart.shippingOption ?? cart.shippingOptions[0]?.id ?? null
  const titles: Record<CheckoutStepId, string> = {
    contact: t('site.checkout.contact'),
    address: t('site.checkout.address'),
    delivery: t('site.checkout.delivery'),
    payment: t('site.checkout.payment'),
    review: t('site.checkout.review'),
  }
  const short: Record<CheckoutStepId, string> = {
    contact: t('site.checkout.stepContact'),
    address: t('site.checkout.stepAddress'),
    delivery: t('site.checkout.stepDelivery'),
    payment: t('site.checkout.stepPayment'),
    review: t('site.checkout.stepReview'),
  }
  const refusal = page.error
    ? page.error === 'OUT_OF_STOCK'
      ? t('shop.checkout.refusals.outOfStock')
      : page.error === 'PHONE_REQUIRED'
        ? t('shop.checkout.refusals.phone')
        : page.error === 'NOT_READY'
          ? t('shop.checkout.refusals.notReady')
          : t('shop.checkout.refusals.other')
    : null

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mt-0 mb-8 text-3xl font-bold">{t('site.checkout.title')}</h1>
      <div className="grid items-start gap-8 lg:grid-cols-3">
        <div className={`${styles.cards} space-y-4 lg:col-span-2`}>
          <ol className={`${styles.steps} my-0 mb-6 flex list-none items-start justify-between gap-2 pl-0`}>
            {page.steps.map((s) => (
              <li key={s.id} className="relative flex flex-1 flex-col items-start gap-1.5 last:flex-none last:items-end">
                {s.id === page.steps[page.steps.length - 1]?.id ? null : <span className="absolute top-[18px] right-3 left-12 h-px bg-[#e2e8f0]" aria-hidden="true" />}
                <span className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold ${s.state === 'open' ? 'bg-[#0f172b] text-white ring-4 ring-[#0f172b]/15' : s.state === 'done' ? 'bg-[#0f172b] text-white' : 'bg-muted text-[#62748e]'} ${styles.stepNumber}`} aria-hidden="true" />
                <span className={`text-xs ${s.state === 'later' ? 'text-[#62748e]' : 'font-medium text-[#020618]'}`}>{short[s.id]}</span>
              </li>
            ))}
          </ol>
          {refusal ? (
            <p className="my-0 rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
              {refusal}
            </p>
          ) : null}
          {page.steps.map((s) => (
            <Step key={s.id} title={titles[s.id]} state={s.state} onEdit={() => page.edit(s.id)} change={t('shop.checkout.change')}>
              {s.id === 'contact' ? (
                <Form
                  label={titles.contact}
                  className={styles.form}
                  onSubmit={async () => setContactErrors(await page.saveContact({ email: email || cart.email || '', phone: phone || cart.phone || '' }))}
                >
                  <p className="my-0 text-sm text-[#62748e]">
                    {t('site.checkout.haveAccount')}{' '}
                    <Link href="/sign-in/" className="font-medium text-ink underline underline-offset-4">
                      {t('site.checkout.signIn')}
                    </Link>
                  </p>
                  <TextField label={t('site.checkout.email')} type="email" autoComplete="email" value={email || cart.email || ''} onChange={setEmail} error={contactErrors.email ? t('shop.checkout.required') : null} className={styles.field} />
                  <PhoneField label={t('shop.checkout.phone')} codeLabel={t('shop.checkout.countryCode')} country={home} locale={locale} value={phone || cart.phone || ''} onChange={setPhone} error={contactErrors.phone ? t('shop.checkout.phoneInvalid') : null} className={styles.field} groupClassName={styles.phone} />
                  <SubmitButton disabled={page.busy} className={styles.primary}>
                    {t('site.checkout.continue')}
                  </SubmitButton>
                </Form>
              ) : null}
              {s.id === 'address' ? (
                <Form label={titles.address} className={styles.form} onSubmit={async () => setAddressErrors(await page.saveAddress(address))}>
                  <AddressFields value={address} onChange={setDraft} countries={page.countries} errors={addressErrors} t={t} locale={locale} fieldClassName={styles.field} phoneClassName={styles.phone} className={styles.address} />
                  <SubmitButton disabled={page.busy} className={styles.primary}>
                    {t('site.checkout.continue')}
                  </SubmitButton>
                </Form>
              ) : null}
              {s.id === 'delivery' ? (
                <Form label={titles.delivery} className={styles.form} onSubmit={async () => void (chosenDelivery ? await page.chooseDelivery(chosenDelivery) : null)}>
                  {cart.shippingOptions.length ? (
                    <Choices
                      legend={titles.delivery}
                      value={chosenDelivery}
                      onChange={setDelivery}
                      className={styles.choices}
                      optionClassName={styles.choice}
                      chosenClassName={styles.chosen}
                      options={cart.shippingOptions.map((o) => ({
                        value: o.id,
                        content: (
                          <span className="flex w-full items-center justify-between gap-3">
                            <span>
                              <span className="block font-medium text-ink">{o.service ?? o.provider ?? t('shop.checkout.standard')}</span>
                              {o.minDays !== null && o.maxDays !== null ? <span className="block text-xs text-[#62748e]">{t('shop.checkout.days', { min: o.minDays, max: o.maxDays })}</span> : null}
                            </span>
                            <Price money={o.amount} includesTax={store.pricesIncludeTax} locale={locale} t={t} />
                          </span>
                        ),
                      }))}
                    />
                  ) : (
                    <p className="my-0 text-sm text-danger">{t('shop.checkout.noDelivery')}</p>
                  )}
                  <SubmitButton disabled={page.busy || !chosenDelivery} className={styles.primary}>
                    {t('site.checkout.continue')}
                  </SubmitButton>
                </Form>
              ) : null}
              {s.id === 'payment' ? (
                <Form label={titles.payment} className={styles.form} onSubmit={async () => void (await page.review())}>
                  {page.payments.length ? (
                    <Choices
                      legend={titles.payment}
                      value={page.chosen}
                      onChange={page.choosePayment}
                      className={styles.choices}
                      optionClassName={styles.choice}
                      chosenClassName={styles.chosen}
                      options={page.payments.map((p) => ({
                        value: p.provider,
                        content: (
                          <span className="block">
                            <span className="block font-medium text-ink">
                              {p.kind === 'card'
                                ? t('shop.checkout.methods.card')
                                : p.kind === 'cod'
                                  ? t('shop.checkout.methods.cod')
                                  : p.kind === 'transfer'
                                    ? t('shop.checkout.methods.transfer')
                                    : p.provider === 'phonepe'
                                      ? t('shop.checkout.methods.phonepe')
                                      : p.provider === 'paypal'
                                        ? t('shop.checkout.methods.paypal')
                                        : t('shop.checkout.methods.upi')}
                            </span>
                            {p.instructions ? <span className="block text-xs text-[#62748e]">{p.instructions}</span> : null}
                          </span>
                        ),
                      }))}
                    />
                  ) : (
                    <p className="my-0 text-sm text-danger">{t('shop.checkout.noPayment')}</p>
                  )}
                  <SubmitButton disabled={page.busy || !page.chosen} className={styles.primary}>
                    {t('site.checkout.continue')}
                  </SubmitButton>
                </Form>
              ) : null}
              {s.id === 'review' ? (
                <div className="space-y-4">
                  <p className="my-0 text-sm text-[#62748e]">{t('shop.checkout.agree')}</p>
                  <PlaceOrder checkout={page} again={t('shop.checkout.payAgain')} className={styles.primary}>
                    {t('site.checkout.place')}
                  </PlaceOrder>
                </div>
              ) : null}
            </Step>
          ))}
          <PaymentElement t={t} className={styles.payment} />
        </div>
        <aside className="rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-xs lg:sticky lg:top-24">
          <h2 className="mt-0 mb-4 text-lg font-medium text-[#020618]">{t('site.cart.summary')}</h2>
          <OrderSummary cart={cart} at="checkout" locale={locale} t={t} className={styles.summary} />
        </aside>
      </div>
    </div>
  )
}
