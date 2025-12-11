import prisma from "@/utils/db";
import { sendNotificationEvent } from "./pusher-server";

/**
 * Create a welcome notification for a new user
 */
export async function createWelcomeNotification(userId: string, userName: string) {
    try {
        // Create welcome notification in database
        const notification = await prisma.notification.create({
            data: {
                userId: userId,
                type: "SYSTEM",
                title: "Welcome to Barrington Group! 🎉",
                message: `Hello ${userName}! Welcome to our real estate platform. We're excited to have you here. Start exploring amazing properties today!`,
                link: "/",
                isRead: false,
                metadata: JSON.stringify({ welcomeNotification: true }),
            },
        });

        // Get unread count
        const unreadCount = await prisma.notification.count({
            where: {
                userId: userId,
                isRead: false,
            },
        });

        // Send Pusher event for real-time notification
        await sendNotificationEvent(userId, notification, unreadCount);

        console.log(`Welcome notification sent to user ${userId}`);
        return notification;
    } catch (error) {
        console.error("Error creating welcome notification:", error);
        return null;
    }
}

/**
 * Create a login notification for returning users
 */
export async function createLoginNotification(userId: string, userName: string) {
    try {
        const notification = await prisma.notification.create({
            data: {
                userId: userId,
                type: "SYSTEM",
                title: "Welcome Back! 👋",
                message: `Hello ${userName}! Great to see you again. Check out the latest property listings.`,
                link: "/",
                isRead: false,
                metadata: JSON.stringify({ loginNotification: true }),
            },
        });

        const unreadCount = await prisma.notification.count({
            where: {
                userId: userId,
                isRead: false,
            },
        });

        await sendNotificationEvent(userId, notification, unreadCount);

        console.log(`Login notification sent to user ${userId}`);
        return notification;
    } catch (error) {
        console.error("Error creating login notification:", error);
        return null;
    }
}
