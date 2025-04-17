import ContactForm from "@/components/forms/ContactForm";
import Brief from "@/components/ui/Brief";
import Section from "@/components/ui/Section";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Support`,
    description: "Contact us for support.",
  };
}

export default function SupportPage() {
  return (
    <Section className="justify-center bg-radial from-accent/20 to-background via-background/50 items-center gap-y-lg">
      <header className="flex flex-col items-center">
        <Brief className="text-center sm:max-w-full max-w-[230px]">
          Need assistance? Send us a message
        </Brief>
      </header>
      <ContactForm />
    </Section>
  );
}
