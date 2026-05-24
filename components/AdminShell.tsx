'use client'

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-background">
      <div
        className={`fixed inset-0 z-30 bg-[rgba(15,23,42,0.5)] backdrop-blur-sm transition lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header title={title} onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 px-4 pb-8 pt-4 sm:px-6 lg:px-7 lg:pb-10">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
