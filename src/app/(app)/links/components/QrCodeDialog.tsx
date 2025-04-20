import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import Pill from "@/components/ui/Pill";
import LinkCardButton from "./LinkCardButton";
import Image from "next/image";
import QrCodeIcon from "@/components/icons/QrCodeIcon";

interface Props {
  shortUrl: string;
  qrCodeUrl: string;
}

export default function ShareDialog({ shortUrl, qrCodeUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="rounded-full w-fit bg-background h-fit border border-outline px-sm py-xs text-xs hover:bg-popover transition-colors"
        asChild
      >
        <LinkCardButton>
          <QrCodeIcon />
        </LinkCardButton>
      </DialogTrigger>
      <DialogContent className=" items-center w-full sm:max-w-[400px] max-w-[320px] rounded  flex flex-col">
        <Pill className="w-fit">{`q.p-s.co/${shortUrl}`}</Pill>
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
