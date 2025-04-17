import Image from "next/image";
import { useState } from "react";
import LinkCardButton from "./LinkCardButton";
import ClickIcon from "@/components/icons/ClickIcon";
import ArrowDownRightIcon from "@/components/icons/ArrowDownRight";
import { toast } from "sonner";
import EditLinkDialog from "@/components/forms/EditLinkForm";
import QrCodeDialog from "@/app/(app)/links/components/QrCodeDialog";
import type { Link } from "@/types/link";

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      toast(`Failed to copy: ${err}`);
    }
  };

  return (
    <li className="p-md bg-background max-w-[800px] w-full rounded border border-outline flex flex-col gap-md">
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
            onError={() => setFaviconSrc("/images/fallback_icon.webp")}
          />
          <header className="flex flex-col gap-y-xs">
            {title && <p className="leading-none">{title}</p>}
            <p className="whitespace-nowrap leading-none">
              q.p-s.co/<span className="font-semibold">{short_url}</span>
            </p>
            <a
              href={url}
              rel="noreferrer"
              target="_blank"
              aria-label={`Visit ${url}`}
              className="text-xs gap-x-1 flex items-center mt-[1px] text-foreground-secondary hover:underline"
            >
              <ArrowDownRightIcon />
              {url}
            </a>
          </header>
        </div>

        <div className="sm:flex hidden gap-xs">
          <LinkCardButton
            onClick={() => {
              const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
              if (!backendUrl) {
                console.error("Backend URL is not defined");
                return;
              }
              copyToClipboard(`${backendUrl}/${short_url}`);
            }}
          >
            Copy
          </LinkCardButton>

          <QrCodeDialog shortUrl={link.short_url} qrCodeUrl={link.qr_code} />

          <EditLinkDialog link={link} />
        </div>
      </div>

      <div className="flex justify-between items-end ml-[72px]">
        <p className="text-xs text-foreground-secondary">{formattedDate}</p>
        <p className="rounded-full flex items-center gap-xs border bg-popover border-outline px-xs py-1 text-xs">
          <ClickIcon />
          {clicks} click{clicks !== 1 && "s"}
        </p>
      </div>

      <div className="flex sm:hidden gap-xs">
        <LinkCardButton
          onClick={() => {
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
              console.error("Backend URL is not defined");
              return;
            }
            copyToClipboard(`${backendUrl}/${short_url}`);
          }}
        >
          Copy
        </LinkCardButton>

        <QrCodeDialog shortUrl={link.short_url} qrCodeUrl={link.qr_code} />

        <EditLinkDialog link={link} />
      </div>
    </li>
  );
}
