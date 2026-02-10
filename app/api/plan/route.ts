// app/api/plan/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

type TripInput = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number | string;
  travelStyle?: string;
  transport?: string;
};

function safeNum(v: any, fallback: number) {
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n : fallback;
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Use POST /api/plan" });
}

export async function POST(req: Request) {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as TripInput;

    const destination = body.destination ?? "Tokyo, Japan";
    const startDate = body.startDate ?? "2026-03-15";
    const endDate = body.endDate ?? "2026-03-19";
    const budget = safeNum(body.budget, 2500);
    const travelStyle = body.travelStyle ?? "culture";
    const transport = body.transport ?? "mixed";

    const genAI = new GoogleGenerativeAI(key);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 900,
        responseMimeType: "application/json", // ✅ JSON만
      },
    });

    const prompt = `
Return ONLY valid JSON (no markdown, no comments).
The JSON MUST match this exact shape:

{
  "planA": [{"day": 1, "items": [{"time":"10:00", "title":"", "desc":"", "cost": 10, "moveMin": 20}]}],
  "planB": [{"day": 1, "items": [{"time":"10:00", "title":"", "desc":"", "cost": 10, "moveMin": 20}]}],
  "budget": { "estimatedTotal": ${budget}, "food": 0.25, "transport": 0.2, "activities": 0.35 },
  "highlights": { "todayHighlight": "", "mustTryFood": "", "bestPhotoSpot": "" },
  "packingChecklist": ["", "", ""]
}

Trip:
- destination: ${destination}
- startDate: ${startDate}
- endDate: ${endDate}
- budgetUSD: ${budget}
- travelStyle: ${travelStyle}
- transport: ${transport}

Rules:
- planA: normal weather, best route
- planB: rainy/indoor-friendly alternative
- "day" must be NUMBER
- "items" must be ARRAY (required)
- cost and moveMin must be NUMBER (integers)
- budget.food/transport/activities are ratios between 0 and 1 (sum <= 1)
- budget.estimatedTotal MUST be ${budget}
- highlights fields must be short but specific
- packingChecklist must be practical
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let json: any;
    try {
      json = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Model returned non-JSON", raw: text.slice(0, 300) },
        { status: 500 }
      );
    }

    // ✅ 최소 형태 검증(프론트 크래시 방지용)
    const ok =
      Array.isArray(json?.planA) &&
      Array.isArray(json?.planB) &&
      typeof json?.budget?.estimatedTotal === "number" &&
      typeof json?.highlights?.todayHighlight === "string" &&
      Array.isArray(json?.packingChecklist);

    if (!ok) {
      return NextResponse.json(
        { error: "Invalid response shape from model", raw: json },
        { status: 400 }
      );
    }

    return NextResponse.json(json);
  } catch (e: any) {
    console.error("PLAN ROUTE ERROR:", e);
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
