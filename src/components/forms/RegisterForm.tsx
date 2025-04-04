"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "../ui/Label";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "@/hooks/auth";
import FormMessage from "../ui/FormMessage";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .nonempty({ message: "First name is required." }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .max(50, { message: "Email cannot exceed 50 characters." })
    .nonempty({ message: "Email is required." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(50, { message: "Password cannot exceed 50 characters." })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter.",
    })
    .regex(/\d/, { message: "Password must include at least one number." })
    .nonempty({ message: "Password is required." }),

  password_confirmation: z
    .string()
    .nonempty({ message: "Password confirmation is required." }),
});

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { register: registerUser } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser({
      ...values,
      setLoading,
      setErrors: (apiErrors) => {
        if (apiErrors.name)
          setError("name", { type: "server", message: apiErrors.name[0] });
        if (apiErrors.email)
          setError("email", { type: "server", message: apiErrors.email[0] });
        if (apiErrors.password)
          setError("password", {
            type: "server",
            message: apiErrors.password[0],
          });
        if (apiErrors.password_confirmation)
          setError("password_confirmation", {
            type: "server",
            message: apiErrors.password_confirmation[0],
          });
      },
      setStatus: () => {},
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex z-[1] flex-col gap-y-lg px-md py-lg border border-outline rounded w-full max-w-[700px] bg-background"
    >
      {/* First Name Field */}
      <div className="flex flex-col gap-y-xs">
        <Label htmlFor="name">Name</Label>
        <Input placeholder="John" id="name" type="text" {...register("name")} />
        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
      </div>

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

      {/* Password Confirmation Field */}
      <div className="flex flex-col gap-y-sm">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          placeholder=""
          type="password"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation && (
          <FormMessage>{errors.password_confirmation.message}</FormMessage>
        )}
      </div>

      {/* Submit Button */}
      <Button isLoading={loading} type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
