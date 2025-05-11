"use client"

// This file is deprecated, please use components/ui/dashboard-shell.tsx instead
// Will be removed in future updates

import { DashboardShell } from "@/components/ui/dashboard-shell"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell>{children}</DashboardShell>
  )
}

