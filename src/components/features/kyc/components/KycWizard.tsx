/**
 * KycWizard – 6-step KYC flow that collects fitness profile data.
 *
 * Steps:
 *  1. Gender
 *  2. Age
 *  3. Weight (kg)
 *  4. Height (cm)
 *  5. Goal
 *  6. Activity Level
 *
 * On completion the caller receives a `KycData` object that should be merged
 * with the signup form fields before POSTing to the server.
 */

import { useState, useRef, useCallback } from "react"
import { cn } from "cn"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface KycData {
  gender: "male" | "female"
  age: number
  weight: number
  height: number
  goal: string
  activityLevel: string
}

interface KycWizardProps {
  /** Called when the user completes all 6 steps */
  onComplete: (data: KycData) => void
  /** Optional: start values (e.g. from localStorage) */
  initialData?: Partial<KycData>
  className?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GOALS = [
  "Gain weight",
  "Lose weight",
  "Get fitter",
  "Gain more flexible",
  "Learn the basic",
]

const ACTIVITY_LEVELS = [
  { value: "level1", label: "Sedentary", description: "Little or no exercise" },
  {
    value: "level2",
    label: "Lightly active",
    description: "Light exercise 1-3 days/week",
  },
  {
    value: "level3",
    label: "Moderately active",
    description: "Moderate exercise 3-5 days/week",
  },
  {
    value: "level4",
    label: "Very active",
    description: "Hard exercise 6-7 days/week",
  },
  {
    value: "level5",
    label: "Super active",
    description: "Very hard exercise & physical job",
  },
]

const TOTAL_STEPS = 6

// ─── Progress Ring ────────────────────────────────────────────────────────────

function ProgressRing({
  step,
  total,
}: {
  step: number
  total: number
}) {
  const r = 18
  const circ = 2 * Math.PI * r
  const progress = step / total
  const offset = circ * (1 - progress)

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
  )
}

// ─── Scroll Picker ────────────────────────────────────────────────────────────

function ScrollPicker({
  value,
  onChange,
  min,
  max,
  unit,
}: {
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  unit: string
}) {
  const VISIBLE = 7 // odd number → centre item is selected
  const half = Math.floor(VISIBLE / 2)
  const dragStart = useRef<{ y: number; val: number } | null>(null)

  const clamp = (v: number) => Math.max(min, Math.min(max, v))

  const items = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = i - half
    const v = value + idx
    return { idx, v }
  })

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      onChange(clamp(value + Math.sign(e.deltaY)))
    },
    [value, onChange, min, max],
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { y: e.clientY, val: value }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current) return
    const dy = dragStart.current.y - e.clientY
    const delta = Math.round(dy / 24)
    onChange(clamp(dragStart.current.val + delta))
  }

  const handlePointerUp = () => {
    dragStart.current = null
  }

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <p className="font-heading text-sm font-semibold text-primary">{unit}</p>

      {/* Ticker */}
      <div
        className="relative flex touch-none cursor-ns-resize items-center gap-1 overflow-hidden py-2"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {items.map(({ idx, v }) => {
          const isSelected = idx === 0
          const dist = Math.abs(idx)
          const opacity = dist === 0 ? 1 : dist === 1 ? 0.7 : dist === 2 ? 0.45 : 0.2
          const scale = isSelected ? 1.35 : 1
          const isValid = v >= min && v <= max

          return (
            <button
              key={idx}
              type="button"
              onClick={() => isValid && onChange(clamp(v))}
              style={{ opacity, transform: `scale(${scale})`, transition: "all 0.15s ease" }}
              className={cn(
                "w-10 text-center font-heading font-bold leading-none",
                isSelected ? "text-primary text-3xl" : "text-foreground text-xl",
                !isValid && "invisible",
              )}
            >
              {isValid ? v : ""}
            </button>
          )
        })}
      </div>

      {/* Up/down nudge arrows */}
      <div className="flex flex-col items-center gap-0.5 mt-1">
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          className="text-foreground/60 hover:text-primary transition-colors"
          aria-label="Decrease"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
            <path d="M10 0L20 12H0L10 0Z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          className="text-foreground/60 hover:text-primary transition-colors"
          aria-label="Increase"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
            <path d="M10 12L0 0H20L10 12Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepGender({
  value,
  onChange,
}: {
  value: KycData["gender"] | ""
  onChange: (v: KycData["gender"]) => void
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold uppercase text-foreground">
          Tell Us About Yourself!
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          We Need To Know Your Gender
        </p>
      </div>

      <div className="flex gap-6">
        {(["male", "female"] as const).map((g) => (
          <button
            key={g}
            type="button"
            id={`kyc-gender-${g}`}
            onClick={() => onChange(g)}
            className={cn(
              "flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-full border-2 transition-all",
              value === g
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/50",
            )}
          >
            {g === "male" ? (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="10" cy="14" r="5" />
                <path d="M19 5l-5 5m0-5h5v5" />
              </svg>
            ) : (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M12 13v8m-3-4h6" />
              </svg>
            )}
            <span className="font-heading text-xs font-semibold capitalize">
              {g}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepAge({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold text-foreground">
          How Old Are You ?
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          This Helps Us Create Your Personalized Plan
        </p>
      </div>
      <ScrollPicker value={value} onChange={onChange} min={10} max={100} unit="Years Old" />
    </div>
  )
}

function StepWeight({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold text-foreground">
          What Is Your Weight ?
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          This Helps Us Create Your Personalized Plan
        </p>
      </div>
      <ScrollPicker value={value} onChange={onChange} min={30} max={200} unit="Kg" />
    </div>
  )
}

function StepHeight({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold text-foreground">
          What Is Your Height ?
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          This Helps Us Create Your Personalized Plan
        </p>
      </div>
      <ScrollPicker value={value} onChange={onChange} min={100} max={250} unit="Cm" />
    </div>
  )
}

function StepGoal({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold text-foreground">
          What Is Your Goal ?
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          This Helps Us Create Your Personalized Plan
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        {GOALS.map((goal) => (
          <button
            key={goal}
            type="button"
            id={`kyc-goal-${goal.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={() => onChange(goal)}
            className={cn(
              "flex items-center justify-between rounded-full border px-5 py-3 font-heading text-sm font-medium transition-all",
              value === goal
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/40",
            )}
          >
            <span>{goal}</span>
            <span
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full border",
                value === goal ? "border-primary bg-primary" : "border-muted-foreground",
              )}
            >
              {value === goal && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
                  <circle cx="4" cy="4" r="3" />
                </svg>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepActivity({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-extrabold text-foreground">
          Activity Level
        </h2>
        <p className="mt-2 font-heading text-sm text-muted-foreground">
          How Active Are You On A Typical Day?
        </p>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        {ACTIVITY_LEVELS.map((lvl) => (
          <button
            key={lvl.value}
            type="button"
            id={`kyc-activity-${lvl.value}`}
            onClick={() => onChange(lvl.value)}
            className={cn(
              "flex items-center justify-between rounded-full border px-5 py-3 transition-all text-left",
              value === lvl.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/40",
            )}
          >
            <div>
              <p className="font-heading text-sm font-semibold">{lvl.label}</p>
              <p className="font-sans text-xs opacity-70">{lvl.description}</p>
            </div>
            <span
              className={cn(
                "ml-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                value === lvl.value
                  ? "border-primary bg-primary"
                  : "border-muted-foreground",
              )}
            >
              {value === lvl.value && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="white">
                  <circle cx="4" cy="4" r="3" />
                </svg>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export function KycWizard({ onComplete, initialData, className }: KycWizardProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<KycData>({
    gender: initialData?.gender ?? "male",
    age: initialData?.age ?? 25,
    weight: initialData?.weight ?? 70,
    height: initialData?.height ?? 170,
    goal: initialData?.goal ?? "",
    activityLevel: initialData?.activityLevel ?? "",
  })

  const patch = <K extends keyof KycData>(key: K, val: KycData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }))

  const canNext = (): boolean => {
    if (step === 1) return data.gender !== ("" as string)
    if (step === 5) return data.goal !== ""
    if (step === 6) return data.activityLevel !== ""
    return true
  }

  const next = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
    else onComplete(data)
  }

  const back = () => setStep((s) => Math.max(1, s - 1))

  const buttonLabel = step === TOTAL_STEPS ? "Done" : step === 3 ? "Done" : "Next"

  return (
    <div
      className={cn(
        "relative flex min-h-[520px] w-full max-w-sm flex-col items-center justify-between rounded-2xl px-6 py-8",
        className,
      )}
    >
      {/* Progress */}
      <div className="flex w-full flex-col items-center gap-6">
        <ProgressRing step={step} total={TOTAL_STEPS} />

        {/* Step content */}
        <div className="flex w-full flex-col items-center">
          {step === 1 && (
            <StepGender value={data.gender} onChange={(v) => patch("gender", v)} />
          )}
          {step === 2 && (
            <StepAge value={data.age} onChange={(v) => patch("age", v)} />
          )}
          {step === 3 && (
            <StepWeight value={data.weight} onChange={(v) => patch("weight", v)} />
          )}
          {step === 4 && (
            <StepHeight value={data.height} onChange={(v) => patch("height", v)} />
          )}
          {step === 5 && (
            <StepGoal value={data.goal} onChange={(v) => patch("goal", v)} />
          )}
          {step === 6 && (
            <StepActivity
              value={data.activityLevel}
              onChange={(v) => patch("activityLevel", v)}
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex w-full max-w-xs flex-col items-center gap-3">
        <button
          type="button"
          id="kyc-next-btn"
          disabled={!canNext()}
          onClick={next}
          className={cn(
            "h-12 w-full rounded-full font-heading text-sm font-extrabold transition-all",
            canNext()
              ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
              : "cursor-not-allowed bg-secondary text-muted-foreground",
          )}
        >
          {buttonLabel}
        </button>

        {step > 1 && (
          <button
            type="button"
            id="kyc-back-btn"
            onClick={back}
            className="font-heading text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Back
          </button>
        )}
      </div>
    </div>
  )
}
