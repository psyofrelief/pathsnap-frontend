"use client";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import Logo from "../shared/Logo";
import NavLink from "./NavLink";
import Button from "../ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex justify-between items-center px-md py-sm">
      <div className="flex gap-x-md">
        <Logo />
        <ul className="gap-x-sm flex items-center">
          <NavLink label="About us" href="/about" />
          <NavLink label="FAQ" href="." />
          <NavLink label="Support" href="/support" />
        </ul>
      </div>
      {!user ? (
        <div className="flex gap-sm items-center">
          <Link href={"/login"} className="flex">
            <Button variant="outline">Login</Button>
          </Link>

          <Link href={"/register"} className="flex">
            <Button>Sign up</Button>
          </Link>
        </div>
      ) : (
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      )}
    </nav>
  );
}
