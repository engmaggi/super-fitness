import { useEffect, useState } from "react";
import type { Conversation, Message } from "../types";
import { WELCOME_MESSAGE } from "../config/ai";
import { loadConversations, saveConversations } from "../utils/storage";
import { getFriendlyError } from "../utils/errors";
import { askSmartCoach } from "../api/ask-smart-coach";

export function useSmartCoachChat(userId: string | null) {   // null = logged out
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    loadConversations(userId)
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // save to the browser whenever the list changes
  useEffect(() => {
    saveConversations(userId, conversations);
  }, [userId, conversations]);

  // create the conversation on first save, update it afterwards
  function upsertConversation(id: string, msgs: Message[]) {
    setConversations((prev) => {
      if (prev.some((c) => c.id === id)) {
        return prev.map((c) => (c.id === id ? { ...c, messages: msgs } : c));
      }
      const firstUser = msgs.find((m) => m.role === "user")?.content ?? "New chat";
      const created: Conversation = {
        id,
        title: firstUser.slice(0, 40),
        createdAt: Date.now(),
        messages: msgs,
      };
      return [created, ...prev];
    });
  }

  async function sendMessage(text: string) {
    const content = text.trim();
    if (!content || isLoading || !userId) return;   // empty / already waiting / not logged in

    const conversationId = activeId ?? crypto.randomUUID();
    if (!activeId) setActiveId(conversationId);

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content };
    const withUser = [...messages, userMessage];   // build the array first (stale state trap)

    setMessages(withUser);   // 1) appears immediately
    upsertConversation(conversationId, withUser);
    setError(null);
    setIsLoading(true);   // 2) typing indicator + disabled input

    try {
      const reply = await askSmartCoach(withUser);   // 3) call the AI
      const botMessage: Message = { id: crypto.randomUUID(), role: "bot", content: reply };
      const withBot = [...withUser, botMessage];
      setMessages(withBot);   // 4) render the answer
      upsertConversation(conversationId, withBot);
    } catch (e) {
      setError(getFriendlyError(e)); //  friendly text for the user
    } finally {
      setIsLoading(false);   // always runs
    }
  }

  function selectConversation(id: string) {
    if (isLoading) return;  // don't switch while waiting for a reply
    const found = conversations.find((c) => c.id === id);
    if (!found) return;
    setMessages(found.messages);
    setActiveId(id);
    setError(null);
  }

  function startNewChat() {
    if (isLoading) return;
    setMessages([WELCOME_MESSAGE]);
    setActiveId(null);
    setError(null);
  }

  return {
    conversations,
    messages,
    isLoading,
    error,
    sendMessage,
    selectConversation,
    startNewChat,
  };
}