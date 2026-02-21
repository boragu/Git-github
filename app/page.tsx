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
import { Sparkles } from "lucide-react";
import type { AgentResult, TripInput } from "@/lib/agent/types";

export default function Page() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [agentData, setAgentData] = useState<AgentResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (form: TripInput) => {
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "생성 실패");
      setAgentData(json);
      setShowPlan(true);
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onMobileMenuToggle={() => {}} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold tracking-tight">
              Voyager AI Planner
            </h1>
            {errorMsg && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {errorMsg}
              </div>
            )}
            <TripInputForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
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
