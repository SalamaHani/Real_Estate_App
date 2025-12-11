"use client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import PusherProvider from "@/components/providers/PusherProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <PusherProvider>
          <Toaster />
          {children}
        </PusherProvider>
      </ThemeProvider>
    </>
  );
}
export default Providers;
