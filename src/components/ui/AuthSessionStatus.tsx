import { cn } from "@/lib/utils";

interface Props {
  status: string;
  className?: string;
}
const AuthSessionStatus = ({ status, className = "" }: Props) => (
  <p className={cn("mb-xs font-medium text-foreground-success", className)}>
    {status}
  </p>
);

export default AuthSessionStatus;
