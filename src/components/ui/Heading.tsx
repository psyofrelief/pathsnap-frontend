import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Heading({ children, className = "" }: Props) {
  return <p className={cn("text-xs", className)}>{children}</p>;
}
