"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthSessionStatus from "@/components/ui/AuthSessionStatus";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";
import FormMessage from "@/components/ui/FormMessage";

const PasswordReset = () => {
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth({ middleware: "guest" });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({}); // Reset errors before sending request

    resetPassword({
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
      setLoading,
      setStatus,
    });
  };

  useEffect(() => {
    setEmail(searchParams.get("email") ?? "");
  }, [searchParams]);

  return (
    <Section className="justify-center items-center gap-y-lg">
      <header className="flex flex-col items-center">
        <Brief>Reset your password</Brief>
        <p>Enter a new password for this account.</p>
      </header>

      {status && <AuthSessionStatus status={status} />}

      <form
        onSubmit={submitForm}
        className="flex flex-1 bg-background flex-col w-full border border-outline p-md max-w-[800px] gap-y-4"
      >
        {/* Email Address */}
        <div className="flex flex-col gap-y-xs">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="example@gmail.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
          />
          {errors.email && (
            <FormMessage className="mt-2">{errors.email[0]}</FormMessage>
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="New password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {errors.password && (
            <FormMessage className="mt-2">{errors.password[0]}</FormMessage>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>
          <Input
            id="passwordConfirmation"
            type="password"
            placeholder=""
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />
          {errors.password_confirmation && (
            <FormMessage className="mt-2">
              {errors.password_confirmation[0]}
            </FormMessage>
          )}
        </div>

        <Button type="submit" className="w-full" isLoading={loading}>
          Reset Password
        </Button>
      </form>
    </Section>
  );
};

export default PasswordReset;
