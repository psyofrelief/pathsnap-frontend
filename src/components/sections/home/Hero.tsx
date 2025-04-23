import Button from "@/components/ui/Button";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

export default function Hero() {
  return (
    <Section className="justify-center bg-radial from-accent/20 to-background via-background items-center min-h-screen-minus-navbar">
      <header className="flex flex-col items-center gap-md">
        <TextGenerateEffect
          className="text-lg text-center leading-tight sm:text-xl max-w-[300px] sm:max-w-full font-display"
          words="Take full control over your links"
        />
        <p className="text-center max-w-[330px] sm:max-w-[490px]">
          Need trackable QR codes and shorter links? Create, modify and monitor
          your URLs in a matter of seconds with PathSnap.
        </p>
        <div className="flex gap-md">
          <Link href={"/register"} className="flex-1 flex">
            <Button className="flex-1 size-full">Get started</Button>
          </Link>
          <a
            href={"https://github.com/psyofrelief/pathsnap"}
            className="flex-1 flex"
            rel="noreferrer noopener"
            target="_blank"
            aria-label="View the source code for this website"
          >
            <Button variant="outline" className="flex-1 size-full">
              Source Code
            </Button>
          </a>
        </div>
      </header>
    </Section>
  );
}
