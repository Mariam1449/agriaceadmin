import Link from 'next/link'
import type { Prisma } from '@prisma/client'
import AdminLayout from '@/components/AdminLayout'
import {
  ArrowRightIcon,
  ClockIcon,
  PlusIcon,
  ProductsIcon,
  SparkIcon,
  StarIcon,
} from '@/components/AdminIcons'
import { prisma } from '@/lib/prisma'
import DeleteProductButton from './DeleteProductButton'

type ProductRow = Prisma.ProductGetPayload<{
  include: {
    category: true
  }
}>

export default async function ProductsPage() {
  let products: ProductRow[] = []
  let dbError = false

  try {
    products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch {
    dbError = true
  }

  const publishedCount = products.filter(
    (product) => product.status === 'PUBLISHED'
  ).length
  const draftCount = products.filter((product) => product.status === 'DRAFT').length
  const featuredCount = products.filter((product) => product.isFeatured).length

  return (
    <AdminLayout title="Products">
      <div className="space-y-6">
        {dbError && (
          <div className="panel border-[rgba(176,74,58,0.18)] bg-[linear-gradient(180deg,rgba(255,247,245,0.98),rgba(253,240,238,0.92))] p-5">
            <div className="flex items-start gap-3">
              <span className="icon-chip h-12 w-12 rounded-2xl bg-[rgba(176,74,58,0.12)] text-[var(--danger)]">
                <ClockIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--danger)]">
                  Database connection error
                </h3>
                <p className="mt-1 text-sm leading-6 text-[var(--danger)]">
                  The layout is available, but product data will remain empty until PostgreSQL is configured.
                </p>
              </div>
            </div>
          </div>
        )}

        <section className="overflow-hidden rounded-[28px] border border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[var(--shadow-panel),inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-8">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[var(--primary-soft)] px-4 py-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--primary)] shadow-[var(--shadow-soft)]">
                <ProductsIcon className="h-3.5 w-3.5" />
                Product management
              </div>
              <h3 className="admin-page-title mt-5 text-foreground">
                Professional catalog control without the clutter.
              </h3>
              <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-muted">
                Review pricing, publication status, and product quality from one place, then move directly into edits.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-[#3155a4] bg-[linear-gradient(180deg,#243f77_0%,#17233f_100%)] p-5 shadow-[0_20px_40px_rgba(2,6,23,0.2)]">
                <p className="text-sm font-medium text-[#c7d6f5]">Published</p>
                <p className="mt-3 text-[2.5rem] font-bold tracking-[-0.04em] text-white">
                  {publishedCount}
                </p>
              </div>
              <div className="rounded-[24px] border border-[#3155a4] bg-[linear-gradient(180deg,#243f77_0%,#17233f_100%)] p-5 shadow-[0_20px_40px_rgba(2,6,23,0.2)]">
                <p className="text-sm font-medium text-[#c7d6f5]">Drafts</p>
                <p className="mt-3 text-[2.5rem] font-bold tracking-[-0.04em] text-white">
                  {draftCount}
                </p>
              </div>
              <div className="rounded-[24px] border border-[#3155a4] bg-[linear-gradient(180deg,#243f77_0%,#17233f_100%)] p-5 shadow-[0_20px_40px_rgba(2,6,23,0.2)]">
                <p className="text-sm font-medium text-[#c7d6f5]">Featured</p>
                <p className="mt-3 text-[2.5rem] font-bold tracking-[-0.04em] text-white">
                  {featuredCount}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-6 text-muted">
            {products.length > 0
              ? `${products.length} products in the catalog`
              : 'Start building the AgriAce product catalog'}
          </p>
          <Link href="/products/new" className="button-primary button-admin-primary">
            <PlusIcon className="h-4 w-4" />
            Add product
          </Link>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-border bg-white shadow-[var(--shadow-panel),inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="flex items-center justify-between gap-4 border-b border-border/80 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-6 py-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Catalog list</h3>
              <p className="mt-1 text-sm text-muted">
                Open a product to adjust content, pricing, or publication status.
              </p>
            </div>
            <div className="hidden rounded-full border border-border bg-white px-3.5 py-2 text-sm font-medium text-muted shadow-sm sm:flex">
              Sorted by newest first
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead>
                <tr>
                  <th className="bg-[linear-gradient(180deg,#f1f5f9_0%,#e9eef5_100%)] border-b border-border/60 px-6 py-4 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Product
                  </th>
                  <th className="bg-[linear-gradient(180deg,#f1f5f9_0%,#e9eef5_100%)] border-b border-border/60 px-6 py-4 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Category
                  </th>
                  <th className="bg-[linear-gradient(180deg,#f1f5f9_0%,#e9eef5_100%)] border-b border-border/60 px-6 py-4 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    SKU
                  </th>
                  <th className="bg-[linear-gradient(180deg,#f1f5f9_0%,#e9eef5_100%)] border-b border-border/60 px-6 py-4 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Price (PKR)
                  </th>
                  <th className="bg-[linear-gradient(180deg,#f1f5f9_0%,#e9eef5_100%)] border-b border-border/60 px-6 py-4 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Status
                  </th>
                  <th className="bg-[linear-gradient(180deg,#f1f5f9_0%,#e9eef5_100%)] border-b border-border/60 px-6 py-4 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <div className="mx-auto max-w-md">
                        <span className="icon-chip mx-auto flex h-16 w-16 rounded-2xl">
                          <SparkIcon className="h-7 w-7" />
                        </span>
                        <p className="mt-6 text-xl font-bold text-foreground">
                          No products yet
                        </p>
                        <p className="mt-2.5 text-sm leading-6 text-muted">
                          Create the first catalog item to give the admin panel real data to work with.
                        </p>
                        <Link
                          href="/products/new"
                          className="button-primary button-admin-primary mt-7"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Create first product
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="group bg-white transition-all duration-200 hover:bg-[linear-gradient(180deg,#f8fbff_0%,#f2f6fb_100%)] hover:shadow-[inset_0_0_0_1px_rgba(37,99,235,0.08)]"
                    >
                      <td className="px-6 py-5 align-top">
                        <div className="flex items-start gap-4">
                          <span className="icon-chip h-12 w-12 shrink-0 rounded-2xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_8px_16px_rgba(37,99,235,0.12)]">
                            <ProductsIcon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                                {product.name}
                              </div>
                              {product.isFeatured && (
                                <span className="status-badge" data-tone="warning">
                                  <StarIcon className="mr-1 h-3 w-3" />
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="mt-1.5 max-w-xl text-sm leading-6 text-muted">
                              {product.shortDescription.length > 96
                                ? `${product.shortDescription.slice(0, 96)}...`
                                : product.shortDescription}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-foreground">
                        {product.category?.name || (
                          <span className="text-muted">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-5 font-mono text-sm text-muted">
                        {product.sku || (
                          <span className="text-muted/60">Not set</span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-foreground">
                        {product.pricePkr
                          ? `PKR ${Number(product.pricePkr).toLocaleString('en-PK')}`
                          : (
                            <span className="font-medium text-muted">Pending</span>
                          )}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className="status-badge"
                          data-tone={
                            product.status === 'PUBLISHED'
                              ? 'success'
                              : product.status === 'DRAFT'
                                ? 'warning'
                                : 'neutral'
                          }
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/products/${product.id}/edit`}
                            className="action-link"
                          >
                            Edit
                            <ArrowRightIcon className="h-4 w-4" />
                          </Link>
                          <DeleteProductButton
                            id={product.id}
                            name={product.name}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
