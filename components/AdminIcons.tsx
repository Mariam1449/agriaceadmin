import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function BaseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

export function DashboardIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 13h7V4H4z" />
      <path d="M13 20h7v-9h-7z" />
      <path d="M13 11h7V4h-7z" />
      <path d="M4 20h7v-5H4z" />
    </BaseIcon>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M10 20v-5h4v5" />
    </BaseIcon>
  )
}

export function ProductsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 20h10" />
      <path d="M12 20V7" />
      <path d="M18 11c0-3.3-2.7-6-6-6S6 7.7 6 11c0 3 2.2 5.6 5.2 6" />
      <path d="M8 11c1.7 0 3-1.3 4-4 1 2.7 2.3 4 4 4" />
    </BaseIcon>
  )
}

export function CategoriesIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 7.5 12 3l9 4.5-9 4.5z" />
      <path d="M3 12.5 12 17l9-4.5" />
      <path d="M3 17.5 12 22l9-4.5" />
    </BaseIcon>
  )
}

export function FormIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </BaseIcon>
  )
}

export function ElementsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </BaseIcon>
  )
}

export function TableIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M8 5v14" />
      <path d="M16 5v14" />
    </BaseIcon>
  )
}

export function ChartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19h16" />
      <path d="M7 16V9" />
      <path d="M12 16V5" />
      <path d="M17 16v-6" />
    </BaseIcon>
  )
}

export function LayoutIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9 4v16" />
      <path d="M9 9h12" />
    </BaseIcon>
  )
}

export function LeadsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m5 7 7 6 7-6" />
    </BaseIcon>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 21v-1.5A3.5 3.5 0 0 0 12.5 16H7.5A3.5 3.5 0 0 0 4 19.5V21" />
      <circle cx="10" cy="9" r="3" />
      <path d="M20 21v-1.5A3.5 3.5 0 0 0 17.5 16.2" />
      <path d="M15 6.5a3 3 0 0 1 0 5.9" />
    </BaseIcon>
  )
}

export function PagesIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 4h10l3 3v13H7z" />
      <path d="M17 4v3h3" />
      <path d="M10 12h7" />
      <path d="M10 16h5" />
    </BaseIcon>
  )
}

export function NewsletterIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h6" />
    </BaseIcon>
  )
}

export function ExtraIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5" />
      <path d="M12 18.5V21" />
      <path d="m4.9 4.9 1.8 1.8" />
      <path d="m17.3 17.3 1.8 1.8" />
      <path d="M3 12h2.5" />
      <path d="M18.5 12H21" />
      <path d="m4.9 19.1 1.8-1.8" />
      <path d="m17.3 6.7 1.8-1.8" />
    </BaseIcon>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z" />
    </BaseIcon>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </BaseIcon>
  )
}

export function BellIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 16.5h12l-1.3-1.8a4.5 4.5 0 0 1-.8-2.6V10a4 4 0 1 0-8 0v2.1a4.5 4.5 0 0 1-.8 2.6Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </BaseIcon>
  )
}

export function MessageIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
    </BaseIcon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </BaseIcon>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M3 10h18" />
    </BaseIcon>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </BaseIcon>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </BaseIcon>
  )
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 5h5v5" />
      <path d="m10 14 9-9" />
      <path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </BaseIcon>
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </BaseIcon>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
    </BaseIcon>
  )
}

export function DatabaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </BaseIcon>
  )
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.3 2.3 4.7-4.8" />
    </BaseIcon>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  )
}

export function AlertIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 4 3.5 19h17L12 4Z" />
      <path d="M12 9v4" />
      <path d="M12 16h.01" />
    </BaseIcon>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.3 1.1 6.1L12 17l-5.6 3 1.1-6.1L3 9.6l6.2-.9Z" />
    </BaseIcon>
  )
}
