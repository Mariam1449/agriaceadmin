'use client'

import { useRouter } from 'next/navigation'
import { deleteProduct } from './actions'

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    try {
      await deleteProduct(id)
      router.refresh()
    } catch {
      alert('Failed to delete product')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="danger-link"
    >
      Delete
    </button>
  )
}
