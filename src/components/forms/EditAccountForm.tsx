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
} from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useAuth } from "@/hooks/auth";
import { toast } from "sonner";
import FormMessage from "../ui/FormMessage";

interface User {
  id: string;
  name: string;
}

interface EditUserDialogProps {
  user: User;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditUserDialog({ user }: EditUserDialogProps) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { updateUser, deleteUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  useEffect(() => {
    reset({
      name: user.name || "",
    });
  }, [user, reset]);

  function onSubmit(values: FormValues) {
    if (isDeleteClicked) {
      return;
    }
    updateUser({ name: values.name, setLoading: setUpdateLoading });
    setOpen(false);
    toast("Account updated successfully");
  }

  function handleDelete() {
    setIsDeleteClicked(true);
  }

  function handleCancel() {
    setIsDeleteClicked(false);
  }

  function confirmDelete() {
    deleteUser({ setLoading: setDeleteLoading });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="font-semibold cursor-pointer hover:underline">Profile</p>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </div>
          <div className="flex gap-sm">
            <Button
              type={"button"}
              variant="outline"
              className={`w-full ${!isDeleteClicked && "hidden"}`}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              isLoading={deleteLoading}
              className={`w-full ${!isDeleteClicked && "hidden"}`}
              variant="destructive"
              onClick={confirmDelete}
            >
              Confirm Deletion
            </Button>
            <Button
              type="submit"
              isLoading={updateLoading}
              variant="outline"
              className={`w-full ${isDeleteClicked && "hidden"}`}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              className={`w-full ${isDeleteClicked && "hidden"}`}
              variant="destructive"
              onClick={handleDelete}
            >
              Delete Account
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
