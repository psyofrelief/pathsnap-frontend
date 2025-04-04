"use client";

import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthSessionStatus from "@/components/ui/AuthSessionStatus";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";

export default function Login() {
  const [status, setStatus] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("reset")) {
      setStatus("Password has been reset, please login.");
    }
  }, [searchParams]);

  return (
    <Section className="items-center justify-center flex-1 gap-y-sm sm:!py-md relative">
      <Brief>Login to your account</Brief>
      {status && <AuthSessionStatus className="" status={status} />}
      <LoginForm />
      <p className="z-[1]">
        Dont have an account?{" "}
        <span>
          <Link className="underline   underline-offset-4" href={"/register"}>
            Sign Up
          </Link>
        </span>
      </p>
    </Section>
  );
}
