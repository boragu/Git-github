import { z } from "zod";

export const TripInputSchema = z.object({
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number(),
  travelStyle: z.string(),
  transport: z.string(),
});
export type TripInput = z.infer<typeof TripInputSchema>;

const ItemSchema = z.object({
  time: z.string(),
  title: z.string(),
  desc: z.string(),
  cost: z.coerce.number(),
  moveMin: z.coerce.number(),
});

const DaySchema = z.object({
  day: z.coerce.number(),
  items: z.array(ItemSchema),
});

export const AgentResultSchema = z.object({
  planA: z.array(DaySchema),
  planB: z.array(DaySchema),
  budget: z.object({
    estimatedTotal: z.coerce.number(),
    food: z.coerce.number(),
    transport: z.coerce.number(),
    activities: z.coerce.number(),
  }),
  highlights: z.object({
    todayHighlight: z.string(),
    mustTryFood: z.string(),
    bestPhotoSpot: z.string(),
  }),
  packingChecklist: z.array(z.string()),
});
export type AgentResult = z.infer<typeof AgentResultSchema>;
