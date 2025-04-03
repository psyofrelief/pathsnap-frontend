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
  name: z.string(),
  email: z.string().email(),
  message: z
    .string()
    .min(10, { message: "Message must be more than 10 characters" }),
});

export default function ContactForm() {
  const { sendSupportEmail, loading, status } = useSupportEmail();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values) {
    const formData = {
      message: values.message,
      email: values.email,
      name: values.name || undefined,
    };

    sendSupportEmail(formData);

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 bg-background flex-col w-full border border-outline p-md max-w-[800px] gap-y-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Appleseed" {...register("name")} />
        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="example@gmail.com"
          {...register("email")}
        />
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Your message</Label>
        <TextArea
          id="message"
          placeholder="Add your message"
          {...register("message")}
        />
        {errors.message && <FormMessage>{errors.message.message}</FormMessage>}
      </div>
      {status && <p className="text-foreground-success mx-auto">{status}</p>}
      <Button isLoading={loading} type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
