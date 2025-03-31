"use client";
import CreateLinkDialog from "@/components/forms/CreateLinkForm";
import Brief from "@/components/ui/Brief";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import { useLinks } from "@/hooks/links";
import { useEffect, useState } from "react";
import LinkCard from "@/components/shared/LinkCard";

interface Link {
  id: string;
  title?: string;
  short_url: string;
  url: string;
  qr_code: string;
  clicks: number;
  created_at: string;
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[] | null>(null);
  const { getLinks } = useLinks();

  useEffect(() => {
    getLinks(setLinks);
  }, []);
  useEffect(() => {
    console.log(links);
  }, [links]);

  if (!links || links.length === 0) {
    return <p>No links</p>;
  }

  return (
    <Section className="gap-y-xl">
      <div className="flex flex-col items-center gap-sm">
        <header className="flex flex-col items-center">
          <Heading>Your links</Heading>
          <Brief>Manage your shortened links</Brief>
        </header>
        <CreateLinkDialog />
      </div>

      <ul className="flex flex-col gap-y-md items-center">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </ul>
    </Section>
  );
}
