"use client";
import { useTransition } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface props {
  id: string | undefined;
}
export default function DeleteButton({ id }: props) {
  const [isPending, startTransition] = useTransition();
  const userId = id;
  const onSubmit = () => {
    // startTransition(()=>{

    // })
    toast.warning("Coming soon");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2  lg:w-fit">
            {" "}
            <Trash2Icon className="text-destructive" />
            Delete account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account,This operation cannot
            be reversed
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-between items-center">
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <form action={onSubmit}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
