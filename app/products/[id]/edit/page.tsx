import type { Product, ProductCategory } from '@prisma/client'
import { notFound } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { prisma } from '@/lib/prisma'
import ProductForm from '../../ProductForm'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let product: Product | null = null
  let categories: ProductCategory[] = []

  try {
    ;[product, categories] = await Promise.all([
      prisma.product.findUnique({
        where: { id },
      }),
      prisma.productCategory.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
      }),
    ])
  } catch {
  }

  if (!product) {
    notFound()
  }

  return (
    <AdminLayout title={`Edit: ${product.name}`}>
      <ProductForm product={product} categories={categories} />
    </AdminLayout>
  )
}
