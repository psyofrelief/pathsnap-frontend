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
    desc: "Personalise your shortened links to match your brand or preferences. Create unique URLs that are easy to remember.",
  },
  {
    icon: <QrCodeIcon />,
    title: "QR Codes",
    desc: "Generate custom QR codes for your shortened links. They are easily shareable and scannable for offline access and more.",
  },
  {
    icon: <AnalyticsIcon />,
    title: "Analytics",
    desc: "Track the performance of your shortened links. Get insights on the amount of clicks your shortened links receive with 100% accuracy.",
  },
];
