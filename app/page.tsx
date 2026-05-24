import AdminLayout from '@/components/AdminLayout'
import {
  AlertIcon,
  CalendarIcon,
  CategoriesIcon,
  LeadsIcon,
  ProductsIcon,
  SparkIcon,
  UsersIcon,
} from '@/components/AdminIcons'
import { prisma } from '@/lib/prisma'

function buildAreaPath(values: number[]) {
  const width = 520
  const height = 240
  const baseY = height
  const chartHeight = 190
  const step = width / (values.length - 1)

  const points = values.map((value, index) => {
    const x = Math.round(index * step)
    const y = Math.round(baseY - (value / 100) * chartHeight - 12)

    return `${x},${y}`
  })

  return `M 0 ${baseY} L ${points.join(' L ')} L ${width} ${baseY} Z`
}

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
      label: 'Total Products',
      value: stats.totalProducts,
      note: `${stats.publishedProducts} Live`,
      tone: 'text-[var(--success)]',
      icon: ProductsIcon,
    },
    {
      label: 'Published',
      value: stats.publishedProducts,
      note: `${publishRate}% Coverage`,
      tone: 'text-[var(--success)]',
      icon: SparkIcon,
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      note: 'Catalog Groups',
      tone: 'text-slate-500',
      icon: CategoriesIcon,
    },
    {
      label: 'Total Leads',
      value: stats.totalLeads,
      note: `${stats.newLeads} New`,
      tone: stats.newLeads > 0 ? 'text-[var(--warning)]' : 'text-[var(--success)]',
      icon: LeadsIcon,
    },
    {
      label: 'Total Users',
      value: stats.totalUsers,
      note: 'Registered',
      tone: 'text-[var(--success)]',
      icon: UsersIcon,
    },
    {
      label: 'Subscribers',
      value: stats.newsletterSubscribers,
      note: 'Active Reach',
      tone: 'text-[var(--success)]',
      icon: SparkIcon,
    },
  ]

  const chartInputs = [
    stats.totalProducts,
    stats.publishedProducts,
    stats.totalCategories,
    stats.totalLeads,
    stats.totalUsers,
    stats.newsletterSubscribers,
    Math.max(stats.newLeads, 1),
  ]
  const chartPeak = Math.max(...chartInputs, 1)
  const normalizeSeries = (values: number[], fallback: number[]) =>
    chartInputs.every((value) => value === 0)
      ? fallback
      : values.map((value) =>
          Math.max(16, Math.min(96, Math.round((value / chartPeak) * 100)))
        )

  const primarySeries = normalizeSeries(
    [
      stats.totalProducts,
      stats.totalCategories,
      stats.totalLeads,
      stats.publishedProducts,
      stats.totalUsers,
      stats.newsletterSubscribers,
      stats.newLeads,
    ],
    [54, 20, 46, 92, 58, 18, 10]
  )
  const secondarySeries = normalizeSeries(
    [
      stats.publishedProducts,
      stats.totalUsers,
      stats.totalCategories,
      stats.totalProducts,
      stats.newLeads,
      stats.totalLeads,
      stats.newsletterSubscribers,
    ],
    [28, 64, 16, 34, 88, 24, 12]
  )
  const tertiarySeries = normalizeSeries(
    [
      stats.totalLeads,
      stats.totalProducts,
      stats.newsletterSubscribers,
      stats.totalCategories,
      stats.publishedProducts,
      stats.totalUsers,
      stats.newLeads,
    ],
    [76, 42, 68, 10, 36, 72, 14]
  )

  const chartAreas = [
    {
      key: 'series-a',
      path: buildAreaPath(primarySeries),
      className: 'fill-[rgba(37,99,235,0.28)]',
    },
    {
      key: 'series-b',
      path: buildAreaPath(secondarySeries),
      className: 'fill-[rgba(15,118,110,0.22)]',
    },
    {
      key: 'series-c',
      path: buildAreaPath(tertiarySeries),
      className: 'fill-[rgba(51,65,85,0.18)]',
    },
  ]

  const performanceRows = [
    {
      label: 'Catalog Coverage',
      value: publishRate,
      width: `${Math.max(publishRate, 12)}%`,
    },
    {
      label: 'Lead Response Queue',
      value:
        stats.totalLeads > 0
          ? Math.round((stats.newLeads / stats.totalLeads) * 100)
          : 18,
      width: `${
        Math.max(
          stats.totalLeads > 0
            ? Math.round((stats.newLeads / stats.totalLeads) * 100)
            : 18,
          12
        )
      }%`,
    },
    {
      label: 'User Activity',
      value:
        stats.totalUsers > 0
          ? Math.min(
              100,
              Math.round(
                (stats.newsletterSubscribers / Math.max(stats.totalUsers, 1)) *
                  100
              )
            )
          : 22,
      width: `${
        Math.max(
          stats.totalUsers > 0
            ? Math.min(
                100,
                Math.round(
                  (stats.newsletterSubscribers /
                    Math.max(stats.totalUsers, 1)) *
                    100
                )
              )
            : 22,
          12
        )
      }%`,
    },
    {
      label: 'Pending Review',
      value:
        stats.totalProducts > 0
          ? Math.round((unpublishedProducts / stats.totalProducts) * 100)
          : 12,
      width: `${
        Math.max(
          stats.totalProducts > 0
            ? Math.round((unpublishedProducts / stats.totalProducts) * 100)
            : 12,
          12
        )
      }%`,
    },
  ]

  const versionRows = [
    { label: 'Published Products', value: stats.publishedProducts },
    { label: 'Draft Queue', value: unpublishedProducts },
    { label: 'New Leads', value: stats.newLeads },
    { label: 'Users', value: stats.totalUsers },
    { label: 'Subscribers', value: stats.newsletterSubscribers },
  ]
  const versionPeak = Math.max(...versionRows.map((row) => row.value), 1)

  const deviceRows = [
    { label: 'Desktop', value: 34, color: 'bg-[var(--primary)]' },
    { label: 'Mobile', value: 24, color: 'bg-[var(--success)]' },
    { label: 'Tablet', value: 16, color: 'bg-[var(--accent)]' },
    { label: 'API', value: 12, color: 'bg-slate-500' },
    { label: 'Other', value: 14, color: 'bg-slate-300' },
  ]
  const deviceGradient = `conic-gradient(
    var(--primary) 0deg 122deg,
    var(--success) 122deg 208deg,
    var(--accent) 208deg 266deg,
    #64748b 266deg 309deg,
    #cbd5e1 309deg 360deg
  )`

  const settingsRows = [
    'General settings',
    'Subscription alerts',
    'Auto renewal',
    'Achievements',
    'Logout',
  ]
  const profileCompletion = publishRate > 0 ? Math.min(100, publishRate) : 32

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-5">
        {!stats.dbConnected && (
          <div className="classic-panel border-[rgba(217,119,6,0.22)] bg-[linear-gradient(180deg,#fffdf8_0%,#f9f1e5_100%)] p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(217,119,6,0.12)] text-[var(--accent)]">
                <AlertIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[var(--accent)]">
                  Database not connected
                </h3>
                <p className="mt-1 text-sm text-[var(--warning)]">
                  Live dashboard totals are unavailable until PostgreSQL is configured.
                </p>
              </div>
            </div>
          </div>
        )}

        <section className="grid gap-px overflow-hidden rounded-[18px] border border-border bg-border shadow-[var(--shadow-soft)] lg:grid-cols-6">
          {statCards.map((card) => {
            const Icon = card.icon

            return (
              <div
                key={card.label}
                className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.76rem] font-semibold uppercase tracking-[0.04em] text-muted">
                      {card.label}
                    </p>
                    <p className="mt-1 text-[2rem] font-semibold leading-none tracking-[-0.04em] text-foreground">
                      {card.value.toLocaleString('en-US')}
                    </p>
                    <p className={`mt-2 text-[0.82rem] font-medium ${card.tone}`}>
                      {card.note}
                    </p>
                  </div>
                  <span className="mt-1 text-[var(--primary)]/35">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            )
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_310px]">
          <div className="panel p-0">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-4">
              <div>
                <h3 className="text-[1.95rem] font-light tracking-[-0.04em] text-foreground">
                  Network Activities
                </h3>
                <p className="text-sm text-muted">Graph title sub-title</p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-[var(--primary-soft)] px-3 py-2 text-sm text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <CalendarIcon className="h-4 w-4" />
                <span>April 10, 2019 - May 9, 2019</span>
              </div>
            </div>

            <div className="p-5">
              <div className="relative overflow-hidden rounded-[20px] border border-[#3155a4] bg-[linear-gradient(180deg,#1f3d7a_0%,#0f172a_100%)] shadow-[0_20px_40px_rgba(2,6,23,0.24)]">
                <div className="absolute inset-0">
                  <div className="flex h-full flex-col justify-between px-4 py-4">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="border-t border-[rgba(255,255,255,0.1)]"
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-9 pb-3 text-[0.72rem] text-slate-300/80">
                  {['Jan 01', 'Jan 02', 'Jan 03', 'Jan 04', 'Jan 05', 'Jan 06', 'Jan 07'].map(
                    (label) => (
                      <span key={label}>{label}</span>
                    )
                  )}
                </div>

                <div className="absolute left-4 top-4 bottom-12 flex flex-col justify-between text-[0.68rem] text-slate-300/80">
                  {['120', '90', '60', '30', '0'].map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>

                <div className="pl-12 pr-4 pt-4">
                  <svg
                    viewBox="0 0 520 240"
                    className="h-[320px] w-full"
                    preserveAspectRatio="none"
                    aria-label="Network activities chart"
                    role="img"
                  >
                    {chartAreas.map((area) => (
                      <path key={area.key} d={area.path} className={area.className} />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#3155a4] bg-[linear-gradient(180deg,#1f3d7a_0%,#0f172a_100%)] p-0 text-white shadow-[0_20px_40px_rgba(2,6,23,0.24)]">
            <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] px-5 py-4">
              <h3 className="text-[1.3rem] font-light text-white">
                Top Campaign Performance
              </h3>
            </div>

            <div className="space-y-5 px-5 py-5">
              {performanceRows.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-200/80">{row.label}</p>
                    <span className="text-sm font-semibold text-white">
                      {row.value}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#60a5fa_0%,#34d399_100%)]"
                      style={{ width: row.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <div className="classic-panel p-0">
            <div className="border-b border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-4">
              <h3 className="text-[1.3rem] font-light text-foreground">
                App Versions
              </h3>
            </div>

            <div className="space-y-4 px-5 py-5">
              {versionRows.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-semibold text-slate-600">
                      {row.value.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-[2px] bg-slate-100">
                    <div
                      className="h-full rounded-[2px] bg-[linear-gradient(90deg,var(--success)_0%,var(--primary)_100%)]"
                      style={{
                        width: `${
                          row.value === 0
                            ? 8
                            : Math.max(
                                12,
                                Math.round((row.value / versionPeak) * 100)
                              )
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="classic-panel p-0">
            <div className="border-b border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-4">
              <h3 className="text-[1.3rem] font-light text-foreground">
                Device Usage
              </h3>
            </div>

            <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center">
              <div className="flex justify-center">
                <div
                  className="relative h-36 w-36 rounded-full"
                  style={{ background: deviceGradient }}
                >
                  <div className="absolute inset-[24px] rounded-full bg-white" />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {deviceRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="flex items-center gap-2 text-slate-500">
                      <span className={`h-3 w-3 rounded-sm ${row.color}`} />
                      {row.label}
                    </span>
                    <span className="font-semibold text-slate-600">
                      {row.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="classic-panel p-0">
            <div className="border-b border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-5 py-4">
              <h3 className="text-[1.3rem] font-light text-foreground">
                Quick Settings
              </h3>
            </div>

            <div className="grid gap-5 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_140px]">
              <div className="space-y-3">
                {settingsRows.map((row) => (
                  <label
                    key={row}
                    className="flex items-center gap-3 text-sm text-slate-500"
                  >
                    <input type="checkbox" className="checkbox-field" defaultChecked />
                    <span>{row}</span>
                  </label>
                ))}
              </div>

              <div className="rounded-[3px] border border-border bg-white p-4">
                <div className="rounded-[3px] border border-[rgba(37,99,235,0.14)] bg-[var(--primary-soft)] px-3 py-2 text-center text-sm font-medium text-[var(--primary)]">
                  Profile Completion
                </div>
                <div className="mt-5 flex justify-center">
                  <div
                    className="relative h-24 w-24 rounded-full"
                    style={{
                      background: `conic-gradient(var(--success) 0deg ${
                        profileCompletion * 1.8
                      }deg, #e5e7eb ${profileCompletion * 1.8}deg 180deg, transparent 180deg 360deg)`,
                    }}
                  >
                    <div className="absolute inset-3 rounded-full bg-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{profileCompletion.toFixed(2)}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
