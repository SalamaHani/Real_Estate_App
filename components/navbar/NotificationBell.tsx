"use client";

import React from "react";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

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
        <Button
            onClick={onClick}
            className="relative hover:bg-muted dark:hover:bg-muted  group"
            aria-label="Notifications"
            variant="outline"
            size="icon"
        >
            <Bell
                className={`h-[1.2rem] w-[1.2rem] text-primary rotate-0 scale-100 transition-all ${isOpen
                    ? " scale-110"
                    : " group-hover:text-primary "
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
        </Button>
    );
}
