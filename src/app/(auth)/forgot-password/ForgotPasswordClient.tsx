"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import FormMessage from "@/components/ui/FormMessage";
import AuthSessionStatus from "@/components/ui/AuthSessionStatus";
import Brief from "@/components/ui/Brief";
import Section from "@/components/ui/Section";
import { useAuth } from "@/hooks/auth";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const [status, setStatus] = useState<string | null>(null);

  // Define a type for the errors parameter based on the form schema
  interface FormErrors {
    email?: string;
  }

  function onSubmit(values: { email: string }) {
    forgotPassword({
      email: values.email,
      setErrors: (errors: FormErrors) => {
        if (typeof errors === "object" && errors !== null) {
          // biome-ignore lint/complexity/noForEach: <explanation>
          Object.entries(errors).forEach(([key, message]) => {
            setError(key as keyof typeof values, { message: String(message) });
          });
        }
      },
      setLoading,
      setStatus,
    });
  }

  return (
    <Section className="justify-center items-center gap-y-lg">
      <header className="flex flex-col items-center">
        <Brief>Forgot your password?</Brief>
        <p>
          No problem. Enter your email below, and we&apos;ll send you a password
          reset link.
        </p>
      </header>

      {status && <AuthSessionStatus status={status} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 bg-background flex-col w-full border border-outline p-md max-w-[800px] gap-y-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </div>

        <Button isLoading={loading} type="submit" className="w-full">
          Email Password Reset Link
        </Button>
      </form>
    </Section>
  );
}
