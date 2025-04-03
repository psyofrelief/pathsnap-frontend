"use client";

import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import Logo from "../../shared/Logo";
import NavLink from "./NavLink";
import Button from "../../ui/Button";
import EditUserDialog from "@/components/forms/EditAccountForm";
import Menu from "../menu/Menu";
import { useNavClick } from "@/hooks/useNavClick";
import LoadingOverlay from "../LoadingOverlay";

export default function Navbar() {
  const { user, logout } = useAuth({ middleware: "auth" });
  const handleNavClick = useNavClick();

  if (user === undefined) {
    return <LoadingOverlay />;
  }

  return (
    <nav className="flex z-[1] bg-background justify-between items-center px-md py-sm">
      <Link className="flex sm:hidden" href={"/"}>
        <Logo />
      </Link>
      <div className="flex sm:hidden">
        <Menu />
      </div>
      <div className="hidden sm:flex gap-x-md items-center">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="h-md w-[2px] bg-outline" />
        <ul className="gap-x-sm flex items-center">
          {user && <NavLink label="Links" href="/links" />}
          <NavLink label="Home" href="/" />
          <NavLink label="FAQ" href="/#faq" onClick={handleNavClick} />
          <NavLink label="Support" href="/support" />
        </ul>
      </div>
      {!user ? (
        <div className="hidden sm:flex gap-sm items-center">
          <Link href={"/login"} className="flex">
            <Button variant="outline">Login</Button>
          </Link>

          <Link href={"/register"} className="flex">
            <Button>Sign up</Button>
          </Link>
        </div>
      ) : (
        <div className="hidden sm:flex gap-x-sm items-center">
          <EditUserDialog user={user} />
          <Button
            className="flex-0"
            variant="outline"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
