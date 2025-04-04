import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import Brief from "@/components/ui/Brief";
import Section from "@/components/ui/Section";

export async function generateMetadata() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
  return {
    title: `${appName} | Sign up`,
    description: "Sign up for an account",
  };
}
const Page = () => {
  return (
    <Section className="items-center justify-center flex-1 gap-y-sm sm:!py-md relative">
      <Brief>Sign up for an account</Brief>
      <RegisterForm />
      <p className="z-[1]">
        Already have an account?{" "}
        <span>
          <Link className="underline underline-offset-4" href={"/login"}>
            Login
          </Link>
        </span>
      </p>
    </Section>
  );
};

export default Page;
