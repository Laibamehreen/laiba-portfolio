import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender-400 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-lavender-400 text-navy-950 shadow-lavender-sm hover:bg-lavender-300 hover:shadow-lavender-md",
        outline:
          "border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08] hover:text-white hover:border-lavender-400/40",
        secondary:
          "bg-navy-800 text-slate-200 hover:bg-navy-700 hover:text-white border border-white/10",
        ghost:
          "hover:bg-white/[0.08] text-slate-300 hover:text-white",
        link: "text-lavender-400 underline-offset-4 hover:underline",
        glass:
          "bg-white/[0.06] backdrop-blur-md border border-white/15 text-white hover:bg-lavender-400/15 hover:border-lavender-400/50 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
