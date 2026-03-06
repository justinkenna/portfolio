import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { PORTFOLIO_CONTEXT } from "@/lib/portfolio-context";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type AgentResponse = {
  answer: string;
  suggestions: string[];
};

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "Missing question" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    max_tokens: 400,
    messages: [
      { role: "system", content: PORTFOLIO_CONTEXT },
      { role: "user", content: question.trim() },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "";

  let parsed: AgentResponse;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Fallback if model returns non-JSON
    parsed = {
      answer: raw,
      suggestions: ["What projects have you worked on?", "How can I contact you?"],
    };
  }

  return NextResponse.json(parsed);
}
