import * as React from "react"
import { cn } from "cn"
import {ArrowUpRight} from "lucide-react"

function Card({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { 
  size?: "default" | "sm"
variant?:"default" | "media" 
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
     className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        "data-[variant=media]:relative data-[variant=media]:gap-0 data-[variant=media]:rounded-[28px] data-[variant=media]:bg-transparent data-[variant=media]:ring-0",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing) w-full",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-[23px] leading-8.5 font-bold text-primary-foreground group-data-[size=sm]/card:text-sm",
        "group-data-[variant=media]/card:text-lg group-data-[variant=media]/card:tracking-widest group-data-[variant=media]/card:uppercase",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xl font-medium text-primary", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
       "group-data-[variant=media]/card:absolute group-data-[variant=media]/card:inset-x-0 group-data-[variant=media]/card:bottom-0 group-data-[variant=media]/card:flex-col group-data-[variant=media]/card:items-start group-data-[variant=media]/card:gap-3 group-data-[variant=media]/card:border-t-0 group-data-[variant=media]/card:bg-white/50 dark:group-data-[variant=media]/card:bg-[#24242480] group-data-[variant=media]/card:backdrop-blur-[58.2px]",
        className
      )}
      {...props}
    />
  )
}

function CardLink({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="card-link"
      className={cn(
        "flex items-center gap-2 font-medium text-primary",
        className
      )}
      {...props}
    >
      {children}
      <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
        <ArrowUpRight className="size-3.5" />
      </span>
    </button>
  )
}
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardLink
}
