"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, DollarSign, Sun, CloudRain } from "lucide-react";
import type { AgentResult } from "@/lib/agent/types";

type TimelineItem = {
  time: string;
  place: string;
  description: string;
  cost: number;
  travelTime: string; // "15 min"
};

type DayPlanUI = {
  day: number;
  title: string;
  items: TimelineItem[];
};

function toTravelTime(moveMin: number) {
  if (!moveMin || moveMin <= 0) return "- ";
  return `${moveMin} min`;
}

// AgentResult(planA/planB)의 구조를 UI가 쓰는 구조로 변환
function mapAgentToDayPlan(
  days: AgentResult["planA"] | AgentResult["planB"]
): DayPlanUI[] {
  return (days ?? []).map((d) => ({
    day: d.day,
    // API 스키마에는 day title이 없으니 기본 타이틀 생성
    title: `Day ${d.day}`,
    items: d.items.map((it) => ({
      time: it.time,
      place: it.title,
      description: it.desc,
      cost: it.cost,
      travelTime: toTravelTime(it.moveMin),
    })),
  }));
}

function TimelineBlock({
  item,
  isLast,
}: {
  item: TimelineItem;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-3">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-border" />}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-5 ${isLast ? "pb-0" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              {item.time}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {item.place}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
              {item.description}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 mt-1 sm:mt-0">
            {item.cost > 0 && (
              <Badge
                variant="secondary"
                className="text-[10px] font-medium gap-1 px-1.5 py-0.5"
              >
                <DollarSign className="w-2.5 h-2.5" />
                {item.cost}
              </Badge>
            )}
            {item.travelTime !== "- " && (
              <Badge
                variant="outline"
                className="text-[10px] font-medium gap-1 px-1.5 py-0.5 text-muted-foreground"
              >
                <Clock className="w-2.5 h-2.5" />
                {item.travelTime}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DayCard({ day }: { day: DayPlanUI }) {
  const totalCost = day.items.reduce((sum, item) => sum + item.cost, 0);
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold">
            D{day.day}
          </span>
          <h4 className="text-sm font-semibold text-foreground">{day.title}</h4>
        </div>
        <Badge variant="secondary" className="text-[10px] font-semibold">
          {totalCost} est.
        </Badge>
      </div>
      <div className="space-y-0">
        {day.items.map((item, idx) => (
          <TimelineBlock
            key={idx}
            item={item}
            isLast={idx === day.items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function ItinerarySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-card p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="w-7 h-7 rounded-lg" />
            <Skeleton className="h-4 w-48" />
          </div>
          {[1, 2, 3].map((j) => (
            <div key={j} className="flex gap-3 ml-1">
              <Skeleton className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-56" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface ItinerarySectionProps {
  isGenerating: boolean;
  showPlan: boolean;
  data: AgentResult | null;
}

export function ItinerarySection({
  isGenerating,
  showPlan,
  data,
}: ItinerarySectionProps) {
  const planA = data ? mapAgentToDayPlan(data.planA) : [];
  const planB = data ? mapAgentToDayPlan(data.planB) : [];

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="font-heading text-base">
              Generated Itinerary
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isGenerating ? (
          <ItinerarySkeleton />
        ) : showPlan && data ? (
          <Tabs defaultValue="planA">
            <TabsList className="mb-4">
              <TabsTrigger value="planA" className="gap-1.5 text-xs">
                <Sun className="w-3.5 h-3.5" />
                Plan A - Sunny
              </TabsTrigger>
              <TabsTrigger value="planB" className="gap-1.5 text-xs">
                <CloudRain className="w-3.5 h-3.5" />
                Plan B - Rainy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="planA">
              <div className="space-y-4">
                {planA.map((day) => (
                  <DayCard key={day.day} day={day} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="planB">
              <div className="space-y-4">
                {planB.map((day) => (
                  <DayCard key={day.day} day={day} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No itinerary generated yet
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Fill in your trip details and click Generate Plan
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
