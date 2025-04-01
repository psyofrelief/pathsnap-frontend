import ContactForm from "@/components/forms/ContactForm";
import Brief from "@/components/ui/Brief";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

export default function SupportPage() {
  return (
    <Section className="justify-center items-center gap-y-lg">
      <header className="flex flex-col items-center">
        <Heading>Support</Heading>
        <Brief>Need assistance? Send us a message</Brief>
      </header>
      <ContactForm />
    </Section>
  );
}
