import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";

import { features } from "@/data/featureCards";
import FeatureCard from "@/components/ui/FeatureCard";

export default function Features() {
  return (
    <Section className="bg-background border-t-outline  items-center  gap-y-xl ">
      <header className="flex flex-col items-center">
        <Brief className=" text-center max-w-[950px]">
          Monitor, and make every click matter.
        </Brief>
      </header>

      <ul className="flex flex-col md:flex-row w-full gap-sm">
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
