"use client";

import { cn } from "@/lib/utils";

interface Props<T extends React.ElementType = "button"> {
  as?: T;
  children: React.ReactNode;
  className?: string;
}

export default function LinkCardButton<T extends React.ElementType = "button">({
  as,
  children,
  className = "",
  ...props
}: Props<T> & React.ComponentPropsWithoutRef<T>) {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "rounded-full bg-background w-full whitespace-nowrap h-fit border border-outline px-sm py-xs text-xs hover:bg-popover transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
