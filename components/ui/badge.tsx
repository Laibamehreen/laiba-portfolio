import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-lavender-400 text-navy-950 hover:bg-lavender-300 font-bold",
        secondary:
          "border-white/10 bg-navy-900/85 text-lavender-300 backdrop-blur-md",
        outline:
          "border-white/10 text-slate-300 bg-white/[0.04] hover:border-lavender-400/40 hover:text-white",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        glass:
          "border-lavender-400/20 bg-lavender-400/10 text-lavender-300 backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
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
