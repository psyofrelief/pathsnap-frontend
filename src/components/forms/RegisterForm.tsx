"use client";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Rename `register` from useAuth to avoid conflict
  const { register: registerUser } = useAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser({ ...values, setErrors: () => {}, setStatus: () => {} });
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
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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

      {/* Password Field */}
      <div className="flex flex-col gap-y-sm">
        <Label htmlFor="password_confirmation">Confirm Password</Label>
        <Input
          id="password_confirmation"
          placeholder=""
          type="password"
          {...register("password_confirmation")}
        />
        {errors.password_confirmation && (
          <p className="text-red-500">{errors.password_confirmation.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
