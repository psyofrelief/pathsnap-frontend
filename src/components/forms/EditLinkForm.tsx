import React, { useState, useEffect } from "react";
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
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useLinks } from "@/hooks/links";
import EditIcon from "../icons/EditIcon";

interface Link {
  id: string;
  title?: string;
  short_url: string;
  url: string;
}

interface EditLinkDialogProps {
  link: Link;
}

const formSchema = z.object({
  title: z.string().optional(),
  shortLink: z.string().optional(),
  destinationUrl: z.string().url({ message: "Enter a valid URL" }),
});

export default function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { updateLink, deleteLink } = useLinks();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: link.title || "",
      shortLink: link.short_url || "",
      destinationUrl: link.url || "",
    },
  });

  useEffect(() => {
    reset({
      title: link.title || "",
      shortLink: link.short_url || "",
      destinationUrl: link.url || "",
    });
  }, [link, reset]);

  function onSubmit(values: any) {
    const valuesObject = {
      title: values.title || undefined,
      short_url: values.shortLink || undefined,
      url: values.destinationUrl,
    };
    updateLink({
      id: link.id,
      updatedData: valuesObject,
      setLoading: setUpdateLoading,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="rounded-full bg-background h-fit border border-outline px-sm py-xs text-xs hover:bg-popover transition-colors"
        asChild
      >
        <Button className="flex-0">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
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
          <div className="flex gap-sm">
            <Button
              isLoading={updateLoading}
              variant="outline"
              type="submit"
              className="w-full"
            >
              Save Changes
            </Button>
            <Button
              isLoading={deleteLoading}
              onClick={() =>
                deleteLink({ id: link.id, setLoading: setDeleteLoading })
              }
              variant="destructive"
              className="w-full"
            >
              Delete
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
