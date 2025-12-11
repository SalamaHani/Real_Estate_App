import { pusherServesr } from "./Pusher";

export interface NotificationEventData {
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
        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:new",
            {
                notification,
                unreadCount,
            } as NotificationEventData
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
        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:read",
            {
                notificationId,
                unreadCount,
            } as NotificationEventData
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
        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:deleted",
            {
                notificationId,
                unreadCount,
            } as NotificationEventData
        );
    } catch (error) {
        console.error("Error sending delete event:", error);
    }
}

/**
 * Send mark all as read event
 */
export async function sendMarkAllReadEvent(userId: string) {
    try {
        await pusherServesr.trigger(
            `private-user-${userId}`,
            "notification:all-read",
            {
                unreadCount: 0,
            } as NotificationEventData
        );
    } catch (error) {
        console.error("Error sending mark all read event:", error);
    }
}
