"use client";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav>
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
