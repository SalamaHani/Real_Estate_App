"use client";

import React from "react";
import { Bell } from "lucide-react";

interface NotificationBellProps {
    unreadCount: number;
    onClick: () => void;
    isOpen: boolean;
}

export default function NotificationBell({
    unreadCount,
    onClick,
    isOpen,
}: NotificationBellProps) {
    return (
        <button
            onClick={onClick}
            className="relative p-2 rounded-lg transition-all duration-300 hover:bg-muted group"
            aria-label="Notifications"
        >
            <Bell
                className={`w-5 h-5 transition-all duration-300 ${isOpen
                        ? "text-primary scale-110"
                        : "text-foreground group-hover:text-primary"
                    }`}
            />
            {unreadCount > 0 && (
                <span
                    className={`absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center px-1.5 text-xs font-bold text-white bg-accent rounded-full animate-pulse shadow-lg ${unreadCount > 99 ? "text-[10px]" : ""
                        }`}
                >
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </button>
    );
}
