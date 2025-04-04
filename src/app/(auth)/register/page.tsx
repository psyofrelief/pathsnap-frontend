import dynamic from "next/dynamic";

const RegisterPage = dynamic(() => import("./RegisterClient"));

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Sign up`,
    description: "Sign up for an account",
  };
}

export default function Register() {
  return <RegisterPage />;
}
