import dynamic from "next/dynamic";

const LinksPage = dynamic(() => import("./LinksClient"));

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Your links`,
    description: "View your links",
  };
}

export default function Page() {
  return <LinksPage />;
}
