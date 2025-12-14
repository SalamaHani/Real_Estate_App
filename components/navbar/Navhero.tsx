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
import { useNotificationPusher } from "@/hooks/useNotificationPusher";

function Navhero({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Use Pusher hook for real-time notifications
  const { unreadCount } = useNotificationPusher(session?.user?.id);
  const isSearchPage = pathname.replace(/\/$/, "") === "/listing";

  return (
    <>
      <nav
        className={` ${isSearchPage ? `top-0  left-0 w-full z-50  bg-white   dark:bg-gradient-to-br dark:from-card dark:via-card dark:to-muted  transition-all duration-500  shadow-md fixed` : ` border-b`}`}
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
                  unreadCount={0}
                  pusherUnreadCount={unreadCount}
                  onClick={() => {
                    setNotificationOpen(!notificationOpen);
                    console.log(
                      `🔔 [NAVBAR] Toggling notification dropdown - Open: ${!notificationOpen}`
                    );
                  }}
                  isOpen={notificationOpen}
                />
                <NotificationDropdown
                  isOpen={notificationOpen}
                  onClose={() => setNotificationOpen(false)}
                  userId={session.user.id}
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
