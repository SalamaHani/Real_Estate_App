"use client";

import React from "react";
import Link from "next/link";
import {
    Home,
    DollarSign,
    MessageSquare,
    Star,
    Heart,
    Info,
    Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    link?: string | null;
    isRead: boolean;
    createdAt: Date;
}

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
}

const getNotificationIcon = (type: string) => {
    switch (type) {
        case "NEW_LISTING":
            return <Home className="w-5 h-5 text-accent" />;
        case "PRICE_CHANGE":
            return <DollarSign className="w-5 h-5 text-green-500" />;
        case "NEW_MESSAGE":
            return <MessageSquare className="w-5 h-5 text-blue-500" />;
        case "REVIEW_REPLY":
            return <Star className="w-5 h-5 text-yellow-500" />;
        case "FAVORITE_UPDATE":
            return <Heart className="w-5 h-5 text-red-500" />;
        case "SYSTEM":
            return <Info className="w-5 h-5 text-primary" />;
        default:
            return <Info className="w-5 h-5 text-primary" />;
    }
};

export default function NotificationItem({
    notification,
    onMarkAsRead,
    onDelete,
}: NotificationItemProps) {
    const handleClick = () => {
        if (!notification.isRead) {
            onMarkAsRead(notification.id);
        }
    };

    const NotificationContent = (
        <div
            className={`relative flex gap-3 p-4 rounded-lg transition-all duration-200 group hover:bg-muted/50 cursor-pointer ${!notification.isRead ? "bg-accent/5" : ""
                }`}
            onClick={handleClick}
        >
            {/* Unread Indicator */}
            {!notification.isRead && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-pulse" />
            )}

            {/* Icon */}
            <div className="flex-shrink-0 ml-2">
                {getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4
                    className={`text-sm font-semibold mb-1 ${!notification.isRead ? "text-foreground" : "text-muted-foreground"
                        }`}
                >
                    {notification.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {notification.message}
                </p>
                <span className="text-xs text-muted-foreground/70">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                    })}
                </span>
            </div>

            {/* Delete Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                }}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                aria-label="Delete notification"
            >
                <Trash2 className="w-4 h-4 text-destructive" />
            </button>
        </div>
    );

    if (notification.link) {
        return (
            <Link href={notification.link} className="block">
                {NotificationContent}
            </Link>
        );
    }

    return NotificationContent;
}
