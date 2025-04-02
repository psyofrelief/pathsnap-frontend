import AnalyticsIcon from "@/components/icons/feature/AnalyticsIcon";
import LinkIcon from "@/components/icons/feature/LinkIcon";
import QrCodeIcon from "@/components/icons/feature/QrCodeIcon";

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const features: Feature[] = [
  {
    icon: <LinkIcon />,
    title: "Custom Links",
    desc: "Customize your shortened links to reflect your interests or brand. Make distinctive URLs that are simple to remember.",
  },
  {
    icon: <QrCodeIcon />,
    title: "QR Codes",
    desc: "Generate unique QR codes for your abbreviated URLs. They can be scanned for offline access and are completely free.",
  },
  {
    icon: <AnalyticsIcon />,
    title: "Analytics",
    desc: "Monitor how well your shortened links are doing. Get 100% accurate information about how many clicks your shortened links get.",
  },
];
