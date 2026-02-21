"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AgentResult } from "@/lib/agent/types";

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  checked: boolean;
}

const defaultItems: ChecklistItem[] = [
  {
    id: "1",
    label: "Passport & Visa docs",
    category: "Essentials",
    checked: true,
  },
  {
    id: "2",
    label: "Flight tickets (printed)",
    category: "Essentials",
    checked: true,
  },
  {
    id: "3",
    label: "Travel insurance",
    category: "Essentials",
    checked: false,
  },
  {
    id: "4",
    label: "Phone charger & adapter",
    category: "Electronics",
    checked: true,
  },
  {
    id: "5",
    label: "Portable power bank",
    category: "Electronics",
    checked: false,
  },
  {
    id: "6",
    label: "Camera & SD cards",
    category: "Electronics",
    checked: false,
  },
  {
    id: "7",
    label: "Umbrella / rain jacket",
    category: "Clothing",
    checked: false,
  },
  {
    id: "8",
    label: "Comfortable walking shoes",
    category: "Clothing",
    checked: true,
  },
  {
    id: "9",
    label: "Light layers for layering",
    category: "Clothing",
    checked: false,
  },
  { id: "10", label: "Toiletries bag", category: "Personal", checked: false },
  { id: "11", label: "Medications", category: "Personal", checked: false },
  {
    id: "12",
    label: "Reusable water bottle",
    category: "Personal",
    checked: false,
  },
];

function ChecklistSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>
      ))}
    </div>
  );
}

interface PackingChecklistProps {
  isGenerating: boolean;
  showPlan: boolean;
  data: AgentResult | null;
}

// 간단 카테고리 분류(룰 기반)
function inferCategory(label: string) {
  const s = label.toLowerCase();
  if (/(passport|visa|ticket|insurance|booking)/.test(s)) return "Essentials";
  if (/(charger|adapter|power|battery|camera|sd|phone|laptop)/.test(s))
    return "Electronics";
  if (/(shoe|jacket|umbrella|clothes|clothing|socks|coat)/.test(s))
    return "Clothing";
  if (/(toiletr|medicine|medication|mask|sanit|personal)/.test(s))
    return "Personal";
  return "Custom";
}

function toChecklistItems(list: string[]): ChecklistItem[] {
  return list.map((label, idx) => ({
    id: `${Date.now()}-${idx}`,
    label,
    category: inferCategory(label),
    checked: false,
  }));
}

export function PackingChecklist({
  isGenerating,
  showPlan,
  data,
}: PackingChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [newItem, setNewItem] = useState("");
  const [showInput, setShowInput] = useState(false);

  // ✅ data가 들어오면 AI 체크리스트로 교체 (한 번만/매번 둘 다 가능)
  useEffect(() => {
    if (!data?.packingChecklist?.length) return;
    setItems(toChecklistItems(data.packingChecklist));
  }, [data]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    const label = newItem.trim();
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), label, category: "Custom", checked: false },
    ]);
    setNewItem("");
    setShowInput(false);
  };

  const checkedCount = items.filter((item) => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount
    ? Math.round((checkedCount / totalCount) * 100)
    : 0;

  // Group items by category
  const grouped = useMemo(() => {
    return items.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [items]);

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15">
              <CheckSquare className="w-4 h-4 text-accent" />
            </div>
            <CardTitle className="font-heading text-base">
              Packing Checklist
            </CardTitle>
          </div>
          {showPlan && !isGenerating && (
            <Badge variant="secondary" className="text-[11px] font-semibold">
              {checkedCount}/{totalCount} ({progress}%)
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isGenerating ? (
          <ChecklistSkeleton />
        ) : showPlan ? (
          <div className="space-y-4">
            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Grouped items */}
            <div className="space-y-4">
              {Object.entries(grouped).map(([category, catItems]) => (
                <div key={category}>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                    {category}
                  </p>
                  <div className="space-y-1">
                    {catItems.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-muted/60 transition-colors group"
                      >
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <span
                          className={`text-sm transition-all ${
                            item.checked
                              ? "line-through text-muted-foreground/60"
                              : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add item */}
            {showInput ? (
              <div className="flex items-center gap-2 pt-2">
                <Input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addItem()}
                  placeholder="Add item..."
                  className="h-8 text-sm flex-1"
                  autoFocus
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowInput(false)}
                  className="h-8 text-xs"
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={addItem} className="h-8 text-xs">
                  Add
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInput(true)}
                className="w-full justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-2">
              <CheckSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No checklist yet
            </p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              Generate a plan to get started
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
