import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Pill({ children, className = "" }: Props) {
  return (
    <li
      className={cn(
        "bg-popover flex whitespace-nowrap justify-center items-center gap-1 rounded-full px-sm text-xs py-xs m-0 w-full sm:w-fit mx-auto",
        className,
      )}
    >
      {children}
    </li>
  );
}
