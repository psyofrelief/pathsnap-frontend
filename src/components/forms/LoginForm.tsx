import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";

import FormMessage from "../ui/FormMessage";
import Checkbox from "../ui/Checkbox";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const [loading, setLoading] = useState(false);

  const [shouldRemember, setShouldRemember] = useState(false);
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  interface ApiErrors {
    email?: string;
    password?: string;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    login({
      ...values,
      setLoading,
      setErrors: (apiErrors: ApiErrors) => {
        if (apiErrors.email)
          setError("email", { type: "server", message: apiErrors.email });
        if (apiErrors.password)
          setError("password", { type: "server", message: apiErrors.password });
      },
      remember: shouldRemember,
      setStatus: () => {},
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex z-[1] flex-col gap-y-lg px-md py-lg border border-outline rounded w-full max-w-[700px] bg-background"
    >
      {/* Email Field */}
      <div className="flex flex-col gap-y-xs">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Your email"
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-y-sm">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="********"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <FormMessage>{errors.password.message}</FormMessage>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link href={"/forgot-password"}>Forgot your password?</Link>
        <div className="flex gap-x-xs items-center">
          <label className="" htmlFor="remember">
            Remember me?
          </label>
          <Checkbox
            id="remember"
            type="checkbox"
            name="remember"
            onChange={(event) => setShouldRemember(event.target.checked)}
          />
        </div>
      </div>

      <Button isLoading={loading} type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
