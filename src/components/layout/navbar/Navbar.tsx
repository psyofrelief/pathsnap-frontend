"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import Logo from "../../shared/Logo";
import NavLink from "./NavLink";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import EditUserDialog from "@/components/forms/EditAccountForm";

export default function Navbar() {
  const { user, logout } = useAuth({ middleware: "auth" });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);
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
          <Button className="flex-0" variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
