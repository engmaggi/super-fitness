// ─── SignupError ──────────────────────────────────────────────────────────────

export function SignupError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-6 text-center font-heading text-sm">
      <p className="font-extrabold text-destructive">❌ Signup failed</p>
      <p className="mt-1 text-xs opacity-80 text-foreground">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 underline underline-offset-2 text-xs hover:opacity-70 text-foreground"
      >
        Try again
      </button>
    </div>
  );
}
