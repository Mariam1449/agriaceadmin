'use client'

import Link from 'next/link'
import {
  ExternalLinkIcon,
  LogoutIcon,
  MenuIcon,
} from './AdminIcons'

export default function Header({
  title,
  onMenuClick,
}: {
  title: string
  onMenuClick: () => void
}) {
  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(17,24,39,0.94),rgba(10,15,26,0.92))] px-5 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.24)] backdrop-blur sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="button-secondary rounded-2xl p-2.5 lg:hidden"
            aria-label="Open navigation"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-[1.75rem] font-bold tracking-[-0.03em] text-white">
              {title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-[0.82rem] font-medium text-slate-200 xl:flex">
            Admin workspace
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-white px-3.5 py-2 text-[0.88rem] font-medium text-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f5f7fb] hover:shadow-[0_14px_24px_rgba(2,6,23,0.12)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            <span className="hidden sm:inline">View catalog</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_100%)] px-3.5 py-2 text-[0.88rem] font-medium text-white shadow-[0_12px_24px_rgba(37,99,235,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#1d4ed8_0%,#1e40af_100%)] hover:shadow-[0_16px_28px_rgba(37,99,235,0.24)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <LogoutIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
