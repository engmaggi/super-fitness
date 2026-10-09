import { useEffect, useRef } from "react";
import type { Message } from "../types";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";


type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
};

export function MessageList({ messages, isLoading, error }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // scroll to the newest message whenever something changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isLoading, error]);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-2" aria-live="polite">
      {messages.map((m) => (
        <MessageBubble key={m.id} role={m.role} content={m.content} />
      ))}

      {isLoading && <TypingIndicator />}

      {error && (
        <p role="alert" className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      )}

      <div ref={bottomRef} />
    </div>
  );
}