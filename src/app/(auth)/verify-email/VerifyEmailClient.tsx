"use client";

import Brief from "@/components/ui/Brief";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

export default function VerifyEmail() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { logout, resendEmailVerification } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/",
  });

  return (
    <Section className="gap-y-lg items-center">
      <header className="flex flex-col gap-y-xs items-center">
        <Brief>Verify your email</Brief>
        <p className="text-center max-w-[700px]">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn&apos;t receive the email, we will gladly send you another.
        </p>
      </header>

      {status === "verification-link-sent" && (
        <p className="mb-xs text-foreground-success">
          A new verification link has been sent to the email address you
          provided during registration.
        </p>
      )}

      <div className="grid grid-cols-1 sm:w-fit w-full sm:grid-cols-2 gap-sm">
        <Button
          onClick={() => {
            resendEmailVerification({ setStatus, setLoading });
          }}
          isLoading={loading}
          className="w-full flex-1"
        >
          Resend Verification Email
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </Section>
  );
}
