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
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useLinks } from "@/hooks/links";

const formSchema = z.object({
  title: z.string().optional(),
  shortLink: z
    .string()
    .min(2, { message: "Short code must be minimum 2 characters" })
    .optional(),
  destinationUrl: z.string().url({ message: "Enter a valid URL" }),
});

export default function CreateLinkDialog() {
  const { createLink } = useLinks();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", shortLink: "", destinationUrl: "" },
  });

  function onSubmit(values) {
    const linkData = {
      url: values.destinationUrl,
      title: values.title || undefined,
      short_url: values.shortLink || undefined,
    };

    createLink({ linkData, setLoading });
    console.log(linkData);
    reset();
    setOpen(false);
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
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="shortLink">Custom Short Link (Optional)</Label>
            <Input
              id="shortLink"
              placeholder="Enter custom short link"
              {...register("shortLink")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="destinationUrl">Destination URL</Label>
            <Input
              id="destinationUrl"
              placeholder="https://example.com"
              {...register("destinationUrl")}
            />
            {errors.destinationUrl && (
              <p className="text-red-500">{errors.destinationUrl.message}</p>
            )}
          </div>
          <Button isLoading={loading} type="submit" className="w-full">
            {loading ? "Creating..." : "Create link"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
