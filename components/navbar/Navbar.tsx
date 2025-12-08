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

function Navbar({ session }: { session: Session | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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
        className={` absolute  top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white dark:bg-black shadow-md fixed" : "bg-transparent"
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

export default Navbar;
