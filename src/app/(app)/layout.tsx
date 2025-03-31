import Navbar from "@/components/layout/navbar/Navbar";
import { Toaster } from "@/components/ui/Sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster />
      <Navbar />
      {children}
    </>
  );
}
