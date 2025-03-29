import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  className?: string;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "font-medium rounded transition-colors justify-center px-sm py-xs size-fit",
        variant === "primary"
          ? "bg-accent text-foreground-accent hover:bg-foreground"
          : "border border-outline text-foreground hover:bg-popover",
        className,
      )}
      {...props} // Spread any additional props
    >
      {children}
    </button>
  );
}
