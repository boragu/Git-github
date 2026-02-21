import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key)
      return NextResponse.json(
        { error: "GEMINI_API_KEY가 없습니다." },
        { status: 500 }
      );

    const body = await req.json();
    const { destination, startDate, endDate, budget } = body;

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const prompt = `
      입력된 정보를 바탕으로 여행 계획을 JSON 형식으로만 응답하세요.
      목적지: ${destination}, 기간: ${startDate} ~ ${endDate}, 예산: $${budget}.
      
      [필수 JSON 구조]
      {
        "planA": [{"day": 1, "items": [{"time": "10:00", "title": "장소", "desc": "설명", "cost": 0, "moveMin": 0}]}],
        "planB": [{"day": 1, "items": [{"time": "10:00", "title": "대안", "desc": "설명", "cost": 0, "moveMin": 0}]}],
        "budget": { "estimatedTotal": ${budget}, "food": 0.3, "transport": 0.2, "activities": 0.5 },
        "highlights": { "todayHighlight": "요약", "mustTryFood": "음식", "bestPhotoSpot": "포토존" },
        "packingChecklist": ["항목1"]
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    return NextResponse.json(JSON.parse(text));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
