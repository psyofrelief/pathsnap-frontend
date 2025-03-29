"use client";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import Logo from "../shared/Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="flex justify-between px-md py-sm">
      <Logo />
      {!user ? (
        <>
          <Link href={"/login"}>Login</Link>

          <Link href={"/register"}>Sign up</Link>
        </>
      ) : (
        <button onClick={logout} type="button">
          Logout
        </button>
      )}
    </nav>
  );
}
