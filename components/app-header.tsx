"use client"

import { Bell, Search, Menu, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AppHeaderProps {
  onMobileMenuToggle: () => void
}

export function AppHeader({ onMobileMenuToggle }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-border bg-card">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuToggle}
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading text-sm font-bold text-foreground">Voyager AI</span>
        </div>

        {/* Search on desktop */}
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
          <Input
            placeholder="Search destinations, trips..."
            className="pl-9 w-[320px] h-9 bg-muted border-0 text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary border-0">
          <Sparkles className="w-3 h-3" />
          Pro Plan
        </Badge>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          <span className="sr-only">Notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </Button>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
