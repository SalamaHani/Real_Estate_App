"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, BarChart3, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../globals.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(path);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-background">
          {/* Admin Navbar */}
          <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link href="/" className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Site
                    </Button>
                  </Link>
                  <div className="h-6 w-px bg-border" />
                  <Link href="/admin" className="font-bold text-xl">
                    Admin Panel
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/admin">
                    <Button
                      variant={isActive("/admin") ? "default" : "ghost"}
                      size="sm"
                      className={isActive("/admin") ? "bg-[#b45309] hover:bg-[#92400e] text-white" : "hover:bg-muted hover:text-black dark:hover:bg-muted dark:hover:text-white"}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/admin/listings">
                    <Button
                      variant={isActive("/admin/listings") ? "default" : "ghost"}
                      size="sm"
                      className={isActive("/admin/listings") ? "bg-[#b45309] hover:bg-[#92400e] text-white" : "hover:bg-muted hover:text-black dark:hover:bg-muted dark:hover:text-white"}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Listings
                    </Button>
                  </Link>
                  <Link href="/admin/users">
                    <Button
                      variant={isActive("/admin/users") ? "default" : "ghost"}
                      size="sm"
                      className={isActive("/admin/users") ? "bg-[#b45309] hover:bg-[#92400e] text-white" : "hover:bg-muted hover:text-black dark:hover:bg-muted dark:hover:text-white"}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Users
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-73px)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
