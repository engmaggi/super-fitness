import type { Message } from "../types";

export const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER ?? "groq";

export const MAX_HISTORY =12;   // last N messages sent to the AI (saves tokens)
export const MAX_OUTPUT_TOKENS = 600;  // cap on the answer length

export const SYSTEM_PROMPT = `You are "Smart Coach", a friendly fitness assistant on a gym website.
- Help with workouts, nutrition, weight gain/loss and healthy habits.
- Keep answers short (maximum 5 sentences) unless the user asks for a detailed plan.
- Use plain text only: no markdown, no asterisks, no headings.
- If the question is not about fitness or health, politely say you can only help with fitness.
- For injuries, pain or medical conditions, suggest seeing a doctor or a certified trainer.`;

export const WELCOME_MESSAGE :Message ={
    id:"welcom",
    role:"bot",
    content:"Hello! How can i assist you today?"
};