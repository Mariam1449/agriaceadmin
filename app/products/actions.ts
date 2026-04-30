'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const categoryId = formData.get('categoryId') as string
  const sku = formData.get('sku') as string
  const status = formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  const shortDescription = formData.get('shortDescription') as string
  const description = formData.get('description') as string
  const pricePkr = formData.get('pricePkr') as string
  const imageUrl = formData.get('imageUrl') as string
  const isFeatured = formData.get('isFeatured') === 'on'

  await prisma.product.create({
    data: {
      name,
      slug,
      categoryId: categoryId || null,
      sku: sku || null,
      status,
      shortDescription,
      description: description || null,
      pricePkr: pricePkr ? parseFloat(pricePkr) : null,
      imageUrl: imageUrl || null,
      isFeatured,
    },
  })

  revalidatePath('/products')
  redirect('/products')
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const categoryId = formData.get('categoryId') as string
  const sku = formData.get('sku') as string
  const status = formData.get('status') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  const shortDescription = formData.get('shortDescription') as string
  const description = formData.get('description') as string
  const pricePkr = formData.get('pricePkr') as string
  const imageUrl = formData.get('imageUrl') as string
  const isFeatured = formData.get('isFeatured') === 'on'

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      categoryId: categoryId || null,
      sku: sku || null,
      status,
      shortDescription,
      description: description || null,
      pricePkr: pricePkr ? parseFloat(pricePkr) : null,
      imageUrl: imageUrl || null,
      isFeatured,
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    },
  })

  revalidatePath('/products')
  redirect('/products')
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  })

  revalidatePath('/products')
}
