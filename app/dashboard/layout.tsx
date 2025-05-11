"use client"

import { Inter } from "next/font/google"
import { DashboardShell } from "../../components/ui/dashboard-shell"
import DashboardLayoutContent from "../../components/dashboard-layout-content"
import { DashboardProvider } from "../../providers/dashboard-context"

const inter = Inter({ subsets: ["latin"] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent inter={inter}>
        <DashboardShell maxWidth="full">
          {children}
        </DashboardShell>
      </DashboardLayoutContent>
    </DashboardProvider>
  )
}

