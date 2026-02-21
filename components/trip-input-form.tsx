"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Calendar,
  DollarSign,
  Sparkles,
  Compass,
  Footprints,
} from "lucide-react";

type TravelStyle = "relaxed" | "packed" | "food" | "culture" | "nature";
type Transport = "walk" | "transit" | "mixed";

export type TripFormPayload = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelStyle: TravelStyle;
  transport: Transport;
};

interface TripInputFormProps {
  onGenerate: (payload: TripFormPayload) => void | Promise<void>;
  isGenerating: boolean;
}

export function TripInputForm({
  onGenerate,
  isGenerating,
}: TripInputFormProps) {
  const [destination, setDestination] = useState("Tokyo, Japan");
  const [startDate, setStartDate] = useState("2026-03-15");
  const [endDate, setEndDate] = useState("2026-03-19");
  const [budget, setBudget] = useState<number>(2500);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("culture");
  const [transport, setTransport] = useState<Transport>("mixed");

  const handleClick = () => {
    onGenerate({
      destination,
      startDate,
      endDate,
      budget: Number(budget),
      travelStyle,
      transport,
    });
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Compass className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="font-heading text-base">
              Plan Your Trip
            </CardTitle>
            <CardDescription className="text-xs">
              Tell us about your dream destination
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Destination */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              Destination
            </Label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Tokyo, Japan"
              className="h-9 text-sm"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              Start Date
            </Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* End Date */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              End Date
            </Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-9 text-sm"
            />
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <DollarSign className="w-3 h-3" />
              Budget (USD)
            </Label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              placeholder="2500"
              className="h-9 text-sm"
              min={0}
            />
          </div>

          {/* Travel Style */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Travel Style
            </Label>
            <Select
              value={travelStyle}
              onValueChange={(v) => setTravelStyle(v as TravelStyle)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relaxed">Relaxed</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="food">Food Focused</SelectItem>
                <SelectItem value="culture">Culture & History</SelectItem>
                <SelectItem value="nature">Nature & Outdoors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transport */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Footprints className="w-3 h-3" />
              Transport
            </Label>
            <Select
              value={transport}
              onValueChange={(v) => setTransport(v as Transport)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walk">Walking</SelectItem>
                <SelectItem value="transit">Public Transit</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            AI will generate two optimized plans for you
          </p>
          <Button
            onClick={handleClick}
            disabled={isGenerating}
            className="gap-2 text-sm font-semibold"
            size="sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isGenerating ? "Generating..." : "Generate Plan"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
