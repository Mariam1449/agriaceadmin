'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ProductsIcon,
  SparkIcon,
} from '@/components/AdminIcons'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (email === 'admin@agriace.com' && password === 'admin123') {
      router.push('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.12),transparent_26%)]" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/40 bg-white/60 shadow-[0_28px_90px_rgba(2,6,23,0.14)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-[linear-gradient(180deg,#111827_0%,#0a0f1a_100%)] px-8 py-10 text-white sm:px-10 sm:py-12">
          <div className="eyebrow border-white/12 bg-white/10 text-slate-100">
            AgriAce Admin
          </div>
          <h1 className="admin-page-title mt-6 max-w-md text-white">
            A sharper control room for your product team.
          </h1>
          <p className="admin-page-copy mt-5 max-w-md text-slate-200/76">
            Sign in to manage the fertilizer catalog, stage new products, and keep publishing standards consistent.
          </p>

          <div className="mt-10 space-y-4">
            <div className="panel-muted flex items-start gap-3 p-4">
              <span className="icon-chip h-11 w-11 rounded-2xl border-white/10 bg-white/10 text-white">
                <ProductsIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Catalog first</p>
                <p className="mt-1 text-sm leading-6 text-slate-200/70">
                  Products, pricing, and publishing workflows are the current focus of this admin.
                </p>
              </div>
            </div>

            <div className="panel-muted flex items-start gap-3 p-4">
              <span className="icon-chip h-11 w-11 rounded-2xl border-white/10 bg-white/10 text-white">
                <CheckCircleIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-white">Demo access</p>
                <p className="mt-1 text-sm leading-6 text-slate-200/70">
                  Use the sample credentials on the right to step through the interface.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <div className="eyebrow">
                <SparkIcon className="h-3.5 w-3.5" />
                Secure sign in
              </div>
              <h2 className="admin-section-title mt-5 text-foreground">
                Welcome back
              </h2>
              <p className="admin-section-copy mt-2">
                Use the demo account below to access the admin panel.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-[20px] border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="field-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="admin@agriace.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="field-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="button-primary w-full">
                Sign in
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-[24px] border border-border/80 bg-white/75 p-5">
              <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted">
                Demo credentials
              </p>
              <p className="mt-3 text-sm text-foreground">
                Email: <span className="font-semibold">admin@agriace.com</span>
              </p>
              <p className="mt-1 text-sm text-foreground">
                Password: <span className="font-semibold">admin123</span>
              </p>
            </div>

            <div className="mt-6">
              <Link href="/" className="button-ghost">
                Browse dashboard preview
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
