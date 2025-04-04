import dynamic from "next/dynamic";

const VerifyEmailPage = dynamic(() => import("./VerifyEmailClient"));

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Verify email`,
    description: "Verify your email",
  };
}

export default function Register() {
  return <VerifyEmailPage />;
}
