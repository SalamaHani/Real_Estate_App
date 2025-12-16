import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    default: "AQuery Group Real Estate",
    template: "%s | AQuery Group Real Estate",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description:
    "AQuery Group Real Estate is a professional full-stack real estate platform built with Next.js, React, Prisma, and MongoDB. Browse, manage, and explore modern property listings with ease.",
  keywords: [
    "AQuery Group Real Estate",
    "real estate platform",
    "property listings",
    "real estate management",
    "Next.js real estate app",
    "modern property browsing",
    "property management system",
  ],
  authors: [{ name: "AQuery Group Real Estate" }],
  creator: "AQuery Group Real Estate",
  publisher: "AQuery Group Real Estate",

  openGraph: {
    title: "AQuery Group Real Estate",
    description:
      "Modern real estate platform for browsing and managing properties. Built with Next.js, React, Prisma, and MongoDB.",
    url: "https://aquerygrouprealestate.com",
    siteName: "AQuery Group Real Estate",
    images: [
      {
        url: "/imges/building-2.png",
        width: 1200,
        height: 630,
        alt: "AQuery Group Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AQuery Group Real Estate",
    description:
      "Professional full-stack real estate platform for modern property browsing and management.",
    images: ["/imges/building-2.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },



  metadataBase: new URL("https://aquerygrouprealestate.com"),
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
      <Navbar session={session} />
      {children}
    </>
  );
}
