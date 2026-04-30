'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CategoriesIcon,
  CloseIcon,
  DashboardIcon,
  LeadsIcon,
  NewsletterIcon,
  PlusIcon,
  ProductsIcon,
  SettingsIcon,
  SparkIcon,
  UsersIcon,
} from './AdminIcons'

const navigation = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon, hint: 'Overview' },
  { name: 'Products', href: '/products', icon: ProductsIcon, hint: 'Catalog' },
  { name: 'Add Product', href: '/products/new', icon: PlusIcon, hint: 'Create' },
]

const secondaryNavigation = [
  { name: 'Categories', href: '/products', icon: CategoriesIcon, hint: 'Soon' },
  { name: 'Leads', href: '/products', icon: LeadsIcon, hint: 'Soon' },
  { name: 'Users', href: '/products', icon: UsersIcon, hint: 'Soon' },
  { name: 'Newsletter', href: '/products', icon: NewsletterIcon, hint: 'Soon' },
  { name: 'Settings', href: '/products', icon: SettingsIcon, hint: 'Soon' },
]

function isRouteActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  if (href === '/products') {
    return (
      pathname === '/products' ||
      (pathname.startsWith('/products/') &&
        pathname !== '/products/new' &&
        pathname.endsWith('/edit'))
    )
  }

  return pathname === href
}

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-[286px] overflow-y-auto px-3 py-3 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:px-4 lg:py-4 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex min-h-full flex-col rounded-[26px] border border-[var(--sidebar-border)] bg-[linear-gradient(180deg,var(--sidebar-strong)_0%,var(--sidebar-bg)_100%)] p-4 text-[var(--sidebar-text)] shadow-[0_28px_64px_rgba(3,10,24,0.28)] lg:p-[1.1rem]">
        <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-4">
          <div>
            <div className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white">
              AgriAce Admin
            </div>
            <h1 className="mt-3 text-[1.55rem] font-bold leading-tight tracking-[-0.03em] text-white">
              Operations hub
            </h1>
            <p className="mt-2 max-w-[15rem] text-sm leading-6 text-[rgba(200,211,228,0.82)]">
              Manage catalog publishing, keep records clean, and monitor the next priorities.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[rgba(200,211,228,0.76)] hover:bg-white/[0.08] hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-5 space-y-1.5">
          {navigation.map((item) => {
            const isActive = isRouteActive(pathname, item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className="sidebar-link"
                data-active={isActive}
                onClick={onClose}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-white/90">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{item.name}</span>
                  <span className="block text-xs text-current/60">{item.hint}</span>
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-6">
          <p className="px-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[rgba(200,211,228,0.62)]">
            Workspace
          </p>
          <div className="mt-2.5 space-y-1.5">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="sidebar-link opacity-80 hover:opacity-100"
                  onClick={onClose}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-[rgba(200,211,228,0.82)]">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-normal">{item.name}</span>
                    <span className="block text-xs text-current/45">{item.hint}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-6 shrink-0 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-white">
              <SparkIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-white">Publishing queue</p>
              <p className="mt-1 text-xs leading-5 text-[rgba(200,211,228,0.76)]">
                Validate product content before moving items live.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 text-xs text-[rgba(200,211,228,0.76)]">
            Operator: <span className="font-semibold text-white">admin@agriace.com</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
