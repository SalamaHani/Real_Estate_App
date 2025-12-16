import "../globals.css";
import Providers from "../Providers";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to AQuery Group Real Estate to manage your properties, favorites, and account securely.",

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
    title: "Login | AQuery Group Real Estate",
    description:
      "Secure login to AQuery Group Real Estate property management platform.",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Login | AQuery Group Real Estate",
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
