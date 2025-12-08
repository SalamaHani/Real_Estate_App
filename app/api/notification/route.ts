import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET - Fetch notifications for the current user
export async function GET(request: NextRequest) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");
        const unreadOnly = searchParams.get("unreadOnly") === "true";

        const where = {
            userId: session.user.id,
            ...(unreadOnly && { isRead: false }),
        };

        // Get notifications
        const notifications = await prisma.notification.findMany({
            where,
            orderBy: { createdAt: "desc" },
            take: limit,
            skip: offset,
        });

        // Get unread count
        const unreadCount = await prisma.notification.count({
            where: {
                userId: session.user.id,
                isRead: false,
            },
        });

        return NextResponse.json({
            notifications,
            unreadCount,
            hasMore: notifications.length === limit,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

// POST - Create a new notification (for testing or system use)
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
        const { type, title, message, link, metadata } = body;

        if (!type || !title || !message) {
            return NextResponse.json(
                { error: "Missing required fields: type, title, message" },
                { status: 400 }
            );
        }

        const notification = await prisma.notification.create({
            data: {
                userId: session.user.id,
                type,
                title,
                message,
                link,
                metadata: metadata ? JSON.stringify(metadata) : null,
            },
        });

        return NextResponse.json(notification, { status: 201 });
    } catch (error) {
        console.error("Error creating notification:", error);
        return NextResponse.json(
            { error: "Failed to create notification" },
            { status: 500 }
        );
    }
}
