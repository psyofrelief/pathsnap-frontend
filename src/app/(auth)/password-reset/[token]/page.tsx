"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputError from "@/components/InputError";
import Label from "@/components/ui/Label";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";

const PasswordReset = () => {
  const searchParams = useSearchParams();

  const { resetPassword } = useAuth({ middleware: "guest" });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const submitForm = (event) => {
    event.preventDefault();

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
  }, [searchParams.get("email")]);

  return (
    <Section className="justify-center items-center gap-y-lg">
      <header className="flex flex-col items-center">
        <Brief>Reset your password</Brief>
        <p>Enter a new password for this account.</p>
      </header>
      {/* Session Status */}
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

          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">Confirm Password</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            placeholder="********"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />

          <InputError
            messages={errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <Button type="submit" className="w-full" isLoading={loading}>
          Reset Password
        </Button>
      </form>
    </Section>
  );
};

export default PasswordReset;
