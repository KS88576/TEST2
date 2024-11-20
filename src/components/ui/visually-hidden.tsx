// components/ui/visually-hidden.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ 
  className,
  children,
  ...props 
}) => {
  return (
    <span
      className={cn(
        "sr-only",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};