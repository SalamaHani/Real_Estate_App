import type { Metadata } from "next";
import "../globals.css";
import Providers from "../Providers";
import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Barrington Group",
  description:
    "Barrington Group Real Estate is a professional, full-stack real estate platform designed for modern property browsing and management. Built with Next.js, React, Prisma, and MongoDB, it provides a seamless experience for both users and administrators.",
};
interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
