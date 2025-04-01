import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Pill from "@/components/ui/Pill";
import LinkCardButton from "@/components/shared/LinkCardButton";
import QrCodeIcon from "@/components/icons/QrCodeIcon";

interface Props {
  shortUrl: string;
}

export default function ShareDialog({ shortUrl }: Props) {
  const [open, setOpen] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="rounded-full bg-background h-fit border border-outline px-sm py-xs text-xs hover:bg-popover transition-colors"
        asChild
      >
        <LinkCardButton>Share</LinkCardButton>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] items-center flex flex-col">
        <Pill>{`${backendUrl}/${shortUrl}`}</Pill>
        <DialogHeader>
          <DialogTitle>Share your link to one of these providers</DialogTitle>
        </DialogHeader>
        <div className="flex w-full gap-xs mt-md">
          <LinkCardButton>Facebook</LinkCardButton>
          <LinkCardButton>Instagram</LinkCardButton>
          <LinkCardButton>LinkedIn</LinkCardButton>
          <LinkCardButton>Email</LinkCardButton>
          <LinkCardButton>Twitter (X)</LinkCardButton>
          <LinkCardButton>Tiktok</LinkCardButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
