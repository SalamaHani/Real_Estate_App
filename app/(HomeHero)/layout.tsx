import type { Metadata } from "next";
import "../globals.css";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Navhero from "@/components/navbar/Navhero";
import Script from "next/script";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export const metadata: Metadata = {
  title: "Barrington Group",
  description:
    "Barrington Group Real Estate is a professional, full-stack real estate platform designed for modern property browsing and management. Built with Next.js, React, Prisma, and MongoDB, it provides a seamless experience for both users and administrators.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: RootLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_GOOGLE_API_KEY_MAP}`}
        strategy="beforeInteractive"
        async
        defer
      />
      <Navhero session={session} />
      {children}
    </>
  );
}
