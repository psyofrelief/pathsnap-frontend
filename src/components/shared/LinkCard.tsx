import Image from "next/image";
import { useState } from "react";
import QrCodeIcon from "../icons/QrCodeIcon";
import EditIcon from "../icons/EditIcon";
import LinkCardButton from "./LinkCardButton";
import ClickIcon from "../icons/ClickIcon";
import ArrowDownRightIcon from "../icons/ArrowDownRight";

interface Link {
  id: string;
  title?: string;
  short_url: string;
  url: string;
  qr_code: string;
  clicks: number;
  created_at: string;
}

interface LinkProps {
  link: Link;
}

export default function LinkCard({ link }: LinkProps) {
  const { title, short_url, url, clicks, created_at } = link;
  const domain = new URL(url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  const [faviconSrc, setFaviconSrc] = useState(faviconUrl);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(created_at));

  return (
    <li className="p-md max-w-[800px] w-full rounded border border-outline flex flex-col gap-md">
      <div className="flex justify-between">
        <div className="flex gap-md">
          {/* Favicon */}
          <Image
            src={faviconSrc}
            alt="Favicon"
            loading="eager"
            width={48}
            height={48}
            className="size-[48px] aspect-square rounded"
            onError={() => setFaviconSrc("/images/fallback_icon.png")}
          />
          <header className="flex flex-col gap-y-xs">
            {title && <p className="leading-none">{title}</p>}
            <p className="whitespace-nowrap leading-none">
              pz.ag/<span className="font-semibold">{short_url}</span>
            </p>
            <a
              href={url}
              rel="noreferrer"
              target="_blank"
              className="text-xs gap-x-1 flex items-center mt-[1px] text-foreground-secondary hover:underline"
            >
              <ArrowDownRightIcon />
              {url}
            </a>
          </header>
        </div>

        <div className="flex gap-xs">
          <LinkCardButton>Copy</LinkCardButton>
          <LinkCardButton>Share</LinkCardButton>

          <LinkCardButton>
            <QrCodeIcon />
          </LinkCardButton>
          <LinkCardButton>
            <EditIcon />
          </LinkCardButton>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <p className="text-xs text-foreground-secondary">{formattedDate}</p>
        <p className="rounded-full flex items-center gap-xs border bg-popover border-outline px-xs py-1 text-xs">
          <ClickIcon />
          {clicks} click{clicks !== 1 && "s"}
        </p>
      </div>
    </li>
  );
}
