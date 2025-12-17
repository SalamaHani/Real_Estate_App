"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Heart, Star, Bell, Search } from "lucide-react";
import { fetchAdminStatsAction } from "@/utils/admin-actions";
import { toast } from "sonner";

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration, mounted]);

    // Return initial value on server/hydration to prevent mismatch
    if (!mounted) {
        return <span>{value}</span>;
    }

    return <span>{count.toLocaleString()}</span>;
}

// Stat Card Component
function StatCard({
    title,
    value,
    icon: Icon,
    color,
}: {
    title: string;
    value: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    color: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    <AnimatedCounter value={value} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Total in database</p>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalListings: 0,
        totalUsers: 0,
        totalFavorites: 0,
        totalReviews: 0,
        totalNotifications: 0,
        totalSavedSearches: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const result = await fetchAdminStatsAction();
                if (result.success && result.stats) {
                    setStats(result.stats);
                } else {
                    toast.error(result.error || "Failed to load statistics");
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
                toast.error("Failed to load statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Overview of your real estate platform statistics
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Total Listings"
                    value={stats.totalListings}
                    icon={Home}
                    color="text-[#b45309]"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    color="text-blue-600"
                />
                <StatCard
                    title="Total Favorites"
                    value={stats.totalFavorites}
                    icon={Heart}
                    color="text-red-600"
                />
                <StatCard
                    title="Total Reviews"
                    value={stats.totalReviews}
                    icon={Star}
                    color="text-yellow-600"
                />
                <StatCard
                    title="Notifications"
                    value={stats.totalNotifications}
                    icon={Bell}
                    color="text-purple-600"
                />
                <StatCard
                    title="Saved Searches"
                    value={stats.totalSavedSearches}
                    icon={Search}
                    color="text-green-600"
                />
            </div>
        </div>
    );
}
