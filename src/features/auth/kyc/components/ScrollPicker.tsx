import { useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "cn";

// ─── Scroll Picker ────────────────────────────────────────────────────────────

export function ScrollPicker({
  value,
  onChange,
  min,
  max,
  unit,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
}) {
  const VISIBLE = 7; // odd number → centre item is selected
  const half = Math.floor(VISIBLE / 2);
  const dragStart = useRef<{ x: number; val: number } | null>(null);

  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  const items = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = i - half;
    const v = value + idx;
    return { idx, v };
  });

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      onChange(clamp(value + Math.sign(delta)));
    },
    [value, onChange, min, max],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, val: value };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = dragStart.current.x - e.clientX;
    const delta = Math.round(dx / 28);
    onChange(clamp(dragStart.current.val + delta));
  };

  const handlePointerUp = () => {
    dragStart.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <p className="font-heading text-sm font-semibold text-primary uppercase tracking-widest">{unit}</p>

      <div
        className="relative flex touch-none cursor-ew-resize items-end gap-1 overflow-hidden px-2"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {items.map(({ idx, v }) => {
          const isSelected = idx === 0;
          const dist = Math.abs(idx);
          const opacity =
            dist === 0 ? 1 : dist === 1 ? 0.65 : dist === 2 ? 0.38 : 0.18;
          const scale = isSelected ? 1.4 : 1;
          const isValid = v >= min && v <= max;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => isValid && onChange(clamp(v))}
              style={{
                opacity,
                transform: `scale(${scale})`,
                transition: "all 0.15s ease",
              }}
              className={cn(
                "w-10 text-center font-heading font-bold leading-none",
                isSelected
                  ? "text-primary text-3xl"
                  : "text-foreground text-xl",
                !isValid && "invisible",
              )}
            >
              {isValid ? v : ""}
            </button>
          );
        })}
      </div>

      <ChevronDown className="text-primary" size={20} />
    </div>
  );
}
