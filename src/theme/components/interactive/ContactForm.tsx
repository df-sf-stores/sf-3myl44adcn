'use client'

import { useState } from 'react'
import { Link, TextField, useStorefront } from '@dripfunnel/storefront-core/theme'
import { whatsappLink } from '../contact'
import styles from '../../styles/contact.module.css'

const safe = /[A-Za-z0-9\-_.~]/

/** Percent-encodes words for a link's query, as UTF-8 (the message goes to WhatsApp as its prefilled text). */
const encode = (text: string) => {
  let out = ''
  for (const ch of text) {
    if (safe.test(ch)) {
      out += ch
      continue
    }
    const cp = ch.codePointAt(0) ?? 0
    const bytes =
      cp < 0x80
        ? [cp]
        : cp < 0x800
          ? [0xc0 | (cp >> 6), 0x80 | (cp & 63)]
          : cp < 0x10000
            ? [0xe0 | (cp >> 12), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)]
            : [0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63)]
    out += bytes.map((b) => `%${b.toString(16).toUpperCase().padStart(2, '0')}`).join('')
  }
  return out
}

/**
 * The reference's form. Core sends no messages, so Send Message opens the store's WhatsApp chat with the message
 * written out; until the name, email and message are in, it points out what's missing instead.
 */
export const ContactForm = () => {
  const { store, t } = useStorefront()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [tried, setTried] = useState(false)
  const chat = whatsappLink(store)
  const missing = { first: first.trim() === '', email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), message: message.trim() === '' }
  const ready = !missing.first && !missing.email && !missing.message
  const text = t('site.contact.whatsappMessage', { first: first.trim(), last: last.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() })
  const href = chat ? `${chat.split('?')[0]}?text=${encode(text)}` : null
  return (
    <div className="mt-5 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label={t('site.contact.firstName')} autoComplete="given-name" value={first} onChange={setFirst} error={tried && missing.first ? t('site.contact.required') : null} className={styles.field} />
        <TextField label={t('site.contact.lastName')} autoComplete="family-name" value={last} onChange={setLast} className={styles.field} />
      </div>
      <TextField label={t('site.contact.emailField')} type="email" autoComplete="email" value={email} onChange={setEmail} error={tried && missing.email ? t('site.contact.emailInvalid') : null} className={styles.field} />
      <TextField label={t('site.contact.subject')} value={subject} onChange={setSubject} className={styles.field} />
      <TextField label={t('site.contact.message')} value={message} onChange={setMessage} maxLength={1000} error={tried && missing.message ? t('site.contact.required') : null} className={styles.message} />
      {ready && href ? (
        <Link href={href} className="inline-flex h-[42px] items-center justify-center rounded-lg bg-brand px-8 text-sm font-semibold text-white no-underline transition-colors hover:bg-brand-dark">
          {t('site.contact.send')}
        </Link>
      ) : (
        <button type="button" onClick={() => setTried(true)} className="inline-flex h-[42px] items-center justify-center rounded-lg border-0 bg-brand px-8 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
          {t('site.contact.send')}
        </button>
      )}
    </div>
  )
}
