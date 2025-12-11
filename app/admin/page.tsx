"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Heart, Star, Bell, Search } from "lucide-react";

interface DashboardStats {
    stats: {
        totalListings: number;
        totalUsers: number;
        totalFavorites: number;
        totalReviews: number;
        totalNotifications: number;
        totalSavedSearches: number;
    };
    recentListings: any[];
    recentUsers: any[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/admin/stats");
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome to your real estate management dashboard
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                        <Home className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.stats.totalListings || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Properties in database
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.stats.totalUsers || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Registered accounts
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Favorites</CardTitle>
                        <Heart className="h-5 w-5 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.stats.totalFavorites || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            User favorites
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                        <Star className="h-5 w-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.stats.totalReviews || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Property reviews
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                        <Bell className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.stats.totalNotifications || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Total sent
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Saved Searches</CardTitle>
                        <Search className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats?.stats.totalSavedSearches || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            User searches
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Listings</CardTitle>
                        <CardDescription>Latest 5 properties added</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats?.recentListings.map((listing) => (
                                <div
                                    key={listing.id}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {listing.location?.street_address || "N/A"}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {listing.location?.city}, {listing.location?.state}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-primary">
                                            ${listing.price?.toLocaleString() || 0}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {listing.bedrooms} bed, {listing.bathrooms} bath
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                        <CardDescription>Latest 5 registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats?.recentUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                >
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
