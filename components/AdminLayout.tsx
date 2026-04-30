import AdminShell from './AdminShell'

export default function AdminLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return <AdminShell title={title}>{children}</AdminShell>
}
