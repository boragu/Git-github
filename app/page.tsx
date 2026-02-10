"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { TripInputForm } from "@/components/trip-input-form";
import { ItinerarySection } from "@/components/itinerary-section";
import { BudgetSection } from "@/components/budget-section";
import { HighlightsSection } from "@/components/highlights-section";
import { PackingChecklist } from "@/components/packing-checklist";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Map,
  Wallet,
  CheckSquare,
  Sparkles,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentResult, TripInput } from "@/lib/agent/types";

const mobileNavItems = [
  { icon: Plane, label: "Plan Trip", active: true },
  { icon: Map, label: "My Itineraries", active: false },
  { icon: Wallet, label: "Budget Planner", active: false },
  { icon: CheckSquare, label: "Packing Checklist", active: false },
];

export default function Page() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AI result
  const [agentData, setAgentData] = useState<AgentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Call AI
  const handleGenerate = async (form: TripInput) => {
    setIsGenerating(true);
    setShowPlan(false);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed to generate plan");

      setAgentData(json);
      setShowPlan(true);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Unknown error");
      setAgentData(null);
      setShowPlan(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <AppSidebar />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileMenuOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
          />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-sidebar text-sidebar-foreground flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary">
                  <Sparkles className="w-4 h-4 text-sidebar-primary-foreground" />
                </div>
                <span className="font-heading text-sm font-bold text-sidebar-accent-foreground">
                  Voyager AI
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-sidebar-accent transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-sidebar-foreground" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-semibold px-2 mb-2 block">
                Navigation
              </span>
              {mobileNavItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="px-3 py-3 border-t border-sidebar-border space-y-1">
              <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                <Settings className="w-[18px] h-[18px]" />
                <span>Settings</span>
              </button>
              <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
                <HelpCircle className="w-[18px] h-[18px]" />
                <span>Help & Support</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onMobileMenuToggle={() => setMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-6">
            {/* Page title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h1 className="font-heading text-xl font-bold text-foreground tracking-tight">
                  Trip Planner
                </h1>
                <p className="text-sm text-muted-foreground">
                  Plan your perfect trip with AI-powered recommendations
                </p>
              </div>

              {showPlan && (
                <Badge className="self-start sm:self-auto gap-1.5 bg-accent text-accent-foreground border-0 text-xs font-semibold px-3 py-1">
                  <Sparkles className="w-3 h-3" />
                  Plan Generated
                </Badge>
              )}
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
                <b className="text-destructive">생성 실패:</b> {errorMsg}
              </div>
            )}

            {/* Trip Input */}
            <TripInputForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ItinerarySection
                  isGenerating={isGenerating}
                  showPlan={showPlan}
                  data={agentData}
                />
                <HighlightsSection
                  isGenerating={isGenerating}
                  showPlan={showPlan}
                  data={agentData}
                />
              </div>

              <div className="space-y-6">
                <BudgetSection
                  isGenerating={isGenerating}
                  showPlan={showPlan}
                  data={agentData}
                />
                <PackingChecklist
                  isGenerating={isGenerating}
                  showPlan={showPlan}
                  data={agentData}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
