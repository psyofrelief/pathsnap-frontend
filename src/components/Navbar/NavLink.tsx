import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: Props) {
  return (
    <li className="flex">
      <Link href={href}>{label}</Link>
    </li>
  );
}
