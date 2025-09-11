"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";
import { MessageCircle } from "lucide-react";
import { createReviewAction } from "@/utils/actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useActionState } from "react";
import { ActionUserReview } from "@/utils/Tayp";
import React from "react";
import { toast } from "sonner";
const initialState: ActionUserReview = {
  success: false,
  message: "",
};
export function ReviewDiloge({ listingId }: { listingId: string }) {
  const [open, setOpen] = React.useState(false);
  const [state, action] = useActionState(createReviewAction, initialState);
  console.log(state.Data);
  React.useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success(state.message);
    }
  }, [state?.success, state?.message]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="p-2 size-8 cursor-pointer rounded-full"
              onClick={() => {
                setOpen(true);
              }}
            >
              <MessageCircle />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send Message Agent</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submiet Review</DialogTitle>
          <DialogDescription>
            Make here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="" action={action}>
          <RatingInput name="rating" />
          <TextAreaInput
            name="comment"
            labelText="feedback"
            defaultValue="Outstanding product!!!"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button size="lg" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <input
              type="text"
              readOnly
              hidden
              name="listingId"
              value={listingId}
            />
            <SubmitButton text="Send Review" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
