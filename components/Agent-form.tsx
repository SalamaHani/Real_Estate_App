"use client";
import { AgentcontactSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import TextAreaInput from "./form/TextAreaInput";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SendAgentListinge } from "@/utils/actions";

// Define Agent type
interface AgentType {
  id?: string;
  email?: string;
  full_name?: string;
  photo?: string;
  brokerage_name?: string;
}

function Agentform({
  Agent,
  listingId,
}: {
  Agent?: AgentType | null;
  listingId?: string;
}) {
  const [isLoding, setisLoding] = useState(false);
  const form = useForm<z.infer<typeof AgentcontactSchema>>({
    resolver: zodResolver(AgentcontactSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      email: "",
      Phone: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof AgentcontactSchema>) {
    setisLoding(true);
    const { success, message } = await SendAgentListinge(
      values.FirstName,
      values.LastName,
      values.Phone,
      values.email
    );
    if (success) {
      toast.success(message as string);
    } else toast.error(message as string);
    setisLoding(false);
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Label className="mb-2" htmlFor="LastName">
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
          <input
            type="hidden"
            name="agentemail"
            value={Agent?.email ?? ""}
            readOnly
          />
          <input type="hidden" name="listingId" value={listingId ?? ""} readOnly />
        </div>
      </div>
      <DialogFooter className="mt-7">
        <DialogClose asChild>
          <Button size="lg" variant="destructive">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isLoding} className="w-full">
          {isLoding ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </>
          ) : (
            <> Contact Agent</>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default Agentform;
