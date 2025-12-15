"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
  isOpen: boolean;
  pusherUnreadCount?: number;
}

export default function NotificationBell({
  unreadCount,
  onClick,
  isOpen,
  pusherUnreadCount,
}: NotificationBellProps) {
  const [displayCount, setDisplayCount] = useState(unreadCount);
  const [newNotificationPulse, setNewNotificationPulse] = useState(false);

  // Update display count from Pusher when it changes
  useEffect(() => {
    if (pusherUnreadCount !== undefined && pusherUnreadCount !== displayCount) {
      setDisplayCount(pusherUnreadCount);
      // Add pulse animation for new notifications
      if (pusherUnreadCount > displayCount) {
        setNewNotificationPulse(true);
        setTimeout(() => setNewNotificationPulse(false), 1000);
      }
    }
  }, [pusherUnreadCount, displayCount]);

  return (
    <Button
      onClick={() => {
        onClick();
        console.log(`🔔 [BELL] Notification dropdown opened`);
      }}
      className={`relative hover:bg-muted dark:hover:bg-muted/50 group transition-all ${
        newNotificationPulse ? "scale-110" : ""
      }`}
      aria-label="Notifications"
      variant="outline"
      size="icon"
    >
      <Bell
        className={`h-[1.2rem] w-[1.2rem] text-primary rotate-0 scale-100 transition-all ${
          isOpen ? " scale-110" : " group-hover:text-primary "
        }`}
      />
      {displayCount > 0 && (
        <span
          className={`absolute -top-2 -right-1 min-w-5 h-5 flex items-center justify-center px-1.5 text-xs font-bold text-white bg-accent rounded-full shadow-lg ${
            displayCount > 99 ? "text-[10px]" : ""
          } ${newNotificationPulse ? "animate-bounce" : "animate-pulse"}`}
        >
          {displayCount > 99 ? "99+" : displayCount}
        </span>
      )}
    </Button>
  );
}
