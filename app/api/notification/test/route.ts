import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/utils/db";
import { sendNotificationEvent } from "@/lib/pusher-server";

/**
 * Test endpoint to create sample notifications
 * Useful for testing the Pusher notification system
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
        const { notificationType = "test" } = body;

        let notification;
        const userId = session.user.id;
        const userName = session.user.name || "User";

        // Create different types of test notifications
        switch (notificationType) {
            case "welcome":
                notification = await prisma.notification.create({
                    data: {
                        userId,
                        type: "SYSTEM",
                        title: "Welcome to Barrington Group! 🎉",
                        message: `Hello ${userName}! Welcome to our real estate platform. We're excited to have you here. Start exploring amazing properties today!`,
                        link: "/",
                        isRead: false,
                        metadata: JSON.stringify({ welcomeNotification: true }),
                    },
                });
                break;

            case "listing":
                notification = await prisma.notification.create({
                    data: {
                        userId,
                        type: "NEW_LISTING",
                        title: "New Property Available! 🏡",
                        message: "A new luxury villa matching your preferences has been listed in your area.",
                        link: "/",
                        isRead: false,
                    },
                });
                break;

            case "price":
                notification = await prisma.notification.create({
                    data: {
                        userId,
                        type: "PRICE_CHANGE",
                        title: "Price Drop Alert! 💰",
                        message: "A property you favorited just dropped its price by $50,000!",
                        link: "/",
                        isRead: false,
                    },
                });
                break;

            case "message":
                notification = await prisma.notification.create({
                    data: {
                        userId,
                        type: "NEW_MESSAGE",
                        title: "New Message Received 💬",
                        message: "You have received a new message from an agent about your inquiry.",
                        link: "/",
                        isRead: false,
                    },
                });
                break;

            default:
                notification = await prisma.notification.create({
                    data: {
                        userId,
                        type: "SYSTEM",
                        title: "Test Notification 🔔",
                        message: "This is a test notification to verify the Pusher real-time system is working correctly.",
                        link: "/",
                        isRead: false,
                    },
                });
        }

        // Get updated unread count
        const unreadCount = await prisma.notification.count({
            where: {
                userId,
                isRead: false,
            },
        });

        // Trigger Pusher event
        await sendNotificationEvent(userId, notification, unreadCount);

        return NextResponse.json({
            success: true,
            notification,
            unreadCount,
            message: `${notificationType} notification created and sent via Pusher`,
        });
    } catch (error) {
        console.error("Error creating test notification:", error);
        return NextResponse.json(
            { error: "Failed to create test notification" },
            { status: 500 }
        );
    }
}
