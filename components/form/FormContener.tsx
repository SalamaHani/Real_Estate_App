"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { actionFunction } from "@/utils/Type";
import { cn } from "@/lib/utils";

const initialState = {
  message: "",
  errors: {},
};

function FormContainer({
  className = "some-class",
  action,
  children,
}: {
  className?: string;
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  useEffect(() => {
    if (state.message) {
      toast.success(`Successfully ${state.message}`, {
        description: "Astorefonte Shop online",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }, [state]);
  return (
    <form className={cn("capitalize", className)} action={formAction}>
      {children}
    </form>
  );
}
export default FormContainer;
