"use client";

import React, { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, Star, Utensils, Camera, ArrowUpRight } from "lucide-react";
import type { AgentResult } from "@/lib/agent/types";

interface Highlight {
  icon: React.ElementType;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
}

function HighlightsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-card p-4 space-y-3"
        >
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      ))}
    </div>
  );
}

interface HighlightsSectionProps {
  isGenerating: boolean;
  showPlan: boolean;
  data: AgentResult | null;
}

export function HighlightsSection({
  isGenerating,
  showPlan,
  data,
}: HighlightsSectionProps) {
  // ✅ highlights가 "진짜로 존재하고 문자열로 들어왔는지" 체크
  const hasHighlights =
    Boolean(data?.highlights) &&
    typeof data?.highlights?.todayHighlight === "string" &&
    typeof data?.highlights?.mustTryFood === "string" &&
    typeof data?.highlights?.bestPhotoSpot === "string" &&
    data.highlights.todayHighlight.trim().length > 0 &&
    data.highlights.mustTryFood.trim().length > 0 &&
    data.highlights.bestPhotoSpot.trim().length > 0;

  // ✅ 하이라이트 배열은 hasHighlights일 때만 생성 (절대 크래시 안 남)
  const highlights: Highlight[] = useMemo(() => {
    if (!hasHighlights) return [];

    return [
      {
        icon: Star,
        tag: "Today Highlight",
        tagColor: "bg-[hsl(43,96%,56%)]/15 text-[hsl(43,80%,40%)]",
        title: data!.highlights.todayHighlight,
        description:
          "AI-picked best moment for today based on your itinerary pacing.",
      },
      {
        icon: Utensils,
        tag: "Must Try Food",
        tagColor: "bg-[hsl(354,70%,54%)]/15 text-[hsl(354,70%,45%)]",
        title: data!.highlights.mustTryFood,
        description: "Top food recommendation aligned with your itinerary.",
      },
      {
        icon: Camera,
        tag: "Best Photo Spot",
        tagColor: "bg-primary/10 text-primary",
        title: data!.highlights.bestPhotoSpot,
        description: "Most photogenic stop suggestion for your trip.",
      },
    ];
  }, [hasHighlights, data]);

  // ✅ 실제로 "표시할 데이터가 준비됐는지" 기준
  const ready = showPlan && !isGenerating && hasHighlights;

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(43,96%,56%)]/15">
            <Lightbulb className="w-4 h-4 text-[hsl(43,80%,40%)]" />
          </div>
          <CardTitle className="font-heading text-base">
            Smart Highlights
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {isGenerating ? (
          <HighlightsSkeleton />
        ) : ready ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {highlights.map((item) => (
              <div
                key={item.tag}
                className="group relative rounded-xl border border-border bg-muted/40 p-4 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    className={`text-[10px] font-semibold border-0 ${item.tagColor}`}
                  >
                    <item.icon className="w-3 h-3 mr-1" />
                    {item.tag}
                  </Badge>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-2">
              <Lightbulb className="w-5 h-5 text-muted-foreground" />
            </div>

            <p className="text-sm font-medium text-muted-foreground">
              No highlights yet
            </p>

            {/* ✅ showPlan은 true인데 highlights가 없을 때: 디버깅 힌트 */}
            {showPlan && !isGenerating && !hasHighlights ? (
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                (API response has no highlights. Check /api/plan output shape)
              </p>
            ) : (
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                AI will find top picks for you
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
