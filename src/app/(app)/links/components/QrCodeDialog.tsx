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
import Image from "next/image";
import QrCodeIcon from "@/components/icons/QrCodeIcon";

interface Props {
  shortUrl: string;
  qrCodeUrl: string;
}

export default function ShareDialog({ shortUrl, qrCodeUrl }: Props) {
  const [open, setOpen] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="rounded-full bg-background h-fit border border-outline px-sm py-xs text-xs hover:bg-popover transition-colors"
        asChild
      >
        <LinkCardButton>
          <QrCodeIcon />
        </LinkCardButton>
      </DialogTrigger>
      <DialogContent className="w-fit items-center flex flex-col">
        <Pill>{`${backendUrl}/${shortUrl}`}</Pill>
        <DialogHeader>
          <DialogTitle className="font-lastik">Your QR Code</DialogTitle>
        </DialogHeader>
        <div className="aspect-square p-lg rounded bg-white">
          <Image
            loading="eager"
            src={qrCodeUrl}
            alt="Qr Code"
            height={300}
            width={300}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
