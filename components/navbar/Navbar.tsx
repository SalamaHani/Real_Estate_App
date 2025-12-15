"use client";
import React, { useEffect, useState } from "react";
import Continer from "../global/Continer";
import Logo from "./Logo";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import NotificationBell from "./NotificationBell";
import NotificationDropdown from "./NotificationDropdown";
import { Session } from "@/lib/auth";
import CurrencySelector from "./Curentreat";
import { useNotificationPusher } from "@/hooks/useNotificationPusher";

function Navbar({ session }: { session: Session | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Use Pusher hook for real-time notifications
  const { unreadCount } = useNotificationPusher(session?.user?.id);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={` absolute  top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white dark:bg-linear-to-br dark:from-card dark:via-card dark:to-muted shadow-md fixed" : "bg-transparent"
          }`}
      >
        <Continer className="flex justify-between md:flex-row md:justify-between md:items-center flex-wrap py-5 gap-4">
          <Logo scrolled={scrolled} />
          <div className="flex gap-4 items-center">
            <CurrencySelector />
            <DarkMode />
            {session && (
              <div className="relative">
                <NotificationBell
                  unreadCount={0}
                  pusherUnreadCount={unreadCount}
                  onClick={() => {
                    setNotificationOpen(!notificationOpen);
                    console.log(`🔔 [NAVBAR] Toggling notification dropdown - Open: ${!notificationOpen}`);
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

export default Navbar;
