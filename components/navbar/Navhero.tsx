"use client";
import Continer from "../global/Continer";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import { Session } from "@/lib/auth";
import { usePathname } from "next/navigation";
import CurrencySelector from "./Curentreat";
import { useState, useEffect } from "react";
import NotificationBell from "./NotificationBell";
import NotificationDropdown from "./NotificationDropdown";

function Navhero({ session }: { session: Session | null }) {
  const pathname = usePathname();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const isSearchPage = pathname.replace(/\/$/, "") === "/listing";

  // Fetch initial notification count when component mounts
  useEffect(() => {
    if (session?.user?.id) {
      fetchNotificationCount();
    }
  }, [session?.user?.id]);

  const fetchNotificationCount = async () => {
    try {
      const response = await fetch("/api/notification?limit=1");
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };

  return (
    <>
      <nav
        className={` ${isSearchPage ? `top-0  left-0 w-full z-50  bg-white   dark:bg-black  transition-all duration-500  shadow-md fixed` : ` border-b`}`}
      >
        <Continer className="flex justify-between items-center py-3 sm:py-4 md:py-5 gap-3 md:gap-4">
          {/* Logo */}
          <Logo scrolled={isSearchPage} />

          {/* Right Side Actions */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 items-center">
            {/* Hide currency selector on very small screens */}
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>
            <DarkMode />
            {session && (
              <div className="relative">
                <NotificationBell
                  unreadCount={unreadCount}
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  isOpen={notificationOpen}
                />
                <NotificationDropdown
                  isOpen={notificationOpen}
                  onClose={() => setNotificationOpen(false)}
                  onUnreadCountChange={setUnreadCount}
                />
              </div>
            )}
            <LinksDropdown session={session} />
          </div>
        </Continer>
      </nav>
    </>
  );
}
export default Navhero;

