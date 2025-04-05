import Button from "@/components/ui/Button";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";

export default function Hero() {
  return (
    <Section className="justify-center bg-radial from-accent/20 to-background via-background items-center min-h-screen-minus-navbar">
      <header className="flex flex-col items-center gap-xs ">
        <Brief>Take full control over your links</Brief>
        <p className="text-center max-w-[450px]">
          Need trackable QR codes and shorter links? Create, modify and monitor
          your URLs in a matter of seconds with PathSnap.
        </p>
        <div className="flex gap-sm">
          <Link href={"/register"} className="flex-1 flex mt-md">
            <Button>Get started</Button>
          </Link>
          <a
            href={"https://github.com/psyofrelief/pathsnap-frontend"}
            className="flex-1 flex mt-md"
            rel="noreferrer noopener"
            target="_blank"
            aria-label="View the source code for this website"
          >
            <Button variant="outline">Source Code</Button>
          </a>
        </div>
      </header>
    </Section>
  );
}
