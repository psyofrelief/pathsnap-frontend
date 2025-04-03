import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import Link from "next/link";
import Button from "@/components/ui/Button";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import MenuNavLink from "./MenuNavLink";
import { useNavClick } from "@/hooks/useNavClick";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import EditUserDialog from "@/components/forms/EditAccountForm";

export default function Menu() {
  const handleNavClick = useNavClick();
  const { user, logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="left">
      <VisuallyHidden>
        <DrawerTitle>Menu</DrawerTitle>
      </VisuallyHidden>
      <DrawerTrigger className="cursor-pointer hover:underline hover:text-accent transition-colors">
        Menu
      </DrawerTrigger>
      <DrawerContent>
        <MenuNavLink onClick={closeDrawer} label="Home" href="/" />
        <MenuNavLink
          onClick={(e) => {
            handleNavClick(e);
            closeDrawer();
          }}
          label="FAQ"
          href="/#faq"
        />
        <MenuNavLink onClick={closeDrawer} label="Support" href="/support" />

        {user && (
          <MenuNavLink onClick={closeDrawer} label="Links" href="/links" />
        )}
        <DrawerFooter>
          {!user ? (
            <>
              <Link href={"/login"}>
                <Button onClick={closeDrawer} className="w-full">
                  Login
                </Button>
              </Link>

              <Link href={"/register"}>
                <Button
                  onClick={closeDrawer}
                  variant={"outline"}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <EditUserDialog isMenu user={user} />
              <Button
                className="w-full"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
