"use client";

import React, { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, Utensils, Bus, Ticket, ShieldCheck } from "lucide-react";
import type { AgentResult } from "@/lib/agent/types";

interface BudgetCategory {
  label: string;
  amount: number;
  percentage: number;
  color: string;
  icon: React.ElementType;
}

function BudgetSkeleton() {
  return (
    <div className="space-y-5">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

interface BudgetSectionProps {
  isGenerating: boolean;
  showPlan: boolean;
  data: AgentResult | null;
}

function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export function BudgetSection({
  isGenerating,
  showPlan,
  data,
}: BudgetSectionProps) {
  // ✅ budget가 진짜 있는지 체크
  const hasBudget =
    Boolean(data?.budget) &&
    typeof (data as any)?.budget?.estimatedTotal === "number" &&
    typeof (data as any)?.budget?.food === "number" &&
    typeof (data as any)?.budget?.transport === "number" &&
    typeof (data as any)?.budget?.activities === "number";

  const budget = data?.budget;

  const { categories, totalBudget, spent, remaining } = useMemo(() => {
    // ✅ 데이터 없으면 안전한 기본값
    if (!hasBudget || !budget) {
      return {
        categories: [] as BudgetCategory[],
        totalBudget: 0,
        spent: 0,
        remaining: 0,
      };
    }

    const total = Math.max(0, Math.round(budget.estimatedTotal));
    const foodR = clamp01(budget.food);
    const transportR = clamp01(budget.transport);
    const activitiesR = clamp01(budget.activities);

    // 합이 1을 넘으면 비율 normalize
    const sum = foodR + transportR + activitiesR;
    const norm = sum > 1 ? sum : 1;

    const food = Math.round(total * (foodR / norm));
    const transport = Math.round(total * (transportR / norm));
    const activities = Math.round(total * (activitiesR / norm));
    const buffer = Math.max(0, total - (food + transport + activities));

    const cats: BudgetCategory[] = [
      {
        label: "Food & Dining",
        amount: food,
        percentage: total ? Math.round((food / total) * 100) : 0,
        color: "bg-[hsl(199,89%,48%)]",
        icon: Utensils,
      },
      {
        label: "Transport",
        amount: transport,
        percentage: total ? Math.round((transport / total) * 100) : 0,
        color: "bg-[hsl(168,71%,41%)]",
        icon: Bus,
      },
      {
        label: "Activities",
        amount: activities,
        percentage: total ? Math.round((activities / total) * 100) : 0,
        color: "bg-[hsl(43,96%,56%)]",
        icon: Ticket,
      },
      {
        label: "Buffer",
        amount: buffer,
        percentage: total ? Math.round((buffer / total) * 100) : 0,
        color: "bg-[hsl(220,14%,71%)]",
        icon: ShieldCheck,
      },
    ];

    const spent = food + transport + activities;
    const remaining = Math.max(0, total - spent);

    return { categories: cats, totalBudget: total, spent, remaining };
  }, [hasBudget, budget]);

  const ready = showPlan && !isGenerating && hasBudget && totalBudget > 0;

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="font-heading text-base">
              Budget Allocation
            </CardTitle>
          </div>

          {ready && (
            <Badge
              variant="outline"
              className="text-[11px] font-semibold text-accent border-accent/30"
            >
              ${remaining} remaining
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isGenerating ? (
          <BudgetSkeleton />
        ) : ready ? (
          <div className="space-y-4">
            {/* Combined bar */}
            <div className="flex h-3 rounded-full overflow-hidden bg-secondary">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className={`${cat.color} transition-all duration-500`}
                  style={{ width: `${cat.percentage}%` }}
                />
              ))}
            </div>

            {/* Category breakdown */}
            <div className="space-y-3.5">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}/15`}
                  >
                    <cat.icon className="w-4 h-4 text-foreground/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {cat.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          ${cat.amount}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {cat.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cat.color} transition-all duration-700`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Total estimated
              </span>
              <span className="text-sm font-bold text-foreground">
                ${spent} / ${totalBudget}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-2">
              <Wallet className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No budget data yet
            </p>
            {showPlan && !isGenerating && !hasBudget ? (
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                (API response has no budget. Check /api/plan output shape)
              </p>
            ) : (
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                Generate a plan to see breakdown
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
