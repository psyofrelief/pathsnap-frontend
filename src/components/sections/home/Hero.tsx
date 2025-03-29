import Button from "@/components/ui/Button";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";

export default function Hero() {
  return (
    <Section className="justify-between min-h-screen-minus-navbar">
      <p className="bg-popover rounded-full px-sm text-xs py-xs w-fit mx-auto">
        Introducing pzag
      </p>
      <header className="flex flex-col gap-y-xs max-w-[500px]">
        <Brief>
          Take <em>full</em> control over your links
        </Brief>
        <p>
          Easily shorten and manage your URLs with Shor10. Create branded short
          links, generate customisable QR codes, build link in bio pages, and
          run interactive surveys.
        </p>
        <div className="flex gap-sm mt-md">
          <Link href={"/register"} className="flex-1 flex">
            <Button>Get started</Button>
          </Link>
          <Link href={"/about"} className="flex">
            <Button variant="outline">About us</Button>
          </Link>
        </div>
      </header>
    </Section>
  );
}
