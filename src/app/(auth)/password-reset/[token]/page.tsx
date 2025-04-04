import dynamic from "next/dynamic";

const PasswordResetPage = dynamic(() => import("./PasswordResetClient"));

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Reset password`,
    description: "Reset your password",
  };
}

export default function Register() {
  return <PasswordResetPage />;
}
