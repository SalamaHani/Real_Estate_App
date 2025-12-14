"use client";

import { useEffect, useState, useCallback } from "react";
import { usePusher } from "@/components/providers/PusherProvider";
import type { Channel } from "pusher-js";

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  createdAt: Date;
  metadata?: string | null;
}

interface NotificationEventData {
  notification?: Notification;
  notificationId?: string;
  unreadCount: number;
  countIncrement?: number;
  userId?: string;
}

export function useNotificationPusher(userId: string | undefined) {
  const { pusherClient, isConnected } = usePusher();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState<Channel | null>(null);

  // Fetch initial notifications
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await fetch("/api/notification?limit=20");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Subscribe to Pusher channel
  useEffect(() => {
    if (!userId || !pusherClient || !isConnected) {
      return;
    }

    const channelName = `private-user-${userId}`;
    const userChannel = pusherClient.subscribe(channelName);

    // Handle new notification
    userChannel.bind("notification:new", (data: NotificationEventData) => {
      if (data.notification) {
        console.log(`
🔔 [CLIENT] New notification received
   Type: ${data.notification.type}
   Title: ${data.notification.title}
   Unread Count: ${data.unreadCount}
   Increment: +${data.countIncrement || 1}
                `);
        setNotifications((prev) => [data.notification!, ...prev]);
        setUnreadCount(data.unreadCount);
      }
    });

    // Handle notification marked as read
    userChannel.bind("notification:read", (data: NotificationEventData) => {
      if (data.notificationId) {
        console.log(`
✅ [CLIENT] Notification marked as read
   Notification ID: ${data.notificationId}
   Unread Count: ${data.unreadCount}
   Increment: ${data.countIncrement || -1}
                `);
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === data.notificationId
              ? { ...notif, isRead: true }
              : notif
          )
        );
        setUnreadCount(data.unreadCount);
      }
    });

    // Handle notification deleted
    userChannel.bind("notification:deleted", (data: NotificationEventData) => {
      if (data.notificationId) {
        console.log(`
🗑️ [CLIENT] Notification deleted
   Notification ID: ${data.notificationId}
   Unread Count: ${data.unreadCount}
   Increment: ${data.countIncrement || -1}
                `);
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== data.notificationId)
        );
        setUnreadCount(data.unreadCount);
      }
    });

    // Handle mark all as read
    userChannel.bind("notification:all-read", (data: NotificationEventData) => {
      console.log(`
📋 [CLIENT] All notifications marked as read
   Previous Count: ${unreadCount}
   New Count: 0
   Increment: ${data.countIncrement || 0}
                `);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
    });

    setChannel(userChannel);

    // Fetch initial data
    fetchNotifications();

    // Clean up on unmount
    return () => {
      userChannel.unbind_all();
      pusherClient.unsubscribe(channelName);
    };
  }, [userId, pusherClient, isConnected, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    isConnected,
    refetch: fetchNotifications,
  };
}
