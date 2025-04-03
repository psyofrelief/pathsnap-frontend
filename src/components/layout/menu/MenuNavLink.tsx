"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLElement> {
  href: string;
  label: string;
}

export default function MenuNavLink({ href, label, ...props }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="flex">
      <Link
        {...props}
        className={clsx(
          "flex-1 cursor-pointer px-sm py-xs rounded transition-colors hover:bg-popover",
          isActive && "bg-popover",
        )}
        href={href}
      >
        {label}
      </Link>
    </li>
  );
}
