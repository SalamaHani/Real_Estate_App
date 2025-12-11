"use server";

import prisma from "@/utils/db";
import { getSession } from "@/utils/users";

/**
 * Server action to fetch admin dashboard statistics
 */
export async function fetchAdminStatsAction() {
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized - Please log in",
                stats: null,
            };
        }

        // Check if user is admin
        const ADMIN_EMAIL = "salamhani697@gmail.com";
        if (session.user.email !== ADMIN_EMAIL) {
            return {
                success: false,
                error: "Unauthorized - Admin access only",
                stats: null,
            };
        }

        // Fetch all stats in parallel
        const [
            totalListings,
            totalUsers,
            totalFavorites,
            totalReviews,
            totalNotifications,
            totalSavedSearches,
        ] = await Promise.all([
            prisma.listing.count(),
            prisma.user.count(),
            prisma.favorite.count(),
            prisma.review.count(),
            prisma.notification.count(),
            prisma.seavdsearchuser.count(),
        ]);

        return {
            success: true,
            stats: {
                totalListings,
                totalUsers,
                totalFavorites,
                totalReviews,
                totalNotifications,
                totalSavedSearches,
            },
        };
    } catch (error) {
        console.error("❌ Error fetching admin stats:", error);
        return {
            success: false,
            error: "Failed to fetch statistics",
            stats: null,
        };
    }
}
