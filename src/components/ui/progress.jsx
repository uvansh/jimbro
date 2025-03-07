"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full font-bold text-3xl overflow-hidden rounded-md bg-neutral-900/20 ",
      className
    )}
    {...props}>
      <div className="absolute z-10 inset-0 flex items-center justify-center opacity-70">{value}/{props.totalvalue} {props.measure}</div>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-green-400 transition-all "
      style={{ transform: `translateX(-${100 - ((value/props.totalvalue)*100 || 0)}%)` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
