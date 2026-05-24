'use client'

import Link from 'next/link'
import {
  BellIcon,
  ChevronDownIcon,
  MenuIcon,
  MessageIcon,
  SearchIcon,
} from './AdminIcons'

export default function Header({
  title,
  onMenuClick,
}: {
  title: string
  onMenuClick: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[linear-gradient(180deg,rgba(17,24,39,0.96),rgba(10,15,26,0.94))] backdrop-blur">
      <div className="flex h-[58px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Open navigation"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onMenuClick}
            className="hidden rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white lg:inline-flex"
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="classic-header-icon"
            aria-label="Search"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="classic-header-icon relative"
            aria-label="Messages"
          >
            <MessageIcon className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          </button>
          <button
            type="button"
            className="classic-header-icon relative"
            aria-label="Notifications"
          >
            <BellIcon className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          </button>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full pl-2 pr-1 text-sm text-slate-200 hover:bg-white/10"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(180deg,var(--primary-soft)_0%,#dbe7ff_100%)] text-[0.74rem] font-semibold text-[var(--primary)]">
              JD
            </span>
            <span className="hidden sm:inline">John Doe</span>
            <ChevronDownIcon className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </div>
    </header>
  )
}
