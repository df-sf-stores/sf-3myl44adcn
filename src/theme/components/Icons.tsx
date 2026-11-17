import type { ReactNode } from 'react'

/** The reference's line icons (24×24, 2px round strokes), drawn as it draws them. */
const Line = ({ className, children }: { className?: string | undefined; children: ReactNode }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

type Icon = { className?: string | undefined }

export const ArrowRight = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Line>
)
export const Award = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    <circle cx="12" cy="8" r="6" />
  </Line>
)
export const BadgeCheck = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m16 9-5.5 5.5L8 12" />
  </Line>
)
export const BadgePercent = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m15 9-6 6" />
    <path d="M9 9h.01" />
    <path d="M15 15h.01" />
  </Line>
)
export const Building = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M10 12h4" />
    <path d="M10 8h4" />
    <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
    <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
  </Line>
)
export const ChevronDown = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m6 9 6 6 6-6" />
  </Line>
)
export const ChevronLeft = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m15 18-6-6 6-6" />
  </Line>
)
export const ChevronRight = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m9 18 6-6-6-6" />
  </Line>
)
export const ChevronUp = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m18 15-6-6-6 6" />
  </Line>
)
export const CircleCheck = ({ className }: Icon) => (
  <Line className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m16 9-5.5 5.5L8 12" />
  </Line>
)
export const Clock = ({ className }: Icon) => (
  <Line className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Line>
)
export const Handshake = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </Line>
)
export const Heart = ({ className, filled = false }: Icon & { filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
  </svg>
)
export const House =({ className }: Icon) => (
  <Line className={className}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Line>
)
export const Mail = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect x="2" y="4" width="20" height="16" rx="2" />
  </Line>
)
export const ImageOff = ({ className }: Icon) => (
  <Line className={className}>
    <line x1="2" x2="22" y1="2" y2="22" />
    <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
    <line x1="13.5" x2="6" y1="13.5" y2="21" />
    <line x1="18" x2="21" y1="12" y2="15" />
    <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
    <path d="M21 15V5a2 2 0 0 0-2-2H9" />
  </Line>
)
export const MapPin = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Line>
)
export const Maximize = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M15 3h6v6" />
    <path d="m21 3-7 7" />
    <path d="m3 21 7-7" />
    <path d="M9 21H3v-6" />
  </Line>
)
export const MenuIcon = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </Line>
)
export const Milk = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M8 2h8" />
    <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
    <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
  </Line>
)
export const Minus = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M5 12h14" />
  </Line>
)
export const PackageCheck = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M12 22V12" />
    <path d="m16 17 2 2 4-4" />
    <path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" />
    <path d="M3.29 7 12 12l8.71-5" />
    <path d="m7.5 4.27 8.997 5.148" />
  </Line>
)
export const Phone = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
  </Line>
)
export const Plus = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Line>
)
export const SearchIcon = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </Line>
)
export const ShieldCheck = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Line>
)
export const Bag = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M16 10a4 4 0 0 1-8 0" />
    <path d="M3.103 6.034h17.794" />
    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
  </Line>
)
export const Basket = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m15 11-1 9" />
    <path d="m19 11-4-7" />
    <path d="M2 11h20" />
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
    <path d="M4.5 15.5h15" />
    <path d="m5 11 4-7" />
    <path d="m9 11 1 9" />
  </Line>
)
export const Cart = ({ className }: Icon) => (
  <Line className={className}>
    <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
    <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
    <circle cx="18" cy="20" r="2" />
    <circle cx="8" cy="20" r="2" />
  </Line>
)
export const Sliders = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M10 5H3" />
    <path d="M12 19H3" />
    <path d="M14 3v4" />
    <path d="M16 17v4" />
    <path d="M21 12h-9" />
    <path d="M21 19h-5" />
    <path d="M21 5h-7" />
    <path d="M8 10v4" />
    <path d="M8 12H3" />
  </Line>
)
export const Sparkles = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
    <path d="M20 2v4" />
    <path d="M22 4h-4" />
    <circle cx="4" cy="20" r="2" />
  </Line>
)
export const StoreIcon = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
    <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
    <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
  </Line>
)
export const Truck = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </Line>
)
export const Users = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <circle cx="9" cy="7" r="4" />
  </Line>
)
export const UserCircle = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M18 20a6 6 0 0 0-12 0" />
    <circle cx="12" cy="10" r="4" />
    <circle cx="12" cy="12" r="10" />
  </Line>
)
export const UserIcon = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Line>
)
export const Close = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Line>
)
export const Trash = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Line>
)
export const Zap = ({ className }: Icon) => (
  <Line className={className}>
    <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
  </Line>
)

/** The hand-drawn leaf the reference scatters by its headings. */
export const Leaf = ({ className }: Icon) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M34 4C18 4 6 13 6 28c0 3 .6 5.6 1.6 7.6C10 22 19 14 31 11 20 16 13 24 10 36c2 .6 4 .9 6 .9C29 37 36 26 36 12c0-2.8-.6-5.6-2-8Z" />
  </svg>
)

/** The brush underline below a highlighted word. */
export const Underline = ({ className, tall = false }: Icon & { tall?: boolean }) =>
  tall ? (
    <svg className={className} viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M3 10C60 3 140 2 197 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M3 9C50 3 150 2 197 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  )

/** The orange swoosh with its dark shadow that the hero's products and the closing row stand on. */
export const Swoosh = ({ className, thin = false }: Icon & { thin?: boolean }) =>
  thin ? (
    <svg className={className} viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path fill="#F4511E" d="M6 16C120 4 260 2 360 5s170 4 232 10c7 1 7 11 0 13-80 9-200 12-310 10S70 34 10 30c-9-1-12-12-4-14Z" />
      <path fill="#252525" opacity="0.8" d="M50 34c110 5 250 5 360 1s140-7 170-12c-30 12-140 17-260 17S90 38 50 34Z" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path fill="#F4511E" d="M8 70C90 38 210 30 312 38s190 6 280 26c8 2 8 14 0 18-92 30-208 34-300 30S88 104 14 96c-12-2-16-20-6-26Z" />
      <path fill="#252525" opacity="0.85" d="M40 100c90 10 200 12 300 6s170-12 230-24c-40 22-140 34-250 36S90 114 40 100Z" />
    </svg>
  )

export const WhatsAppMark = ({ className }: Icon) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <path d="M16.003 3C8.832 3 3 8.83 3 16c0 2.293.6 4.533 1.74 6.507L3 29l6.66-1.707A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3Zm0 23.6c-1.98 0-3.92-.533-5.613-1.54l-.4-.24-3.953 1.013 1.053-3.853-.26-.4A10.56 10.56 0 0 1 5.4 16c0-5.847 4.757-10.6 10.603-10.6S26.6 10.153 26.6 16s-4.75 10.6-10.597 10.6Zm5.813-7.94c-.32-.16-1.887-.933-2.18-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.497-2.567-1.587-.947-.847-1.587-1.893-1.773-2.213-.187-.32-.02-.493.14-.653.143-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.623-.523-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.46 4.827.763.33 1.358.527 1.822.674.766.243 1.463.209 2.014.127.614-.092 1.887-.772 2.153-1.517.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
  </svg>
)
