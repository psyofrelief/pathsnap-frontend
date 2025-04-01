import Button from "@/components/ui/Button";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";
import Pill from "@/components/ui/Pill";
import Image from "next/image";

export default function Geography() {
  return (
    <Section className="justify-between flex-row border-t border-t-outline min-h-screen">
      <div className="flex flex-col gap-[100px] my-auto">
        <header className="flex flex-col">
          <Brief>
            Built to <em className="font-light">scale</em>
          </Brief>
          <p>
            Whether you need millions of links or billions of clicks, we've got
            you covered. We’re not bound by geography so tap in today.
          </p>
          <Link href={"/register"} className="flex w-fit">
            <Button className="mt-md">Get started</Button>
          </Link>
        </header>

        <div className="flex flex-col gap-xs">
          <p className="text-foreground-secondary">
            We’ve shortened hundreds links from these countries:
          </p>
          <ul className="flex flex-wrap gap-xs">
            {countries.map((e) => (
              <Pill className="m-0" key={Math.random()}>
                {e}
              </Pill>
            ))}
          </ul>
        </div>
      </div>

      <Image
        src={"/images/globe.jpg"}
        className="mix-blend-lighten aspect-square  size-[500px] my-auto"
        height={1000}
        width={1000}
        alt="Globe"
      />
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
