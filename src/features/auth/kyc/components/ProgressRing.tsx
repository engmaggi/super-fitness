// ─── Progress Ring ────────────────────────────────────────────────────────────

export function ProgressRing({ step, total }: { step: number; total: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const progress = step / total;
  const offset = circ * (1 - progress);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="3"
        />
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="#ff4100"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
      <span className="absolute font-heading text-sm font-semibold text-foreground">
        {step}/{total}
      </span>
    </div>
  );
}
