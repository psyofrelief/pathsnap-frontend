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
  const [loading, setLoading] = useState(true);

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
        <div className="aspect-square w-full max-w-[300px] p-lg rounded bg-white flex items-center justify-center">
          {loading && <span className="loader" />} {/* Loader */}
          <Image
            loading="eager"
            src={qrCodeUrl}
            alt="QR Code"
            height={300}
            width={300}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            className={loading ? "hidden" : "block"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
