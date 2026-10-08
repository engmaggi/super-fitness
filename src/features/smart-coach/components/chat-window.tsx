import { useState } from "react";
import type { Conversation, Message } from "../types";
import { Menu } from "lucide-react";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { PreviousConversationsPanel } from "./previous-conversations-panel";
import chatBg from "../assets/chat-bg.jpg"

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
  className="relative isolate flex h-[min(30rem,70vh)] w-[min(21rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-md border border-primary px-4"
>
  {/*  the image bg */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
    style={{ backgroundImage: `url(${chatBg})` }}
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 bg-[#1A1A1A]/50 backdrop-blur-[2px]"
  />
      <header className="flex shrink-0 items-center justify-between py-5">
        <h2 className="text-2xl font-bold text-white">Smart Coach</h2>
        <button
          type="button"
          onClick={() => setShowHistory((prev) => !prev)}
          aria-label="Previous conversations"
          aria-expanded={showHistory}
        >
          <Menu className="size-5 text-primary" />
        </button>
      </header>

      <MessageList messages={messages} isLoading={isLoading} error={error} />
      <ChatInput onSend={onSend} disabled={isLoading} />

      {/* overlay: absolute over the chat, the chat stays visible behind it */}
      {showHistory && (
         <div className="absolute inset-s-0 top-0 z-10 w-3/4">
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