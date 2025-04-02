import ContactForm from "@/components/forms/ContactForm";
import Brief from "@/components/ui/Brief";
import Section from "@/components/ui/Section";

export default function SupportPage() {
  return (
    <Section className="justify-center bg-radial from-accent/20 to-background via-background/50 items-center gap-y-lg">
      <header className="flex flex-col items-center">
        <Brief>Need assistance? Send us a message</Brief>
      </header>
      <ContactForm />
    </Section>
  );
}
