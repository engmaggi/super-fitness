import type { Message } from "../types";
import { MAX_OUTPUT_TOKENS, SYSTEM_PROMPT } from "../config/ai";
import { AiError } from "./ai-error";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function askGroq(history: Message[]): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: import.meta.env.VITE_GROQ_MODEL,
      temperature: 0.7,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content,
        })),
      ],
    }),
  });

  if (!res.ok) throw new AiError("Groq request failed", res.status);

  const data = await res.json();
  const text: string | undefined = data?.choices?.[0]?.message?.content;
  if (!text) throw new AiError("Groq returned an empty answer");
  return text.trim();
}