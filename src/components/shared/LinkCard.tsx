import Image from "next/image";

interface Link {
  id: string;
  title?: string;
  short_url: string;
  url: string;
  qr_code: string;
  clicks: string;
  created_at: string;
}

interface LinkProps {
  link: Link;
}

export default function LinkCard({ link }: LinkProps) {
  const { title, short_url, url, clicks, created_at } = link;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(created_at));

  const domain = new URL(url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

  return (
    <li className="p-md max-w-[800px] w-full rounded border border-outline flex flex-col gap-md">
      <div className="flex justify-between">
        <div className="flex gap-md">
          {/*<div className="rounded-full bg-popover size-full aspect-square" />*/}
          {/* Favicon */}
          <Image
            src={faviconUrl}
            alt="Favicon"
            loading="eager"
            width={48}
            height={48}
            className="size-[48px] aspect-square rounded"
            onError={(e) => (e.currentTarget.src = "/fallback-favicon.png")} // Optional fallback
          />
          <header className="flex flex-col">
            {title && <p>{title}</p>}
            <p className="whitespace-nowrap">
              pz.ag/<span className="font-semibold">{short_url}</span>
            </p>
            <p className="text-xs">{url}</p>
          </header>
        </div>

        <div className="flex gap-xs">
          {["Copy", "Share", "QR", "Edit"].map((action) => (
            <p
              key={action}
              className="rounded-full h-fit border border-outline px-sm py-xs text-xs"
            >
              {action}
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-end">
        <p className="text-xs text-foreground-secondary">{formattedDate}</p>
        <p className="rounded-full border bg-popover border-outline px-xs py-1 text-xs">
          {clicks} clicks
        </p>
      </div>
    </li>
  );
}
