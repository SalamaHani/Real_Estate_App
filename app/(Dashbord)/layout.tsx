import type { Metadata } from "next";
import Link from "next/link";
import { Home, Users, BarChart3, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Admin Dashboard - Barrington Group",
    description: "Real estate admin management panel",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
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
                                <Button variant="ghost" size="sm">
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/admin/listings">
                                <Button variant="ghost" size="sm">
                                    <Home className="h-4 w-4 mr-2" />
                                    Listings
                                </Button>
                            </Link>
                            <Link href="/admin/users">
                                <Button variant="ghost" size="sm">
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
    );
}