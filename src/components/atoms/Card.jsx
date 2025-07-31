import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ children, className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "metric-card",
    glass: "glass-effect rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300",
    outline: "bg-white border border-surface-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300",
    elevated: "bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]",
  };

  return (
    <div
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;