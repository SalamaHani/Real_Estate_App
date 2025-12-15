/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/utils/db";
import { sendNotificationEvent, sendReadStatusEvent } from "./pusher-server";

/**
 * Manually trigger saved search check for a specific user
 * Useful for testing or immediate check after user updates their saved search
 */
export async function checkSavedSearchForUser(
  userId: string,
  savedSearchId: string
) {
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
      if (query.Minimam !== undefined)
        filter.price.$gte = Number(query.Minimam);
      if (query.Maximam !== undefined)
        filter.price.$lte = Number(query.Maximam);
    }

    if (query.Bads) {
      filter.bedrooms = { $gte: Number(query.Bads.replace("+", "")) };
    }

    if (query.Baths) {
      filter.bathrooms = { $gte: Number(query.Baths.replace("+", "")) };
    }

    if (query.Status) {
      filter.listing_status = { $regex: `^${query.Status}`, $options: "i" };
    }

    if (query.listing_type !== undefined) {
      filter.is_rental = query.listing_type === "Rentals";
    }

    if (query.city) {
      filter["location.city"] = { $regex: query.city, $options: "i" };
    }

    if (query.address) {
      filter["location.street_address"] = {
        $regex: query.address,
        $options: "i",
      };
    }

    // Find matching listings
    const matchingListings = (await prisma.$runCommandRaw({
      find: "listing",
      filter,
      limit: 10,
      sort: { createdAt: -1 },
    })) as any;

    const listings = matchingListings?.cursor?.firstBatch || [];
    const seenListingIds = (savedSearch.listingseent || []) as string[];

    const newListings = listings.filter((listing: any) => {
      const listingId = listing._id.$oid;
      return !seenListingIds.includes(listingId);
    });

    // Send Pusher notification if new listings found
    if (newListings.length > 0) {
      await notifySavedSearchMatches(
        userId,
        savedSearch.id,
        savedSearch.nameSearch,
        newListings
      );

      // Update seen listings
      const newListingIds = newListings.map((l: any) => l._id.$oid);
      await markListingsAsSeen(savedSearchId, newListingIds);
    }

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
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send Pusher notification for new saved search matches
 */
export async function notifySavedSearchMatches(
  userId: string,
  savedSearchId: string,
  searchName: string,
  newListings: any[]
) {
  try {
    // Get user info for personalization
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });
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

    const userName = user?.name || "there";

    // Create rich listing preview data
    const listingPreviews = newListings.slice(0, 3).map((listing: any) => ({
      id: listing._id.$oid,
      price: listing.price,
      bedrooms: Number(listing.bedrooms || 0),
      bathrooms: Number(listing.bathrooms || 0),
      address: listing.location?.street_address || "Address not available",
      city: listing.location?.city || "",
      photo: listing.photos?.[0] || null,
      status: listing.listing_status || "Listed",
    }));

    // Create notification in database with rich metadata
    const notification = await prisma.notification.create({
      data: {
        userId: userId,
        type: "NEW_LISTING",
        title: `🏡 ${newListings.length} New ${newListings.length === 1 ? "Property" : "Properties"} Found!`,
        message: `Great news ${userName}! We found ${newListings.length} new ${newListings.length === 1 ? "property" : "properties"} matching your "${searchName}" search. ${newListings[0]?.price ? `Starting from $${newListings[0].price.toLocaleString()}.` : ""}`,
        link: `/listing?${new URLSearchParams(savedSearch?.qury as any).toString()}`,
        isRead: false,
        metadata: JSON.stringify({
          savedSearchId: savedSearchId,
          savedSearchName: searchName,
          listingCount: newListings.length,
          listingIds: newListings.map((l: any) => l._id.$oid),
          listingPreviews: listingPreviews,
          icon: "🏠",
          actionUrl: `/listing?${new URLSearchParams(savedSearch?.qury as any).toString()}`,
          actionText: "View Properties",
        }),
      },
    });

    // Get unread count
    const unreadCount = await prisma.notification.count({
      where: {
        userId: userId,
        isRead: false,
      },
    });
    // Send real-time Pusher event with rich data
    await sendNotificationEvent(userId, notification, unreadCount);
    await sendReadStatusEvent(userId, notification.id, unreadCount);
    return {
      success: true,
      notificationId: notification.id,
      listingsNotified: newListings.length,
    };
  } catch (error) {
    console.error("Error sending saved search notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Mark listings as seen for a saved search
 * Call this when user views the search results
 */
export async function markListingsAsSeen(
  savedSearchId: string,
  listingIds: string[]
) {
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
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
