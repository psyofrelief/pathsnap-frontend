import Button from "@/components/ui/Button";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";
import Pill from "@/components/ui/Pill";

export default function Geography() {
  return (
    <Section className="justify-between bg-radial  from-accent/20 via-background to-background items-center bordet border-t-outline min-h-screen">
      <div className="flex flex-col gap-[100px] items-center my-auto">
        <header className="flex flex-col items-center">
          <Brief>
            Built to <em className="font-light">scale</em>
          </Brief>
          <p className="max-w-[360px] text-center">
            No boundaries or restrictions, designed to manage billions of clicks
            and millions of links.
          </p>
          <Link href={"/register"} className="flex w-full">
            <Button className="mt-md flex-1 w-full"> Try for free</Button>
          </Link>
        </header>

        <div className="flex flex-col items-center gap-sm">
          <p className="sm:w-fit w-[200px] text-foreground-secondary text-center">
            We’ve shortened hundreds links from these countries:
          </p>
          <ul className="sm:flex grid grid-cols-3 gap-xs">
            {countries.map((e) => (
              <Pill key={Math.random()}>{e}</Pill>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

const countries = [
  "Australia",
  "New Zealand",
  "United States",
  "Russia",
  "Uzbekistan",
  "Germany",
];
