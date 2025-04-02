"use client";

import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  as: Tag = "section",
  children,
  className = "",
  ...props
}: Props) {
  return (
    <Tag
      className={cn(
        "sm:px-lg sm:py-2xl z-[1] px-sm py-md flex flex-col ",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
