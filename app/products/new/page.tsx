import type { ProductCategory } from '@prisma/client'
import AdminLayout from '@/components/AdminLayout'
import { prisma } from '@/lib/prisma'
import ProductForm from '../ProductForm'

export default async function NewProductPage() {
  let categories: ProductCategory[] = []

  try {
    categories = await prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
  } catch {
  }

  return (
    <AdminLayout title="Add New Product">
      <ProductForm categories={categories} />
    </AdminLayout>
  )
}
