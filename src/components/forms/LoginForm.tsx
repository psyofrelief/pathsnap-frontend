import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
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
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const { login } = useAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
    login({ ...values, setErrors: () => {}, setStatus: () => {} });
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
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Link href={"/forgot-password"}>Forgot your password?</Link>

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
