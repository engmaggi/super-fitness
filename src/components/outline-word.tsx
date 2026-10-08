import { useId, useLayoutEffect, useRef, useState } from "react"
import { cn } from "cn"

// ---- Tune these to match Figma -------------------------------------------
const FONT_SIZE = 64 // Figma font size (px)
const STROKE = 2 // stroke width; the visible OUTSIDE part is half of this (1px)
const PAD = 4 // extra room so the stroke isn't cut off at the edges

// Gradient stroke: top -> bottom (Figma: 177.84deg, -10% -> 71%)
const STROKE_START = "rgb(255 255 255 / 1)" // top: pure white
const STROKE_END = "rgb(255 255 255 / 0.45)" // bottom: still white, softer
// ---------------------------------------------------------------------------

interface OutlineWordProps {
  children: string
  className?: string
}

export function OutlineWord({ children, className }: OutlineWordProps) {
  const id = useId().replace(/:/g, "")
  const textRef = useRef<SVGTextElement>(null)
  const [box, setBox] = useState({ x: 0, y: 0, w: 400, h: 100 })

  useLayoutEffect(() => {
    const measure = () => {
      const b = textRef.current?.getBBox()
      if (b) setBox({ x: b.x, y: b.y, w: b.width, h: b.height })
    }
    measure()
    document.fonts.ready.then(measure) // measure again once the font is loaded
  }, [children])

  const word = children.toUpperCase()
  const textProps = {
    x: 0,
    y: FONT_SIZE,
    fontSize: FONT_SIZE,
    className: "font-heading font-bold",
  }

  return (
    <svg
      role="img"
      aria-label={children}
      viewBox={`${box.x - PAD} ${box.y - PAD} ${box.w + PAD * 2} ${box.h + PAD * 2}`}
      style={{ maxWidth: box.w + PAD * 2 }}
      className={cn("mx-auto h-auto w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="-0.1" x2="0.03" y2="0.71">
          <stop offset="0" stopColor={STROKE_START} />
          <stop offset="1" stopColor={STROKE_END} />
        </linearGradient>

        {/* The mask hides the INSIDE half of the stroke, so only the outside stays */}
        <mask id={`${id}-outside`}>
          <rect x="-50%" y="-50%" width="200%" height="200%" fill="white" />
          <text {...textProps} fill="black">
            {word}
          </text>
        </mask>
      </defs>

      {/* Fill is fully transparent (fill="none"), only the outside stroke is drawn */}
      <text
        ref={textRef}
        {...textProps}
        fill="none"
        stroke={`url(#${id}-stroke)`}
        strokeWidth={STROKE}
        mask={`url(#${id}-outside)`}
      >
        {word}
      </text>
    </svg>
  )
}