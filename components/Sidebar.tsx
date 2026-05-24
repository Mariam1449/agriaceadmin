'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentType, SVGProps } from 'react'
import {
  CategoriesIcon,
  ChevronDownIcon,
  CloseIcon,
  DashboardIcon,
  HomeIcon,
  LeadsIcon,
  NewsletterIcon,
  PlusIcon,
  SparkIcon,
  UsersIcon,
  SettingsIcon,
} from './AdminIcons'

type SidebarItem = {
  label: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  match?: (pathname: string) => boolean
  children?: Array<{
    label: string
    href: string
    match?: (pathname: string) => boolean
  }>
}

const generalNavigation: SidebarItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: HomeIcon,
    match: (pathname) => pathname === '/',
    children: [
      { label: 'Dashboard', href: '/', match: (pathname) => pathname === '/' },
      {
        label: 'Products',
        href: '/products',
        match: (pathname) =>
          pathname === '/products' ||
          (pathname.startsWith('/products/') &&
            pathname !== '/products/new' &&
            pathname.endsWith('/edit')),
      },
      {
        label: 'Add Product',
        href: '/products/new',
        match: (pathname) => pathname === '/products/new',
      },
    ],
  },
]

const managementNavigation: SidebarItem[] = [
  { label: 'Categories', href: '/products', icon: CategoriesIcon },
  { label: 'Leads', href: '/products', icon: LeadsIcon },
  { label: 'Users', href: '/products', icon: UsersIcon },
  { label: 'Newsletter', href: '/products', icon: NewsletterIcon },
  { label: 'Settings', href: '/products', icon: SettingsIcon },
]

function isItemActive(pathname: string, item: SidebarItem) {
  if (item.match) {
    return item.match(pathname)
  }

  return pathname === item.href
}

function isChildActive(
  pathname: string,
  child: { href: string; match?: (pathname: string) => boolean }
) {
  if (child.match) {
    return child.match(pathname)
  }

  return pathname === child.href
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
      className={`fixed inset-y-0 left-0 z-40 w-[255px] border-r border-[var(--sidebar-border)] bg-[linear-gradient(180deg,var(--sidebar-strong)_0%,var(--sidebar-bg)_100%)] text-[var(--sidebar-text)] shadow-[0_28px_64px_rgba(3,10,24,0.24)] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <Link href="/" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <SparkIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[1.05rem] font-semibold tracking-[-0.02em] text-white">
                AgriAce Admin
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-white/8 px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 bg-[linear-gradient(180deg,var(--primary-soft)_0%,#dbe7ff_100%)] text-[0.95rem] font-semibold text-[var(--primary)]">
              JD
            </div>
            <div>
              <p className="text-[0.76rem] text-white/60">Welcome,</p>
              <p className="text-[1rem] font-semibold text-white">John Doe</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4">
          <p className="sidebar-section-title">General</p>
          <nav className="mt-3 space-y-1">
            {generalNavigation.map((item) => {
              const Icon = item.icon
              const active = isItemActive(pathname, item)
              const expanded =
                active ||
                item.children?.some((child) => isChildActive(pathname, child))

              return (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="classic-sidebar-link"
                    data-active={expanded}
                    onClick={onClose}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span className="text-[0.83rem] font-medium">
                        {item.label}
                      </span>
                    </span>

                    {item.children ? (
                      <ChevronDownIcon
                        className={`h-3.5 w-3.5 transition-transform ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      />
                    ) : null}
                  </Link>

                  {item.children && expanded ? (
                    <div className="mt-1 space-y-1 border-l border-white/8 pl-5">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="classic-sidebar-sublink"
                          data-active={isChildActive(pathname, child)}
                          onClick={onClose}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="px-4 pb-5">
          <p className="sidebar-section-title">Management</p>
          <nav className="mt-3 space-y-1">
            {managementNavigation.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="classic-sidebar-link"
                  data-active={isItemActive(pathname, item)}
                  onClick={onClose}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-[0.83rem] font-medium">
                      {item.label}
                    </span>
                  </span>
                  <ChevronDownIcon className="h-3.5 w-3.5 opacity-50" />
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto px-4 pb-4 pt-2">
          <div className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-300/85">
              Quick Actions
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300/75">
              Keep the main admin tasks close instead of leaving this area empty.
            </p>

            <div className="mt-4 space-y-2">
              <Link
                href="/products/new"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 text-sm font-medium text-white hover:bg-white/[0.1]"
                onClick={onClose}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/20 text-[#93c5fd]">
                  <PlusIcon className="h-4 w-4" />
                </span>
                <span>Add product</span>
              </Link>

              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/[0.08]"
                onClick={onClose}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-200">
                  <DashboardIcon className="h-4 w-4" />
                </span>
                <span>Back to dashboard</span>
              </Link>
            </div>

            <div className="mt-4 rounded-xl border border-white/8 bg-black/10 px-3 py-2 text-xs text-slate-300/70">
              AgriAce Admin workspace
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
