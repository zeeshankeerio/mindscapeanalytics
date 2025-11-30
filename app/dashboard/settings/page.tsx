"use client"

import { useState } from "react"
import {
  Settings,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SettingSection } from "@/types"
import { settingSections } from "@/lib/mock-data"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    monthly: true,
    security: true,
  })

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
  return (
          <div className="space-y-6">
                <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                defaultValue="John Doe"
                className="bg-white/5 border-white/10"
              />
                </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                defaultValue="john@example.com"
                className="bg-white/5 border-white/10"
              />
              </div>
              <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="cet">Central European Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
                  </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-white/70">
                  Receive email updates about your account
                </p>
                </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, email: checked })
                }
              />
                  </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-white/70">
                  Receive push notifications in your browser
                </p>
                  </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, push: checked })
                }
              />
                </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Monthly Reports</Label>
                <p className="text-sm text-white/70">
                  Get monthly summary of your usage
                </p>
              </div>
              <Switch
                checked={notifications.monthly}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, monthly: checked })
                }
              />
            </div>
              <Separator className="bg-white/10" />
                <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Security Alerts</Label>
                <p className="text-sm text-white/70">
                  Get notified about security events
                </p>
              </div>
              <Switch
                checked={notifications.security}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, security: checked })
                }
              />
                    </div>
                  </div>
        )

      case "api":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                    <div>
                  <h3 className="font-medium">Production API Key</h3>
                  <p className="text-sm text-white/70">
                    Use this key for production environments
                  </p>
                </div>
                <Button variant="outline" className="border-white/10">
                  Generate New Key
                </Button>
              </div>
              <Input
                readOnly
                value="sk_prod_2023_XXXXXXXXXXXXXXXXXXXX"
                className="font-mono bg-white/5 border-white/10"
              />
              </div>
              <Separator className="bg-white/10" />
              <div className="space-y-4">
              <div className="flex items-center justify-between">
                      <div>
                  <h3 className="font-medium">Development API Key</h3>
                  <p className="text-sm text-white/70">
                    Use this key for testing and development
                  </p>
                </div>
                <Button variant="outline" className="border-white/10">
                  Generate New Key
                </Button>
              </div>
                    <Input
                      readOnly
                value="sk_dev_2023_XXXXXXXXXXXXXXXXXXXX"
                className="font-mono bg-white/5 border-white/10"
                    />
                  </div>
                </div>
        )

      case "storage":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Storage Provider</Label>
              <Select defaultValue="aws">
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="aws">Amazon S3</SelectItem>
                  <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                  <SelectItem value="azure">Azure Blob Storage</SelectItem>
                </SelectContent>
              </Select>
              </div>
                  <div className="space-y-2">
              <Label>Region</Label>
              <Select defaultValue="us-east">
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="us-east">US East</SelectItem>
                  <SelectItem value="us-west">US West</SelectItem>
                  <SelectItem value="eu-central">EU Central</SelectItem>
                  <SelectItem value="ap-south">Asia Pacific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
              <Label>Retention Period</Label>
              <Select defaultValue="30">
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/10">
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-[400px] text-white/70">
            <p>Select a section from the sidebar</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-white/70">Manage your account and preferences</p>
              </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        {/* Settings Navigation */}
        <Card className="bg-black/40 border-white/10 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="h-4 w-4" />
                    <span>{section.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </button>
              ))}
            </nav>
            </CardContent>
        </Card>

        {/* Settings Content */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle>
              {settingSections.find((s) => s.id === activeSection)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
          </Card>
      </div>
    </div>
  )
}

