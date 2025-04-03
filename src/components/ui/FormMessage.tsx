import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}
export default function FormMessage({ className = "", children }: Props) {
  return (
    <p className={cn("text-xs text-foreground-destructive", className)}>
      {children}
    </p>
  );
}
