import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export default function FooterLink({ href, label }: Props) {
  return (
    <li className="flex">
      <Link className="flex-1 hover:underline text-xs" href={href}>
        {label}
      </Link>
    </li>
  );
}
