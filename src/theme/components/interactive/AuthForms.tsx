'use client'

import { useState } from 'react'
import { Form, Link, SubmitButton, TextField, navigate, useSignIn, useStorefront, type FieldProblem } from '@dripfunnel/storefront-core/theme'
import styles from '../../styles/auth.module.css'

const useRefusal = (code: string | null) => {
  const { t } = useStorefront()
  if (!code) return null
  if (code === 'SIGN_IN_REFUSED') return t('shop.account.refused.signIn')
  if (code === 'CODE_REFUSED') return t('shop.account.refused.code')
  if (code === 'RATE_LIMITED') return t('shop.account.refused.tooMany')
  if (code === 'METHOD_OFF') return t('shop.account.refused.methodOff')
  if (code === 'NOT_IN_PREVIEW') return t('shop.account.preview')
  return t('shop.account.refused.other')
}

/** Email and password; signed in, the shopper goes to their account. */
export const SignInForm = () => {
  const { t } = useStorefront()
  const page = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Partial<Record<'email' | 'password', FieldProblem>>>({})
  const refusal = useRefusal(page.error)
  return (
    <Form
      label={t('site.auth.signIn')}
      className={styles.form}
      onSubmit={async () => {
        const problems = await page.signIn({ email, password, remember: true })
        setErrors(problems)
        if (Object.keys(problems).length === 0) navigate('/account/')
      }}
    >
      <div className="space-y-4 px-6">
        {refusal ? (
          <p className="my-0 rounded-md bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
            {refusal}
          </p>
        ) : null}
        <TextField label={t('site.auth.email')} type="email" autoComplete="email" value={email} onChange={setEmail} error={errors.email ? t('site.auth.emailValidation') : null} className={styles.field} />
        <div className="relative">
          <TextField label={t('site.auth.password')} type="password" autoComplete="current-password" value={password} onChange={setPassword} error={errors.password ? t('site.auth.passwordRequired') : null} className={styles.field} />
          <Link href="/forgot-password/" className="absolute top-0 right-0 text-sm text-[#62748e] no-underline hover:text-[#0f172b]">
            {t('site.auth.forgot')}
          </Link>
        </div>
        <SubmitButton disabled={page.busy} className={styles.submit}>
          {page.busy ? t('site.auth.signingIn') : t('site.auth.signIn')}
        </SubmitButton>
      </div>
      <div className="mt-2 flex flex-col items-center px-6">
        <p className="my-0 text-center text-sm text-[#62748e]">
          {t('site.auth.noAccount')}{' '}
          <Link href="/register/" className="text-[#62748e] underline hover:text-[#0f172b]">
            {t('site.auth.register')}
          </Link>
        </p>
      </div>
    </Form>
  )
}

/** The reference's fields; core then emails a code, and the code with the name and password makes the account. */
export const RegisterForm = () => {
  const { t } = useStorefront()
  const page = useSignIn()
  const [email, setEmail] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [code, setCode] = useState('')
  const [problem, setProblem] = useState<string | null>(null)
  const refusal = useRefusal(page.error)
  const footer = (
    <div className="mt-2 flex flex-col items-center px-6">
      <p className="my-0 text-center text-sm text-[#62748e]">
        {t('site.auth.haveAccount')}{' '}
        <Link href="/sign-in/" className="text-[#62748e] underline hover:text-[#0f172b]">
          {t('site.auth.signInLink')}
        </Link>
      </p>
    </div>
  )
  if (page.sent) {
    return (
      <Form
        label={t('site.auth.createAccount')}
        className={styles.form}
        onSubmit={async () => {
          const problems = await page.verify({ code, name: `${first} ${last}`.trim(), password, remember: true })
          if (Object.keys(problems).length === 0) navigate('/account/')
          else setProblem(problems.code ? t('shop.account.codeRule') : t('shop.account.refused.details'))
        }}
      >
        <div className="space-y-4 px-6">
          <p className="my-0 text-sm text-[#62748e]">{t('shop.account.codeSent', { to: page.sent.to })}</p>
          {refusal || problem ? (
            <p className="my-0 rounded-md bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
              {problem ?? refusal}
            </p>
          ) : null}
          <TextField label={t('shop.account.code')} inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={setCode} className={styles.field} />
          <SubmitButton disabled={page.busy} className={styles.submit}>
            {page.busy ? t('site.auth.creating') : t('site.auth.createAccount')}
          </SubmitButton>
          <button type="button" onClick={page.restart} className="w-full border-0 bg-transparent p-0 text-center text-sm text-[#62748e] underline">
            {t('shop.account.another')}
          </button>
        </div>
        {footer}
      </Form>
    )
  }
  return (
    <Form
      label={t('site.auth.createAccount')}
      className={styles.form}
      onSubmit={async () => {
        if (password.length < 8) return setProblem(t('site.auth.passwordMinLength'))
        if (password !== confirm) return setProblem(t('site.auth.passwordsMismatch'))
        setProblem(null)
        const problems = await page.sendCode({ channel: 'email', to: email })
        if (problems.to) setProblem(t('site.auth.emailValidation'))
      }}
    >
      <div className="space-y-4 px-6">
        {refusal || problem ? (
          <p className="my-0 rounded-md bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
            {problem ?? refusal}
          </p>
        ) : null}
        <TextField label={t('site.auth.emailAddress')} type="email" autoComplete="email" value={email} onChange={setEmail} className={styles.field} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label={t('site.auth.firstName')} autoComplete="given-name" value={first} onChange={setFirst} className={styles.field} />
          <TextField label={t('site.auth.lastName')} autoComplete="family-name" value={last} onChange={setLast} className={styles.field} />
        </div>
        <TextField label={t('site.auth.phone')} type="tel" autoComplete="tel" value={phone} onChange={setPhone} className={styles.field} />
        <TextField label={t('site.auth.password')} type="password" autoComplete="new-password" value={password} onChange={setPassword} className={styles.field} />
        <TextField label={t('site.auth.confirmPassword')} type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} className={styles.field} />
        <SubmitButton disabled={page.busy} className={styles.submit}>
          {page.busy ? t('site.auth.creating') : t('site.auth.createAccount')}
        </SubmitButton>
      </div>
      {footer}
    </Form>
  )
}
