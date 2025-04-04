import dynamic from "next/dynamic";

const ForgotPasswordPage = dynamic(() => import("./ForgotPasswordClient"));

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Forgot password`,
    description: "Forgot your password? Enter email to send reset link.",
  };
}

export default function Register() {
  return <ForgotPasswordPage />;
}
