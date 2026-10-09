import { AI_PROVIDER, MAX_HISTORY } from "../config/ai";
import type { Message } from "../types";
import { AiError } from "./ai-error";
import { askGemini } from "./gemini";
import { askGroq } from "./groq";


type Ask = (history: Message[]) => Promise<string>;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// last N messages, and the list must start with a user message (Gemini requires it)
function toApiHistory(messages: Message[]): Message[] {
  const recent = messages.slice(-MAX_HISTORY);
  const firstUser = recent.findIndex((m) => m.role === "user");
  return firstUser === -1 ? [] : recent.slice(firstUser);
}
// retry only errors that can fix themselves: 429 (limit) and 5xx (provider problem)
async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  let attempt = 0;
  for (;;) {
    try {
      return await fn();
    } catch (e) {
      const retryable = e instanceof AiError && (e.status === 429 || (e.status ?? 0) >= 500);
      if (!retryable || attempt >= retries) throw e;
      await sleep(1000 * 2 ** attempt); // wait 1s, then 2s
      attempt++;
    }
  }
}

// providers that have a key, preferred one first
function getProviders(): Ask[] {
  const all = [
    { name: "groq", ask: askGroq, enabled: Boolean(import.meta.env.VITE_GROQ_API_KEY) },
    { name: "gemini", ask: askGemini, enabled: Boolean(import.meta.env.VITE_GEMINI_API_KEY) },
  ];

  return all
    .filter((p) => p.enabled)
    .sort((a, b) => (a.name === AI_PROVIDER ? -1 : b.name === AI_PROVIDER ? 1 : 0))
    .map((p) => p.ask);
}

export async function askSmartCoach(messages: Message[]): Promise<string> {
  const history = toApiHistory(messages);
  const providers = getProviders();

  if (providers.length === 0) throw new AiError("No AI API key configured");

  let lastError: unknown;
  for (const ask of providers) {
    try {
      return await withRetry(() => ask(history));
    } catch (e) {
      lastError = e;          // try the next provider
    }
  }
  throw lastError;
}