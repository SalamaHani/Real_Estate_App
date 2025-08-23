"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Sign Out in successfully");
            router.push("/");
            router.refresh();
          },
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.success("An unknown error occurred");
    }
  };
  return (
    <button
      className="w-full flex items-center text-left"
      onClick={handleLogout}
    >
      Logout <LogOut className="ml-3 size-3" />
    </button>
  );
}
