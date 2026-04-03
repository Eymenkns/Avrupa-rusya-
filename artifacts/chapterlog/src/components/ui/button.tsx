import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "accent" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variants = {
      default: "bg-secondary text-foreground hover:bg-secondary/80 shadow-md",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-accent/40",
      outline: "border border-foreground/20 text-foreground hover:bg-white/8 hover:border-foreground/40",
      ghost: "hover:bg-white/8 hover:text-accent",
      link: "text-accent underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-14 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
