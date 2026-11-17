'use client'

export const Retry = ({ label, onRetry }: { label: string; onRetry: () => void }) => (
  <button type="button" onClick={onRetry} className="inline-flex h-10 items-center rounded-lg border-0 bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-dark">
    {label}
  </button>
)
