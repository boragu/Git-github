// lib/agent/ui-props.ts
import type { AgentResult } from "@/lib/agent/types";

export type SectionBaseProps = {
  isGenerating: boolean;
  showPlan: boolean;
  data: AgentResult | null;
};
