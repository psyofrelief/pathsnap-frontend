import Link from "next/link";
import Logo from "../../shared/Logo";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="flex sm:flex-row flex-col gap-y-md z-[0] px-md py-md border-t border-t-outline  w-full bg-background justify-between items-center">
      <div className="flex gap-sm items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <p className="text-xs">Copyright 2025 © All rights reserved</p>
      </div>

      <ul className="flex items-center gap-sm">
        <FooterLink label="Privacy policy" href={"/privacy-policy"} />
      </ul>
    </footer>
  );
}
