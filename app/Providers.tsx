"use client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
      </ThemeProvider>
    </>
  );
}
export default Providers;
