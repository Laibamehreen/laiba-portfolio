import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-lavender-400 text-navy-950 shadow-sm hover:bg-lavender-300",
        secondary:
          "border-lavender-400/20 bg-lavender-400/10 text-lavender-300 hover:bg-lavender-400/20 hover:border-lavender-400/40",
        outline:
          "border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-lavender-400/40 hover:bg-lavender-400/10",
        destructive:
          "border-transparent bg-red-500/20 text-red-300 hover:bg-red-500/30",
        glow:
          "border-lavender-400/30 bg-navy-900/80 text-lavender-200 shadow-lavender-sm hover:border-lavender-400 hover:shadow-lavender-md",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
