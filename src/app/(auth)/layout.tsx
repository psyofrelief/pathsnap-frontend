import Link from "next/link";
import AuthCard from "@/app/(auth)/AuthCard";
import ApplicationLogo from "@/components/ApplicationLogo";
import Logo from "@/components/shared/Logo";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";

export const metadata = {
  title: "Laravel",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 relative justify-center">
      <Link href={"/"} className="flex m-md absolute -top-[3px] left-0 z-[99]">
        <Logo />
      </Link>
      {children}
      <BackgroundBeams />
    </div>
  );
}
