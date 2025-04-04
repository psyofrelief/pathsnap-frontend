import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useLinks } from "@/hooks/links";
import FormMessage from "../ui/FormMessage";

const formSchema = z.object({
  title: z.string().optional(),
  short_url: z
    .string()
    .min(2, { message: "Short code must be minimum 2 characters" })
    .optional(),
  url: z.string().url({ message: "Enter a valid URL" }),
});

export default function CreateLinkDialog() {
  const { createLink } = useLinks();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", short_url: "", url: "" },
  });

  type FormValues = z.infer<typeof formSchema>;

  function onSubmit(values: FormValues) {
    const linkData = {
      url: values.url,
      title: values.title || undefined,
      short_url: values.short_url || undefined,
    };

    setLoading(true);
    createLink({
      linkData,
      setLoading,
      setErrors: (apiErrors) => {
        if (apiErrors.title) {
          setError("title", { type: "server", message: apiErrors.title[0] });
        }
        if (apiErrors.short_url) {
          setError("short_url", {
            type: "server",
            message: apiErrors.short_url[0],
          });
        }
        if (apiErrors.url) {
          setError("url", {
            type: "server",
            message: apiErrors.url[0],
          });
        }
      },
      onSuccess: () => {
        setOpen(false);
        reset();
      },
      onError: () => {
        setLoading(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-0">Create Link</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create a New Link</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-y-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Enter a title"
              {...register("title")}
            />
            {errors.title && <FormMessage>{errors.title.message}</FormMessage>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="short_url">Custom Short Link (Optional)</Label>
            <Input
              id="short_url"
              placeholder="Enter custom short link"
              {...register("short_url")}
            />
            {errors.short_url && (
              <FormMessage>{errors.short_url.message}</FormMessage>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="url">Destination URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              {...register("url")}
            />
            {errors.url && <FormMessage>{errors.url.message}</FormMessage>}
          </div>
          <Button isLoading={loading} type="submit" className="w-full">
            {loading ? "Creating..." : "Create link"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
