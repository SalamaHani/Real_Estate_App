import "../globals.css";
import Providers from "../Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to AQuery Group Real Estate to access your dashboard, saved properties, and account settings.",

  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Sign In | AQuery Group Real Estate",
    description: "Secure sign in to AQuery Group Real Estate platform.",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Sign In | AQuery Group Real Estate",
    description: "Access your AQuery Group Real Estate account securely.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
