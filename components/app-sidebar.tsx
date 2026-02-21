"use client"

import { useState } from "react"
import {
  Plane,
  Map,
  Wallet,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Plane, label: "Plan Trip", active: true },
  { icon: Map, label: "My Itineraries", active: false },
  { icon: Wallet, label: "Budget Planner", active: false },
  { icon: CheckSquare, label: "Packing Checklist", active: false },
]

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help & Support" },
]

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-primary">
          <Sparkles className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-heading text-sm font-bold text-sidebar-accent-foreground tracking-tight">
              Voyager AI
            </span>
            <span className="text-[11px] text-sidebar-foreground/60">Smart Travel Planner</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        <span className={cn("text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-semibold mb-2", collapsed ? "px-1 text-center" : "px-2")}>
          {collapsed ? "Nav" : "Navigation"}
        </span>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1 px-3 py-3 border-t border-sidebar-border">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Collapse toggle */}
      <div className="px-3 py-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full rounded-lg py-2 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  )
}
