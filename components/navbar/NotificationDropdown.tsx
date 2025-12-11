"use client";

import React, { useState, useEffect, useRef } from "react";
import NotificationItem from "./NotificationItem";
import { CheckCheck, Loader2 } from "lucide-react";
import { useNotificationPusher } from "@/hooks/useNotificationPusher";

interface NotificationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

export default function NotificationDropdown({
    isOpen,
    onClose,
    userId,
}: NotificationDropdownProps) {
    const [markingAllRead, setMarkingAllRead] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Use Pusher hook for real-time notifications
    const { notifications, loading, refetch } = useNotificationPusher(userId);

    // Mark notification as read
    const markAsRead = async (id: string) => {
        try {
            await fetch(`/api/notification/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isRead: true }),
            });
            // Pusher will handle the state update automatically
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            setMarkingAllRead(true);
            await fetch("/api/notification/mark-all-read", {
                method: "POST",
            });
            // Pusher will handle the state update automatically
        } catch (error) {
            console.error("Error marking all as read:", error);
        } finally {
            setMarkingAllRead(false);
        }
    };

    // Delete notification
    const deleteNotification = async (id: string) => {
        try {
            await fetch(`/api/notification/${id}`, {
                method: "DELETE",
            });
            // Pusher will handle the state update automatically
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const unreadNotifications = notifications.filter((n) => !n.isRead);

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] rounded-xl z-99999 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            style={{
                zIndex: 999999,
                backdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Notifications</h3>
                {unreadNotifications.length > 0 && (
                    <button
                        onClick={markAllAsRead}
                        disabled={markingAllRead}
                        className="flex items-center gap-2 text-xs font-medium text-accent hover:text-accent/80 transition-colors disabled:opacity-50"
                    >
                        {markingAllRead ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <CheckCheck className="w-4 h-4" />
                        )}
                        Mark all read
                    </button>
                )}
            </div>

            {/* Notification List */}
            <div className="max-h-[500px] overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                            <svg
                                className="w-8 h-8 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                            No notifications yet
                        </p>
                        <p className="text-xs text-muted-foreground/70 text-center mt-1">
                            We'll notify you when something new happens
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-border/50">
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={markAsRead}
                                onDelete={deleteNotification}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
