"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useLinks } from "@/hooks/links";
import TextArea from "../ui/TextArea";
import FormMessage from "../ui/FormMessage";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export default function ContactForm() {
  const { createLink } = useLinks();
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
    console.log("Creating link with values:", values);

    const linkData = {
      message: values.message,
      email: values.email,
      name: values.name || undefined, // Only include name if it's not empty
    };

    createLink(linkData);
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
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
