import { pusherServesr } from "./Pusher";

export interface NotificationEventData {
    userId?: string;
    notification?: {
        id: string;
        type: string;
        title: string;
        message: string;
        link?: string | null;
        isRead: boolean;
        createdAt: Date;
        metadata?: string | null;
    };
    notificationId?: string;
    unreadCount: number;
    countIncrement?: number;
}

/**
 * Send a new notification event to user's private channel
 */
export async function sendNotificationEvent(
    userId: string,
    notification: NotificationEventData["notification"],
    unreadCount: number
) {
    try {
        const eventData: NotificationEventData = {
            userId: userId,
            notification,
            unreadCount,
            countIncrement: unreadCount > 0 ? 1 : 0,
        };

        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:new",
            eventData
        );




    } catch (error) {
        console.error("Error sending notification event:", error);
    }
}

/**
 * Send read status change event
 */
export async function sendReadStatusEvent(
    userId: string,
    notificationId: string,
    unreadCount: number
) {
    try {
        const eventData: NotificationEventData = {
            userId: userId,
            notificationId,
            unreadCount,
            countIncrement: -1,
        };

        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:read",
            eventData
        );


    } catch (error) {
        console.error("Error sending read status event:", error);
    }
}

/**
 * Send notification deleted event
 */
export async function sendDeleteEvent(
    userId: string,
    notificationId: string,
    unreadCount: number
) {
    try {
        const eventData: NotificationEventData = {
            userId: userId,
            notificationId,
            unreadCount,
            countIncrement: -1,
        };

        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:deleted",
            eventData
        );

        console.log(`
🗑️  [NOTIFICATION DELETED]
   User ID: ${userId}
   Notification ID: ${notificationId}
   Unread Count: ${unreadCount}
   Count Increment: ${eventData.countIncrement}
        `);} catch (error) {
        console.error("Error sending delete event:", error);
    }
}

/**
 * Send mark all as read event
 */
export async function sendMarkAllReadEvent(userId: string) {
    try {
        const eventData: NotificationEventData = {
            userId: userId,
            unreadCount: 0,
            countIncrement: 0,
        };

        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:all-read",
            eventData
        );


    } catch (error) {
        console.error("Error sending mark all read event:", error);
    }
}
