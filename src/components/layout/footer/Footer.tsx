import Link from "next/link";
import Logo from "../../shared/Logo";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="flex z-[0] px-md py-md border-t border-t-outline sticky bottom-0 w-full bg-background justify-between items-center">
      <div className="flex gap-sm items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <p className="text-xs">Copyright 2025 © All rights reserved</p>
      </div>

      <ul className="flex items-center gap-sm">
        {footerLinks.map((e) => (
          <FooterLink label={e.label} href={e.href} key={e.href} />
        ))}
      </ul>
    </footer>
  );
}

const footerLinks = [
  { label: "Terms Of Use", href: "/terms-of-use" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
