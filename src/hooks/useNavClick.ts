"use client";

import { usePathname, useRouter } from "next/navigation";
import { useHandleScroll } from "./scroll";

export function useNavClick() {
  const pathname = usePathname();
  const router = useRouter();
  const scrollToSection = useHandleScroll();

  return (event: React.MouseEvent<HTMLElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      scrollToSection("faq");
    } else {
      router.push("/#faq");
    }
  };
}
