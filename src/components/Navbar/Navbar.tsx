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
          <NavLink label="FAQ" href="." />
          <NavLink label="Support" href="/support" />
        </ul>
      </div>
      {!user ? (
        <div className="flex gap-sm items-center">
          <Button variant="outline">
            <Link href={"/login"}>Login</Link>
          </Button>

          <Button>
            <Link href={"/register"}>Sign up</Link>
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      )}
    </nav>
  );
}
