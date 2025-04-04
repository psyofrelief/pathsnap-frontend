import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("./LoginClient"));

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Login`,
    description: "Login to your account",
  };
}

export default function Login() {
  return <LoginPage />;
}
