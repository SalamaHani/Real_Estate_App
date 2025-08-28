import React from "react";
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
import FormContainer from "../form/FormContener";

import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";

import { UserRound } from "lucide-react";
import AgentInfo from "./AgentInfo";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
function ContactAgentForm({ Agent }: { Agent: Agent | null }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="p-2  size-8 rounded-full"
        >
          <UserRound />
        </Button>
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
          <p className="text-md">Got a question about this property?</p>
          <Separator />
          <FormContainer className="" action={""}>
            <div className="h-full mt-10">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="FirstName">
                      First Name<span className="text-red-500">*</span>
                    </Label>
                    <Input name="FirstName" id="FirstName" type="text" />
                  </div>
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="FirstName">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input name="LastName" id="LastName" type="text" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input name="email" id="email" type="email" />
                  </div>
                  <div className="w-[50%]">
                    <Label className="mb-2" htmlFor="Phone">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input name="Phone" type="number" />
                  </div>
                </div>
                <TextAreaInput
                  name="OrderNotes"
                  labelText="Order Notes"
                  defaultValue="Add any additional instructions or comments here..."
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
          </FormContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ContactAgentForm;
