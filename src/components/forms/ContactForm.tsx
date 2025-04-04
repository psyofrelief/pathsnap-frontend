"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import TextArea from "../ui/TextArea";
import FormMessage from "../ui/FormMessage";
import { useSupportEmail } from "@/hooks/useSupportEmail";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  message: z
    .string()
    .min(10, { message: "Message must be more than 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { sendSupportEmail, loading, status } = useSupportEmail();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: FormValues) {
    sendSupportEmail({
      name: values.name,
      email: values.email,
      message: values.message,
    });

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 bg-background flex-col w-full border border-outline p-md max-w-[800px] gap-y-4"
    >
      {/* Name Field */}
      <div className="flex flex-col gap-y-xs">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Appleseed" {...register("name")} />
        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-y-xs">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="example@gmail.com"
          {...register("email")}
        />
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-y-xs">
        <Label htmlFor="message">Your message</Label>
        <TextArea
          id="message"
          placeholder="Add your message"
          {...register("message")}
        />
        {errors.message && <FormMessage>{errors.message.message}</FormMessage>}
      </div>

      {/* Success Message */}
      {status && <p className="text-foreground-success mx-auto">{status}</p>}

      <Button isLoading={loading} type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
