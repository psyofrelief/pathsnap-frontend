import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLElement> {
  href: string;
  label: string;
}

export default function NavLink({ href, label, ...props }: Props) {
  return (
    <li className="flex">
      <Link {...props} className="flex-1 hover:underline " href={href}>
        {label}
      </Link>
    </li>
  );
}
