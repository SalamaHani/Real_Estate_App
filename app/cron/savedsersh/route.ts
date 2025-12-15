import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { sendNotificationEvent } from "@/lib/pusher-server";

/**
 * Cron job to check saved searches and notify users of new matching listings
 * This should be run periodically (e.g., every hour or daily)
 * 
 * Usage: GET /api/cron/savedsersh
 * Or setup with cron service like Vercel Cron, GitHub Actions, etc.
 */
export async function GET() {
  try {
    console.log("🔍 Starting saved search notification cron job...");

    // Get all saved searches
    const savedSearches = await prisma.seavdsearchuser.findMany({
      select: {
        id: true,
        userId: true,
        nameSearch: true,
        qury: true,
        listingseent: true,
        email_frequency: true,
      },
    });

    if (savedSearches.length === 0) {
      console.log("No saved searches found");
      return NextResponse.json({
        message: "No saved searches to process",
        processed: 0
      });
    }

    console.log(`📋 Found ${savedSearches.length} saved searches to process`);

    let totalNotificationsSent = 0;
    let totalListingsFound = 0;
    const results = [];

    // Process each saved search
    for (const savedSearch of savedSearches) {
      try {
        // Parse query parameters
        const query = savedSearch.qury as Record<string, string>;

        // Build MongoDB filter from saved search query
        const filter: Record<string, unknown> = {};

        // Price range
        if (query.Minimam !== undefined || query.Maximam !== undefined) {
          filter.price = {};
          const priceFilter = filter.price as Record<string, unknown>;
          if (query.Minimam !== undefined) (priceFilter as Record<string, number>).$gte = Number(query.Minimam);
          if (query.Maximam !== undefined) (priceFilter as Record<string, number>).$lte = Number(query.Maximam);
        }

        // Bedrooms
        if (query.Bads) {
          filter.bedrooms = { $gte: Number(query.Bads.replace("+", "")) };
        }

        // Bathrooms
        if (query.Baths) {
          filter.bathrooms = { $gte: Number(query.Baths.replace("+", "")) };
        }

        // Status filter (e.g., "Active", "Pending", "Sold")
        if (query.Status) {
          filter.listing_status = { $regex: `^${query.Status}`, $options: "i" };
        }

        // Listing type (rental or sale)
        if (query.listing_type !== undefined) {
          if (query.listing_type === "Rentals") {
            filter.is_rental = true;
          } else {
            filter.is_rental = false;
          }
        }

        // Location filters
        if (query.city) {
          filter["location.city"] = { $regex: query.city, $options: "i" };
        }
        if (query.address) {
          filter["location.street_address"] = { $regex: query.address, $options: "i" };
        }

        // Get already seen listing IDs
        const seenListingIds = (savedSearch.listingseent || []) as string[];

        // Find new listings matching the criteria that haven't been seen
        const matchingListings = await prisma.$runCommandRaw({
          find: "listing",
          filter: filter as Record<string, unknown>,
          limit: 10, // Limit to prevent overwhelming users
          sort: { createdAt: -1 }, // Get newest first
        }) as { cursor: { firstBatch: Array<Record<string, unknown>> } };

        const listings = matchingListings?.cursor?.firstBatch || [];

        // Filter out listings that have already been seen
        const newListings = listings.filter((listing: Record<string, unknown>) => {
          const listingId = (listing._id as { $oid: string }).$oid;
          return !seenListingIds.includes(listingId);
        });

        if (newListings.length > 0) {
          console.log(`✨ Found ${newListings.length} new listings for search "${savedSearch.nameSearch}"`);
          totalListingsFound += newListings.length;

          // Get user info for personalized notification
          const user = await prisma.user.findUnique({
            where: { id: savedSearch.userId },
            select: { name: true },
          });

          const userName = user?.name || "there";

          // Create notification for the user
          const notification = await prisma.notification.create({
            data: {
              userId: savedSearch.userId,
              type: "NEW_LISTING",
              title: `🏡 ${newListings.length} New ${newListings.length === 1 ? 'Property' : 'Properties'} Found!`,
              message: `Great news ${userName}! We found ${newListings.length} new ${newListings.length === 1 ? 'property' : 'properties'} matching your saved search "${savedSearch.nameSearch}". Check them out now!`,
              link: `/sersh?${new URLSearchParams(query).toString()}`,
              isRead: false,
              metadata: JSON.stringify({
                savedSearchId: savedSearch.id,
                savedSearchName: savedSearch.nameSearch,
                listingCount: newListings.length,
                listingIds: newListings.map((l: Record<string, unknown>) => (l._id as { $oid: string }).$oid),
              }),
            },
          });

          // Get unread count
          const unreadCount = await prisma.notification.count({
            where: {
              userId: savedSearch.userId,
              isRead: false,
            },
          });

          // Send Pusher notification
          await sendNotificationEvent(savedSearch.userId, notification, unreadCount);

          // Update listingseent array with new listing IDs
          const newListingIds = newListings.map((listing: Record<string, unknown>) => (listing._id as { $oid: string }).$oid);
          const updatedSeenListings = [...seenListingIds, ...newListingIds];

          await prisma.seavdsearchuser.update({
            where: { id: savedSearch.id },
            data: { listingseent: updatedSeenListings },
          });

          totalNotificationsSent++;

          results.push({
            savedSearchId: savedSearch.id,
            savedSearchName: savedSearch.nameSearch,
            userId: savedSearch.userId,
            newListingsFound: newListings.length,
            notificationSent: true,
          });

          console.log(`✅ Notification sent to user ${savedSearch.userId} for "${savedSearch.nameSearch}"`);
        } else {
          console.log(`⏭️ No new listings for search "${savedSearch.nameSearch}"`);
          results.push({
            savedSearchId: savedSearch.id,
            savedSearchName: savedSearch.nameSearch,
            userId: savedSearch.userId,
            newListingsFound: 0,
            notificationSent: false,
          });
        }

      } catch (error) {
        console.error(`Error processing saved search ${savedSearch.id}:`, error);
        results.push({
          savedSearchId: savedSearch.id,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    console.log(`✅ Cron job completed: ${totalNotificationsSent} notifications sent for ${totalListingsFound} total new listings`);

    return NextResponse.json({
      success: true,
      message: "Saved search cron job completed",
      stats: {
        totalSavedSearches: savedSearches.length,
        totalNotificationsSent,
        totalListingsFound,
      },
      results,
    });

  } catch (error) {
    console.error("Error in saved search cron job:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process saved searches",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
