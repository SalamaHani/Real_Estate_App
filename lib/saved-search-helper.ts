import prisma from "@/utils/db";

/**
 * Manually trigger saved search check for a specific user
 * Useful for testing or immediate check after user updates their saved search
 */
export async function checkSavedSearchForUser(userId: string, savedSearchId: string) {
    try {
        const savedSearch = await prisma.seavdsearchuser.findUnique({
            where: { id: savedSearchId },
            select: {
                id: true,
                userId: true,
                nameSearch: true,
                qury: true,
                listingseent: true,
            },
        });

        if (!savedSearch || savedSearch.userId !== userId) {
            return { success: false, error: "Saved search not found" };
        }

        // Parse query and build filter (same logic as cron)
        const query = savedSearch.qury as Record<string, any>;
        const filter: any = {};

        if (query.Minimam !== undefined || query.Maximam !== undefined) {
            filter.price = {};
            if (query.Minimam !== undefined) filter.price.$gte = Number(query.Minimam);
            if (query.Maximam !== undefined) filter.price.$lte = Number(query.Maximam);
        }

        if (query.Bads) {
            filter.bedrooms = { $gte: Number(query.Bads.replace("+", "")) };
        }

        if (query.Baths) {
            filter.bathrooms = { $gte: Number(query.Baths.replace("+", "")) };
        }

        if (query.Status) {
            filter.listing_status = { $regex: query.Status, $options: "i" };
        }

        if (query.listing_type !== undefined) {
            filter.is_rental = query.listing_type === "Rentals";
        }

        if (query.city) {
            filter["location.city"] = { $regex: query.city, $options: "i" };
        }

        if (query.address) {
            filter["location.street_address"] = { $regex: query.address, $options: "i" };
        }

        // Find matching listings
        const matchingListings = await prisma.$runCommandRaw({
            find: "listing",
            filter,
            limit: 10,
            sort: { createdAt: -1 },
        }) as any;

        const listings = matchingListings?.cursor?.firstBatch || [];
        const seenListingIds = (savedSearch.listingseent || []) as string[];

        const newListings = listings.filter((listing: any) => {
            const listingId = listing._id.$oid;
            return !seenListingIds.includes(listingId);
        });

        return {
            success: true,
            newListingsCount: newListings.length,
            newListings: newListings.map((l: any) => ({
                id: l._id.$oid,
                ...l,
            })),
        };
    } catch (error) {
        console.error("Error checking saved search:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

/**
 * Mark listings as seen for a saved search
 * Call this when user views the search results
 */
export async function markListingsAsSeen(savedSearchId: string, listingIds: string[]) {
    try {
        const savedSearch = await prisma.seavdsearchuser.findUnique({
            where: { id: savedSearchId },
            select: { listingseent: true },
        });

        if (!savedSearch) {
            return { success: false, error: "Saved search not found" };
        }

        const currentSeen = (savedSearch.listingseent || []) as string[];
        const updatedSeen = [...new Set([...currentSeen, ...listingIds])];

        await prisma.seavdsearchuser.update({
            where: { id: savedSearchId },
            data: { listingseent: updatedSeen },
        });

        return { success: true, markedCount: listingIds.length };
    } catch (error) {
        console.error("Error marking listings as seen:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
