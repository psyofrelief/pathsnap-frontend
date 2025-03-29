import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: Props) {
  return (
    <li className="flex">
      <Link className="flex-1 hover:underline" href={href}>
        {label}
      </Link>
    </li>
  );
}
