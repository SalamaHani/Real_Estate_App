import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { checkSavedSearchForUser } from "@/lib/saved-search-helper";

/**
 * Manually check a specific saved search for new listings
 * Endpoint: POST /api/saved-search/check
 */
export async function POST(request: NextRequest) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { savedSearchId } = body;

        if (!savedSearchId) {
            return NextResponse.json(
                { error: "savedSearchId is required" },
                { status: 400 }
            );
        }

        const result = await checkSavedSearchForUser(session.user.id, savedSearchId);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            newListingsCount: result.newListingsCount,
            message: result.newListingsCount === 0
                ? "No new listings found for this search"
                : `Found ${result.newListingsCount} new listing${result.newListingsCount === 1 ? '' : 's'}`,
        });
    } catch (error) {
        console.error("Error checking saved search:", error);
        return NextResponse.json(
            { error: "Failed to check saved search" },
            { status: 500 }
        );
    }
}
