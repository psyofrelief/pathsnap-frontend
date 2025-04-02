import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { faqs } from "@/data/faqs";

export default function Faq() {
  return (
    <Section className="bg-background justify-center min-h-screen gap-y-lg">
      <header className="flex flex-col items-center">
        <Brief>Frequently Asked Questions</Brief>
        <p>What would you like to know about Pzag?</p>
      </header>
      <Accordion
        type="single"
        collapsible
        className=" grid grid-cols-2 gap-xs flex-col "
      >
        {faqs.map((e, idx) => (
          <AccordionItem value={`Question ${idx}`} key={Math.random()}>
            <AccordionTrigger>{e.question}</AccordionTrigger>
            <AccordionContent>{e.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
