"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  HelpCircle, 
  Database, 
  Search, 
  Bot, 
  BarChart3,
  BrainCircuit,
  MessageSquare,
  FolderKanban,
  Keyboard,
  Moon,
  Sun
} from "lucide-react"
import { useDashboard } from "@/providers/dashboard-context"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { toggleSidebar, theme, setTheme } = useDashboard()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard"))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/projects"))}
          >
            <FolderKanban className="mr-2 h-4 w-4" />
            <span>Projects</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/models"))}
          >
            <BrainCircuit className="mr-2 h-4 w-4" />
            <span>Models</span>
            <CommandShortcut>⌘M</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/datasets"))}
          >
            <Database className="mr-2 h-4 w-4" />
            <span>Datasets</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/analytics"))}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/chat"))}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Chat</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/assistant"))}
          >
            <Bot className="mr-2 h-4 w-4" />
            <span>Assistant</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/profile"))}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/dashboard/settings"))}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme("light"))}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Light Mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => setTheme("dark"))}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="General">
          <CommandItem onSelect={() => runCommand(() => toggleSidebar())}>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Toggle Sidebar</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open("/dashboard/help", "_blank"))}>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Documentation</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/auth/logout"))}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
} 