import { Dumbbell } from "lucide-react"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-primary">
        <Dumbbell className="size-6" aria-hidden="true" />
        <span className="font-heading text-lg font-semibold text-foreground">
          Super Fitness
        </span>
      </div>
    </div>
  )
}
