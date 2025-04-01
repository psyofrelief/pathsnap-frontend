import Image from "next/image";
import { useState } from "react";
import QrCodeIcon from "../icons/QrCodeIcon";
import EditIcon from "../icons/EditIcon";
import LinkCardButton from "./LinkCardButton";
import ClickIcon from "../icons/ClickIcon";
import ArrowDownRightIcon from "../icons/ArrowDownRight";
import { toast } from "sonner";
import EditLinkDialog from "../forms/EditLinkForm";
import ShareDialog from "@/app/(app)/links/components/ShareDialog";
import QrCodeDialog from "@/app/(app)/links/components/QrCodeDialog";

interface Link {
  id: string;
  title?: string;
  short_url: string;
  url: string;
  qr_code: string;
  clicks: number;
  created_at: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon, title, desc }: Feature) {
  return (
    <li className="flex flex-col  bg-popover rounded p-md  gap-md borde border-outline">
      {icon}
      <header>
        <p className="font-semibold">{title}</p>
        <p className="text-foreground-secondary">{desc}</p>
      </header>
    </li>
  );
}
