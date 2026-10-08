import type { Message } from "../types";
import botPhoto from "../assets/bot-photo.jpg"
import { useAuth } from "@/features/auth";
type MessageBubbleProps = Pick<Message, "role" | "content">;

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const { user } = useAuth();
  const isUser = role === "user";

  const avatarSrc =
    user?.photo ||
    "/images/default-avatar.png";
  
  return (
    
    <div className={`flex items-end gap-2 w-full ${isUser ? "justify-end" : "justify-start"}`}>
  
  
  
      {!isUser && (
        <img
          src={botPhoto}
          alt="Smart Coach"
          className="size-10 shrink-0 rounded-full border border-primary/20 object-cover shadow-[0_0_24px_4px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
        />
      )}

     <p
  className={`max-w-[75%] whitespace-pre-wrap wrap-break-word rounded-[20px] px-4 py-2 text-xs leading-relaxed text-white ${
    isUser ? "rounded-ee-none bg-primary" : "rounded-es-none bg-zinc-900/95"
  }`}
>
  {content}
</p>

      {isUser && (
        <img
          src={avatarSrc}
          alt="You"
          className="size-10 shrink-0 rounded-full border border-primary/20 object-cover shadow-[0_0_24px_4px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
        />
      )}
    </div>
  );
}