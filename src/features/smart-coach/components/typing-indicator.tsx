export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" role="status" aria-label="Smart Coach is typing">
      <img src="/images/bot-avatar.png" alt="" className="size-7 shrink-0 rounded-full" />
      <div className="flex gap-1 rounded-2xl bg-white/10 px-3 py-3">
        <span className="size-1.5 animate-bounce rounded-full bg-white/70" />
        <span className="size-1.5 animate-bounce rounded-full bg-white/70 [animation-delay:150ms]" />
        <span className="size-1.5 animate-bounce rounded-full bg-white/70 [animation-delay:300ms]" />
      </div>
    </div>
  );
}