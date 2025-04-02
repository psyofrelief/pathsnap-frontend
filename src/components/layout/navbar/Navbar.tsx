"use client";

import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import Logo from "../../shared/Logo";
import NavLink from "./NavLink";
import Button from "../../ui/Button";
import EditUserDialog from "@/components/forms/EditAccountForm";
import Loading from "../Loading";
import { useState } from "react";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth({ middleware: "auth" });

  if (user === undefined) {
    return <Loading />;
  }

  return (
    <nav className="flex z-[1] bg-background justify-between items-center px-md py-sm">
      <div className="flex gap-x-md items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="h-md w-[2px] bg-outline" />
        <ul className="gap-x-sm flex items-center">
          {user && <NavLink label="Links" href="/links" />}
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
        <div className="flex gap-x-sm items-center">
          <EditUserDialog user={user} />
          <Button
            isLoading={loading}
            className="flex-0"
            variant="outline"
            onClick={() => {
              logout({ setLoading });
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
