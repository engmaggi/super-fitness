import type { Message } from "../types";
import { MAX_OUTPUT_TOKENS, SYSTEM_PROMPT } from "../config/ai";
import { AiError } from "./ai-error";

export async function askGemini(history: Message[]): Promise<string> {
  const model = import.meta.env.VITE_GEMINI_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY ?? "",
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: 0.7 },
      contents: history.map((m) => ({
        role: m.role === "bot" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    }),
  });

  if (!res.ok) throw new AiError("Gemini request failed", res.status);

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new AiError("Gemini returned an empty answer");
  return text.trim();
}