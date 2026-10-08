import { useState } from "react";
import type { Conversation, Message } from "../types";
import { Menu } from "lucide-react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { PreviousConversationsPanel } from "./previous-conversations-panel";


type ChatWindowProps = {
  messages: Message[];
  conversations: Conversation[];
  isLoading: boolean;
  error: string | null;
  onSend: (text: string) => void;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
};

export function ChatWindow({
  messages,
  conversations,
  isLoading,
  error,
  onSend,
  onSelectConversation,
  onNewChat,
}: ChatWindowProps) {
  const [showHistory, setShowHistory] = useState(false);

  function handleSelect(id: string) {
    onSelectConversation(id);
    setShowHistory(false);   // go back to the chat
  }

  function handleNewChat() {
    onNewChat();
    setShowHistory(false);
  }

  return (
    <section
      aria-label="Smart Coach chat"
      className="relative flex h-[min(30rem,70vh)] w-[min(20rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-brand bg-black/70 backdrop-blur-md"
    >
      <header className="flex shrink-0 items-center justify-between px-4 py-3">
        <h2 className="text-sm font-semibold text-white">Smart Coach</h2>
        <button
          type="button"
          onClick={() => setShowHistory((prev) => !prev)}
          aria-label="Previous conversations"
          aria-expanded={showHistory}
        >
          <Menu className="size-5 text-brand" />
        </button>
      </header>

      <MessageList messages={messages} isLoading={isLoading} error={error} />
      <ChatInput onSend={onSend} disabled={isLoading} />

      {/* overlay: absolute over the chat, the chat stays visible behind it */}
      {showHistory && (
        <div className="absolute inset-x-3 top-12 z-10">
          <PreviousConversationsPanel
            conversations={conversations}
            onSelect={handleSelect}
            onNewChat={handleNewChat}
          />
        </div>
      )}
    </section>
  );
}