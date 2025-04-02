import Button from "@/components/ui/Button";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";

export default function Hero() {
  return (
    <Section className="justify-center bg-radial from-accent/20 to-background via-background items-center min-h-screen-minus-navbar">
      <header className="flex flex-col items-center gap-xs ">
        <Brief>Take full control over your links</Brief>
        <p className="text-center max-w-[690px]">
          Easily shorten and manage your URLs with Shor10. Create branded short
          links, generate customisable QR codes, build link in bio pages, and
          run interactive surveys.
        </p>
        <div className="flex gap-sm">
          <Link href={"/register"} className="flex-1 flex mt-md">
            <Button>Get started</Button>
          </Link>
          <Link
            href={"https://github.com/psyofrelief/pzag-frontend"}
            className="flex-1 flex mt-md"
          >
            <Button variant="outline">Source Code</Button>
          </Link>
        </div>
      </header>
    </Section>
  );
}
