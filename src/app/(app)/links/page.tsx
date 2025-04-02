"use client";
import CreateLinkDialog from "@/components/forms/CreateLinkForm";
import Brief from "@/components/ui/Brief";
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
  const { links } = useLinks();

  useEffect(() => {
    console.log(links);
  }, [links]);

  if (!links || links.length === 0) {
    return (
      <Section className="bg-radial gap-sm items-center justify-center from-accent/20 to-background via-background flex-1">
        <Brief>You don't have any links!</Brief>
        <CreateLinkDialog />
      </Section>
    );
  }

  return (
    <Section className="gap-y-xl flex-1 bg-radial from-accent/20 to-background via-background">
      <div className="flex flex-col items-center gap-sm">
        <header className="flex flex-col items-center">
          <Brief>Manage your shortened links</Brief>
        </header>
        <CreateLinkDialog />
      </div>

      <ul className="flex flex-col gap-y-md items-center">
        {links.map((link: any) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </ul>
    </Section>
  );
}
