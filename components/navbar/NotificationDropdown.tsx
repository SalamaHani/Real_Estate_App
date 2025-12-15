"use client";

import React, { useState, useEffect, useRef } from "react";
import NotificationItem from "./NotificationItem";
import { CheckCheck, Loader2, RefreshCw } from "lucide-react";
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use Pusher hook for real-time notifications
  const { notifications, loading, unreadCount, refetch } =
    useNotificationPusher(userId);

  // Refresh notifications
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      console.log(`🔄 [DROPDOWN] Refreshing notifications...`);
      await refetch();
      console.log(`✅ [DROPDOWN] Notifications refreshed successfully`);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to refresh notifications";
      setError(errorMsg);
      console.error(`❌ [DROPDOWN] Refresh error:`, err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      console.log(`📤 Marking notification ${id} as read...`);
      const response = await fetch(`/api/notification/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      if (response.ok) {
        console.log(`✅ Notification ${id} marked as read`);
      }
      // Pusher will handle the state update automatically
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      setMarkingAllRead(true);
      const response = await fetch("/api/notification/mark-all-read", {
        method: "POST",
      });
      if (response.ok) {
        console.log(`✅ All notifications marked as read`);
      }
      // Pusher will handle the state update automatically
    } catch (error) {
      console.error("Error marking all as read:", error);
    } finally {
      setMarkingAllRead(false);
    }
  };

  // Delete notification


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

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] rounded-xl z-99999 overflow-hidden animate-in fade-in duration-200 dark:bg-linear-to-br dark:from-card dark:via-card dark:to-muted"
      style={{
        zIndex: 999999,
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "var(--color-card)",
        border: "1px solid var(--color-border)",
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-linear-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-primary rounded-full shadow-md">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="p-1 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
            aria-label="Refresh notifications"
            title="Refresh notifications"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              disabled={markingAllRead}
              className="flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
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
      </div>

      {/* Notification List */}
      <div
        className="max-h-125 overflow-y-auto scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-primary) transparent",
        }}
      >
        <style>{`
          div::-webkit-scrollbar {
            width: 6px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background: var(--color-primary);
            border-radius: 3px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: var(--color-primary);
            opacity: 0.8;
          }
        `}</style>
        {error && (
          <div className="p-4 bg-destructive/10 border-b border-destructive/20 text-destructive text-sm flex items-center justify-between">
            <span>❌ {error}</span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-xs font-medium hover:underline disabled:opacity-50"
            >
              Retry
            </button>
          </div>
        )}
        {loading && !notifications.length ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <svg
                className="w-8 h-8 text-primary"
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
            <p className="text-sm text-foreground text-center font-medium">
              No notifications yet
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Well notify you when something new happens
            </p>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              <RefreshCw
                className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
