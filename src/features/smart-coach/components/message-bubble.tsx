import type { Message } from "../types";

type MessageBubbleProps = Pick<Message, "role" | "content">;

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <img
          src="/images/bot-avatar.png"
          alt="Smart Coach"
          className="size-7 shrink-0 rounded-full"
        />
      )}

      <p
        className={`max-w-[75%] whitespace-pre-wrap wrap-break-word rounded-2xl px-3 py-2 text-xs leading-relaxed text-white ${
          isUser ? "bg-brand" : "bg-white/10"
        }`}
      >
        {content}
      </p>

      {isUser && (
        <img
          src="/images/user-avatar.png"
          alt="You"
          className="size-7 shrink-0 rounded-full object-cover"
        />
      )}
    </div>
  );
}