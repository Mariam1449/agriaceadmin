import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'
import {
  AlertIcon,
  ArrowRightIcon,
  CategoriesIcon,
  CheckCircleIcon,
  ClockIcon,
  DatabaseIcon,
  LeadsIcon,
  ProductsIcon,
  SparkIcon,
  UsersIcon,
} from '@/components/AdminIcons'
import { prisma } from '@/lib/prisma'

async function getDashboardStats() {
  try {
    const [
      totalProducts,
      publishedProducts,
      totalCategories,
      totalLeads,
      newLeads,
      totalUsers,
      newsletterSubscribers,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: 'PUBLISHED' } }),
      prisma.productCategory.count(),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.user.count(),
      prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    ])

    return {
      totalProducts,
      publishedProducts,
      totalCategories,
      totalLeads,
      newLeads,
      totalUsers,
      newsletterSubscribers,
      dbConnected: true,
    }
  } catch {
    return {
      totalProducts: 0,
      publishedProducts: 0,
      totalCategories: 0,
      totalLeads: 0,
      newLeads: 0,
      totalUsers: 0,
      newsletterSubscribers: 0,
      dbConnected: false,
    }
  }
}

export default async function Dashboard() {
  const stats = await getDashboardStats()
  const unpublishedProducts = Math.max(
    stats.totalProducts - stats.publishedProducts,
    0
  )
  const publishRate =
    stats.totalProducts > 0
      ? Math.round((stats.publishedProducts / stats.totalProducts) * 100)
      : 0

  const statCards = [
    {
      title: 'Products',
      value: stats.totalProducts,
      subtitle: `${stats.publishedProducts} published`,
      icon: ProductsIcon,
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      subtitle: 'Active catalog groups',
      icon: CategoriesIcon,
    },
    {
      title: 'Leads',
      value: stats.totalLeads,
      subtitle: `${stats.newLeads} new`,
      icon: LeadsIcon,
    },
    {
      title: 'Users',
      value: stats.totalUsers,
      subtitle: 'Registered accounts',
      icon: UsersIcon,
    },
    {
      title: 'Newsletter',
      value: stats.newsletterSubscribers,
      subtitle: 'Active subscribers',
      icon: SparkIcon,
    },
  ]

  const chartData = [
    {
      label: 'Products',
      shortLabel: 'Products',
      value: stats.totalProducts,
      tone: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Published',
      shortLabel: 'Published',
      value: stats.publishedProducts,
      tone: 'from-indigo-500 to-indigo-600',
    },
    {
      label: 'Categories',
      shortLabel: 'Categories',
      value: stats.totalCategories,
      tone: 'from-slate-500 to-slate-600',
    },
    {
      label: 'Leads',
      shortLabel: 'Leads',
      value: stats.totalLeads,
      tone: 'from-cyan-500 to-cyan-600',
    },
    {
      label: 'Users',
      shortLabel: 'Users',
      value: stats.totalUsers,
      tone: 'from-violet-500 to-violet-600',
    },
    {
      label: 'Subscribers',
      shortLabel: 'Subscribers',
      value: stats.newsletterSubscribers,
      tone: 'from-amber-500 to-orange-500',
    },
  ]

  const chartMax = Math.max(...chartData.map((item) => item.value), 1)
  const largestMetric = chartData.reduce((largest, item) =>
    item.value > largest.value ? item : largest
  )
  const totalTrackedVolume = chartData.reduce((sum, item) => sum + item.value, 0)
  const chartPreviewHeights = [62, 26, 44, 84, 58, 34]
  const chartHighlightIndex =
    totalTrackedVolume === 0
      ? 3
      : Math.max(
          chartData.findIndex((item) => item.label === largestMetric.label),
          0
        )
  const chartScaleValues =
    totalTrackedVolume === 0
      ? [100, 75, 50, 25, 0]
      : [100, 75, 50, 25, 0].map((level) =>
          Math.round((chartMax * level) / 100)
        )

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-5">
        {!stats.dbConnected && (
          <div className="panel border-[var(--accent-soft)] bg-[linear-gradient(180deg,#fffdf8_0%,#f8f2e8_100%)] p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <AlertIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[var(--accent)]">
                  Database not connected
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--warning)]">
                  Live metrics are unavailable until PostgreSQL is configured.
                </p>
              </div>
            </div>
          </div>
        )}

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_320px]">
          <div className="panel flex h-full flex-col p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Dashboard graph
                </p>
                <h3 className="admin-page-title mt-2 text-foreground">
                  Operational volume overview
                </h3>
                <p className="admin-section-copy mt-2 max-w-2xl">
                  Compare core admin counts in one structured chart so product activity, publishing progress, and audience scale are readable immediately.
                </p>
              </div>
              <div className="grid min-w-[220px] gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-[var(--primary-soft)] px-4 py-3">
                  <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-muted">
                    Publish rate
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-[-0.03em] text-foreground">
                    {publishRate}%
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-white px-4 py-3">
                  <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-muted">
                    Tracked volume
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-[-0.03em] text-foreground">
                    {totalTrackedVolume}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_250px]">
              <div className="flex h-full flex-col rounded-[28px] border border-[#3155a4] bg-[linear-gradient(180deg,#1f3d7a_0%,#0f172a_100%)] p-6 text-white shadow-[0_20px_40px_rgba(2,6,23,0.24)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-200/90">
                      Core entities
                    </p>
                    <p className="mt-1.5 text-sm text-slate-200/78">
                      Relative size by current count
                    </p>
                  </div>
                  <div className="rounded-full border border-white/14 bg-white/8 px-3 py-1.5 font-mono text-[0.64rem] font-medium uppercase tracking-[0.12em] text-slate-100/90">
                    {totalTrackedVolume === 0 ? 'Preview mode' : `Peak ${chartMax}`}
                  </div>
                </div>

                <div className="relative mt-6 flex-1 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.03)_100%)] px-4 pb-4 pt-4">
                  <div className="pointer-events-none absolute inset-x-4 top-4 bottom-12">
                    <div className="flex h-full flex-col justify-between">
                      {chartScaleValues.map((value) => (
                        <div key={value} className="relative border-t border-dashed border-white/14">
                          <span className="absolute -top-2.5 left-0 bg-[#15284b] pr-2 font-mono text-[0.58rem] font-medium uppercase tracking-[0.1em] text-slate-300/80">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative ml-8 flex h-[320px] items-end gap-4 pt-4">
                    {chartData.map((item, index) => {
                      const barHeight = totalTrackedVolume === 0
                        ? `${chartPreviewHeights[index]}%`
                        : `${Math.max((item.value / chartMax) * 100, 16)}%`
                      const isHighlighted = index === chartHighlightIndex

                      return (
                        <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-3">
                          <div className="flex h-full w-full items-end justify-center">
                            <div
                              className={
                                isHighlighted
                                  ? 'w-full max-w-[44px] rounded-t-[10px] bg-[linear-gradient(180deg,#4d78cf_0%,#2f5ebf_100%)] shadow-[0_14px_26px_rgba(47,94,191,0.3)]'
                                  : 'w-full max-w-[44px] rounded-t-[10px] bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.24)_100%)]'
                              }
                              style={{ height: barHeight }}
                            />
                          </div>
                          <p className="text-center font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-slate-300/85">
                            {item.shortLabel}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  {totalTrackedVolume === 0 && (
                    <p className="mt-4 ml-8 text-sm text-slate-300/78">
                      Preview bars are shown until live activity data becomes available.
                    </p>
                  )}
                </div>
              </div>

              <div className="h-full">
                <div className="flex h-full flex-col rounded-[24px] border border-border bg-white p-4 shadow-[var(--shadow-soft)]">
                  <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-muted">
                    Performance notes
                  </p>

                  <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
                    <div className="rounded-2xl border border-border bg-slate-50 px-4 py-3">
                      <p className="text-sm font-medium text-foreground">
                        Largest metric
                      </p>
                      <p className="mt-1 text-base font-semibold text-foreground">
                        {largestMetric.label}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        Current count: {largestMetric.value}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-slate-50 px-4 py-3">
                      <p className="text-sm font-medium text-foreground">
                        Review queue
                      </p>
                      <p className="mt-1 text-base font-semibold text-foreground">
                        {unpublishedProducts} items pending
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        Products waiting to move from draft to live.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-slate-50 px-4 py-3">
                      <p className="text-sm font-medium text-foreground">
                        Audience signal
                      </p>
                      <p className="mt-1 text-base font-semibold text-foreground">
                        {stats.newsletterSubscribers} subscribers
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        Active newsletter reach within the current admin scope.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Series legend
                </p>
                <h4 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                  Chart breakdown
                </h4>
              </div>
              <span className="rounded-full border border-border bg-slate-50 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted">
                {chartData.length} series
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {chartData.map((item) => {
                const width =
                  item.value === 0
                    ? '8%'
                    : `${Math.max((item.value / chartMax) * 100, 12)}%`

                return (
                  <div key={item.label} className="rounded-[18px] border border-border bg-white px-4 py-4 shadow-[var(--shadow-soft)]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${item.tone}`} />
                          <p className="text-sm font-medium text-foreground">
                            {item.label}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-muted">
                          {item.value === 0
                            ? 'No records currently visible'
                            : `${Math.round((item.value / chartMax) * 100)}% of the chart peak`}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {item.value}
                      </span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                        style={{ width }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_340px]">
          <div className="panel p-6 sm:p-7">
            <div className="eyebrow">
              <SparkIcon className="h-3.5 w-3.5" />
              Operations snapshot
            </div>

            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="flex min-h-full flex-col">
                <div>
                  <h3 className="admin-page-title max-w-3xl text-slate-950">
                    Manage the AgriAce catalog from one focused control room.
                  </h3>
                  <p className="admin-page-copy mt-4 max-w-2xl text-slate-600">
                    Publishing, product quality, and catalog coverage are surfaced first so the team can move faster without noise.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/products/new" className="button-primary">
                      Add product
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                    <Link href="/products" className="button-secondary">
                      Review catalog
                    </Link>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <div className="rounded-[18px] border border-border bg-[var(--primary-soft)] px-4 py-4">
                    <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
                      Catalog coverage
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {stats.totalProducts} products across {stats.totalCategories} categories
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-border bg-[var(--primary-soft)] px-4 py-4">
                    <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
                      Lead activity
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {stats.newLeads} fresh inquiries waiting for follow-up
                    </p>
                  </div>
                  <div className="rounded-[18px] border border-border bg-[var(--primary-soft)] px-4 py-4">
                    <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
                      Audience
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {stats.newsletterSubscribers} active newsletter subscribers
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-[#3155a4] bg-[linear-gradient(180deg,#1f3d7a_0%,#0f172a_100%)] p-5 text-white shadow-[0_20px_40px_rgba(2,6,23,0.24)]">
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-200/90">
                  Publishing health
                </p>
                <p className="mt-4 text-[3rem] font-bold tracking-[-0.04em]">
                  {stats.publishedProducts}
                </p>
                <p className="mt-1 text-sm text-slate-200/80">Live products</p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-200/75">Pending review</span>
                      <span className="font-bold text-white">{unpublishedProducts}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-200/75">Database</span>
                      <span className="font-bold text-white">
                        {stats.dbConnected ? 'Connected' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                  System status
                </p>
                <h3 className="admin-page-title mt-2 text-foreground">
                  Critical checks
                </h3>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-primary">
                <CheckCircleIcon className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="soft-card px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Product publishing
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {unpublishedProducts > 0
                        ? `${unpublishedProducts} products still need review`
                        : 'No products are waiting for review'}
                    </p>
                  </div>
                  <span
                    className="status-badge"
                    data-tone={unpublishedProducts > 0 ? 'warning' : 'success'}
                  >
                    {unpublishedProducts > 0 ? 'Review' : 'Healthy'}
                  </span>
                </div>
              </div>

              <div className="soft-card px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Data source
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {stats.dbConnected
                        ? 'Live database metrics available'
                        : 'Fallback mode is active'}
                    </p>
                  </div>
                  <span
                    className="status-badge"
                    data-tone={stats.dbConnected ? 'success' : 'danger'}
                  >
                    {stats.dbConnected ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="soft-card px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Catalog focus
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Keep product records complete before expanding admin modules.
                    </p>
                  </div>
                  <span className="status-badge" data-tone="neutral">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => (
            <div key={card.title} className="metric-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted">{card.title}</p>
                  <p className="mt-3 text-[2.7rem] font-bold tracking-[-0.04em] text-foreground">
                    {card.value}
                  </p>
                  <p className="mt-2 text-sm text-muted">{card.subtitle}</p>
                </div>
                <span className="icon-chip h-12 w-12 rounded-2xl">
                  <card.icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="panel p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Quick actions
                </p>
                <h3 className="admin-page-title mt-2 text-foreground">
                  What should happen next
                </h3>
              </div>
              <Link href="/products" className="action-link">
                Open product workspace
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link
                href="/products/new"
                className="soft-card group p-5 hover:border-[var(--primary-soft)]"
              >
                <span className="icon-chip h-11 w-11 rounded-2xl">
                  <ProductsIcon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 text-lg font-semibold text-foreground">
                  Add new product
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Create a new fertilizer entry with publish controls and pricing.
                </p>
                <div className="action-link mt-5">
                  Start now
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>

              <Link
                href="/products"
                className="soft-card group p-5 hover:border-[var(--primary-soft)]"
              >
                <span className="icon-chip h-11 w-11 rounded-2xl">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 text-lg font-semibold text-foreground">
                  Review drafts
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Check unpublished products and move ready items into the live catalog.
                </p>
                <div className="action-link mt-5">
                  Review now
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>

              <div className="soft-card p-5">
                <span className="icon-chip h-11 w-11 rounded-2xl">
                  <LeadsIcon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 text-lg font-semibold text-foreground">
                  Prepare lead pipeline
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Keep this area ready for the next phase when lead tools are connected.
                </p>
                <div className="mt-5 text-sm font-semibold text-muted">
                  Coming next
                </div>
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
              Snapshot
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-[18px] border border-border bg-[var(--primary-soft)] px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-primary">
                    <ProductsIcon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Catalog inventory
                    </p>
                    <p className="text-sm text-muted">
                      {stats.totalProducts} total products
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-border bg-[var(--primary-soft)] px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--secondary-soft)] text-[var(--secondary)]">
                    <DatabaseIcon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Data status
                    </p>
                    <p className="text-sm text-muted">
                      {stats.dbConnected ? 'Connected to PostgreSQL' : 'Awaiting setup'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] border border-border bg-[var(--primary-soft)] px-4 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <UsersIcon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Team access
                    </p>
                    <p className="text-sm text-muted">
                      {stats.totalUsers} registered users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
