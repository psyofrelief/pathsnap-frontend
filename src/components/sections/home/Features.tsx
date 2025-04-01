import Button from "@/components/ui/Button";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";
import Heading from "@/components/ui/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { features } from "@/data/featureCards";
import FeatureCard from "@/components/ui/FeatureCard";
import Image from "next/image";

export default function Features() {
  return (
    <Section className="bg-background border-t-outline  items-center  gap-y-xl ">
      <header className="flex flex-col items-center">
        <Brief className=" text-center max-w-[950px]">
          More than just a URL shortener—unlock powerful analytics, custom
          branding, and seamless sharing to elevate your online presence.
        </Brief>
      </header>

      <ul className="flex w-full gap-sm">
        {features.map((e) => (
          <FeatureCard
            icon={e.icon}
            title={e.title}
            key={e.title}
            desc={e.desc}
          />
        ))}
      </ul>
    </Section>
  );
}
