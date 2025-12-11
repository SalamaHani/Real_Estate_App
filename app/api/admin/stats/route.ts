import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET - Fetch dashboard statistics
export async function GET(request: NextRequest) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [
            totalListings,
            totalUsers,
            totalFavorites,
            totalReviews,
            totalNotifications,
            totalSavedSearches,
            recentListings,
            recentUsers,
        ] = await Promise.all([
            prisma.listing.count(),
            prisma.user.count(),
            prisma.favorite.count(),
            prisma.review.count(),
            prisma.notification.count(),
            prisma.seavdsearchuser.count(),
            prisma.listing.findMany({
                take: 5,
                orderBy: { id: "desc" },
                select: {
                    id: true,
                    price: true,
                    bedrooms: true,
                    bathrooms: true,
                    location: true,
                    listing_status: true,
                },
            }),
            prisma.user.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
            }),
        ]);

        return NextResponse.json({
            stats: {
                totalListings,
                totalUsers,
                totalFavorites,
                totalReviews,
                totalNotifications,
                totalSavedSearches,
            },
            recentListings,
            recentUsers,
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard statistics" },
            { status: 500 }
        );
    }
}
