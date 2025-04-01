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
    <Section className="border-t border-t-outline  items-center flex-row gap-x-lg grid-cols-2">
      <div className="flex flex-col gap-y-xl max-w-[640px]">
        <ul className="flex flex-col gap-y-sm">
          {features.map((e) => (
            <FeatureCard
              icon={e.icon}
              title={e.title}
              key={e.title}
              desc={e.desc}
            />
          ))}
        </ul>
      </div>
      <Image
        src={"/images/feature_image.png"}
        height={500}
        width={430}
        alt="fff"
        className="mix-blend-lighten mx-auto"
      />
    </Section>
  );
}
