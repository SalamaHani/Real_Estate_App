"use client";
import React, { useActionState } from "react";
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
import { Agent } from "@prisma/client";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ActionAgent } from "@/utils/Tayp";
import { SendAgent } from "@/utils/actions";
import { toast } from "sonner";
import AgentInfo from "../listing/AgentInfo";
import { Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
const initialState: ActionAgent = {
  success: false,
  message: "",
};
function CardDilogAgent({ Agent }: { Agent?: Agent | null }) {
  const [open, setOpen] = React.useState(false);
  const [state, action] = useActionState(SendAgent, initialState);
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
          className="p-2 rounded-sm"
          onClick={() => {
            setOpen(true);
          }}
        >
          Send Message
          <Send className="w-4 h-4 ml-1" />
        </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send Message to Agent</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="flex flex-row  justify-around items-center">
          <div className="flex  flex-col justify-center items-center">
            <Avatar className="w-17 h-17">
              <AvatarImage className=" object-cover" src={Agent?.photo ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <DialogTitle className="mt-2 mb-2">{Agent?.full_name}</DialogTitle>
            <DialogDescription>{Agent?.brokerage_name}</DialogDescription>
          </div>
          <div>
            <AgentInfo Agent={Agent} />
          </div>
        </DialogHeader>
        <div className="overflow-y-auto pr-5  max-h-[60vh] w-full">
          <p className="text-md italic">Got a question about this property?</p>
          <Separator />
          <form className="" action={action}>
            <div className="h-full mt-10">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="FirstName">
                      First Name<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="FirstName"
                      id="FirstName"
                      type="text"
                      defaultValue={state.Data?.FirstName}
                      className={
                        state?.errors?.FirstName ? "border-red-500" : ""
                      }
                    />
                    {state.errors?.FirstName && (
                      <p className="text-red-500 text-xs">
                        {state.errors.FirstName}
                      </p>
                    )}
                  </div>
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="FirstName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="LastName"
                      id="LastName"
                      type="text"
                      defaultValue={state.Data?.LastName}
                      className={
                        state?.errors?.LastName ? "border-red-500" : ""
                      }
                    />
                    {state.errors?.LastName && (
                      <p className="text-red-500 text-xs">
                        {state.errors.LastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      defaultValue={state.Data?.email}
                      className={state?.errors?.email ? "border-red-500" : ""}
                    />
                    {state.errors?.email && (
                      <p className="text-red-500 text-xs">
                        {state.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="Phone">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="Phone"
                      type="number"
                      defaultValue={state.Data?.Phone}
                      className={state?.errors?.Phone ? "border-red-500" : ""}
                    />
                    {state.errors?.Phone && (
                      <p className="text-red-500 text-xs">
                        {state.errors.Phone}
                      </p>
                    )}
                  </div>
                </div>
                <TextAreaInput
                  name="Listing Notes"
                  labelText="Order Notes"
                  defaultValue="Add any additional instructions or comments here..."
                />
                <input
                  type="hidden"
                  name="agentemail"
                  value={Agent?.email}
                  readOnly
                />
              </div>
            </div>
            <DialogFooter className="mt-7">
              <DialogClose asChild>
                <Button size="lg" variant="destructive">
                  Cancel
                </Button>
              </DialogClose>
              <SubmitButton text="Contact Agent" />
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CardDilogAgent;
