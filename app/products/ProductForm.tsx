'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { ProductStatus } from '@prisma/client'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ProductsIcon,
  SparkIcon,
} from '@/components/AdminIcons'
import { createProduct, updateProduct } from './actions'

type Product = {
  id: string
  name: string
  slug: string
  categoryId: string | null
  sku: string | null
  status: ProductStatus
  shortDescription: string
  description: string | null
  pricePkr: { toString(): string } | null
  imageUrl: string | null
  isFeatured: boolean
}

type Category = {
  id: string
  name: string
}

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product
  categories: Category[]
}) {
  const action = product
    ? updateProduct.bind(null, product.id)
    : createProduct
  const isEditing = Boolean(product)
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || '')

  return (
    <form action={action} className="space-y-6">
      <section className="panel overflow-hidden p-6 sm:p-8">
        <div className="space-y-6">
            <div>
              <div className="eyebrow">
                <SparkIcon className="h-3.5 w-3.5" />
                {isEditing ? 'Edit product' : 'New product'}
              </div>
              <h3 className="admin-page-title mt-5 text-foreground">
                {isEditing
                  ? 'Refine the product record'
                  : 'Create a polished product entry'}
              </h3>
              <p className="admin-page-copy mt-3 max-w-2xl">
                Fill in the core catalog fields now. Publishing status and featured placement can be adjusted at any time.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="field-label">
                  Product Name <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={product?.name}
                  className="input-field"
                  placeholder="AgriAce Growth Booster"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="field-label">
                  Slug <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  defaultValue={product?.slug}
                  className="input-field"
                  placeholder="agriace-growth-booster"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="categoryId" className="field-label">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  defaultValue={product?.categoryId || ''}
                  className="select-field"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="sku" className="field-label">
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  defaultValue={product?.sku || ''}
                  className="input-field"
                  placeholder="AGR-001"
                />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[26px] border border-border/80 bg-white/68 p-5">
                <div className="flex items-center gap-3">
                  <span className="icon-chip h-11 w-11 rounded-2xl">
                    <CheckCircleIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Publishing note
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Products marked as published receive a `publishedAt` timestamp automatically.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-border/80 bg-white/68 p-5">
                <div className="flex items-center gap-3">
                  <span className="icon-chip h-11 w-11 rounded-2xl">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Content quality
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      Keep the short description concise and use the long description for technical details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/80 bg-white/72 p-5 shadow-[var(--shadow-soft)]">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-start">
                <div className="space-y-3">
                  <div>
                    <label htmlFor="imageUrl" className="field-label">
                      Product Image
                    </label>
                    <p className="mt-1 text-sm text-muted">
                      Add the main product image URL used in admin previews and catalog cards.
                    </p>
                  </div>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={product?.imageUrl || ''}
                    className="input-field"
                    placeholder="https://images.example.com/product-photo.jpg"
                    onChange={(event) => setImagePreview(event.target.value)}
                  />
                  <div className="grid gap-3 rounded-[18px] border border-dashed border-border/90 bg-[linear-gradient(180deg,#fbfdff_0%,#f3f7fd_100%)] px-4 py-3 text-sm text-muted sm:grid-cols-2">
                    <p>
                      Use a landscape image so product cards and admin previews stay neatly framed.
                    </p>
                    <p>
                      Recommended: a public JPG, PNG, or WebP URL at 1200px wide or larger.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="field-label">Preview</p>
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] border border-border/80 bg-[linear-gradient(180deg,#f7f9fd_0%,#eef3fb_100%)]">
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 px-6 text-center text-muted">
                        <span className="icon-chip h-12 w-12 rounded-2xl">
                          <ProductsIcon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            No image selected
                          </p>
                          <p className="mt-1 text-xs leading-5 text-muted">
                            Paste an image URL to preview the product cover here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="shortDescription" className="field-label">
                Short Description <span className="text-[var(--danger)]">*</span>
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                required
                rows={3}
                defaultValue={product?.shortDescription}
                className="textarea-field"
                placeholder="Short commercial summary used across listing surfaces."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="field-label">
                Full Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                defaultValue={product?.description || ''}
                className="textarea-field"
                placeholder="Use this space for detailed product benefits, application notes, and key specifications."
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="pricePkr" className="field-label">
                  Price (PKR)
                </label>
                <input
                  type="number"
                  id="pricePkr"
                  name="pricePkr"
                  step="0.01"
                  defaultValue={product?.pricePkr?.toString() || ''}
                  className="input-field"
                  placeholder="2400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="field-label">
                  Status <span className="text-[var(--danger)]">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue={product?.status || 'DRAFT'}
                  className="select-field"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-[22px] border border-border/80 bg-white/65 px-4 py-4">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                defaultChecked={product?.isFeatured}
                className="checkbox-field mt-0.5"
              />
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Featured Product
                </span>
                <span className="block text-sm text-muted">
                  Highlight this item in the storefront and admin views.
                </span>
              </span>
            </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link href="/products" className="button-secondary">
          Cancel
        </Link>

        <button type="submit" className="button-primary">
          {isEditing ? 'Update product' : 'Create product'}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}
