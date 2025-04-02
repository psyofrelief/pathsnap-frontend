import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/navbar/Navbar";
import { Toaster } from "@/components/ui/Sonner";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Image
        className="fixed inset-0 w-full z-[0]"
        src={"/images/background.png"}
        height={1920}
        width={1080}
        alt="background"
      />
      <Toaster />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
