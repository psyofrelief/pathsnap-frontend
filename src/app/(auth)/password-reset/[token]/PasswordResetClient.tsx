"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import FormMessage from "@/components/ui/FormMessage";
import { useAuth } from "@/hooks/auth";
import Section from "@/components/ui/Section";
import Brief from "@/components/ui/Brief";
import AuthSessionStatus from "@/components/ui/AuthSessionStatus";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  password_confirmation: z
    .string()
    .min(6, { message: "Password confirmation must be at least 6 characters" }),
});

const PasswordReset = () => {
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth({ middleware: "guest" });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: "",
      password_confirmation: "",
    },
  });

  interface FormValues {
    email: string;
    password: string;
    password_confirmation: string;
  }
  const submitForm = (values: FormValues) => {
    setLoading(true);
    resetPassword({
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      setErrors: (apiErrors) => {
        if (apiErrors.email) {
          setError("email", { type: "server", message: apiErrors.email[0] });
        }
        if (apiErrors.password) {
          setError("password", {
            type: "server",
            message: apiErrors.password[0],
          });
        }
        if (apiErrors.password_confirmation) {
          setError("password_confirmation", {
            type: "server",
            message: apiErrors.password_confirmation[0],
          });
        }
      },
      setLoading,
      setStatus,
    });
  };

  return (
    <Section className="justify-center items-center gap-y-lg">
      <header className="flex flex-col items-center">
        <Brief>Reset your password</Brief>
        <p>Enter a new password for this account.</p>
      </header>

      {status && <AuthSessionStatus status={status} />}

      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-y-4 w-full max-w-[800px] bg-background border border-outline p-md"
      >
        {/* Email Address */}
        <div className="flex flex-col gap-y-xs">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="example@gmail.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <FormMessage className="mt-2">{errors.email.message}</FormMessage>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-xs mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="New password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <FormMessage className="mt-2">
              {errors.password.message}
            </FormMessage>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-y-xs mt-4">
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            type="password"
            placeholder="Confirm your password"
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <FormMessage className="mt-2">
              {errors.password_confirmation.message}
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
