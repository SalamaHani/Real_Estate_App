"use client";
import Continer from "../global/Continer";
import imgdark from "../../public/imges/app_uploads_sites_barringtonteam_2024_04_Barrington-Group-Logo-lg-text-1 (laiet).webp";
import imglhait from "../../public/imges/output-onlinepngtools.png";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Session } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
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
        <Continer className="flex justify-between md:flex-row md:justify-between md:items-center flex-wrap py-5 gap-4">
          <div>
            <Link href="/">
              <Image
                width="178"
                height="58"
                src={imgdark}
                alt="hero"
                className="col-span-2 w-24 sm:w-32 md:w-40 h-auto fixed-logo ls-is-cached lazyloaded object-contain lg:col-span-1  hidden dark:block"
              />
              <Image
                width="178"
                height="58"
                src={imglhait}
                alt="hero"
                className="col-span-2 w-24 sm:w-32 md:w-40 h-auto fixed-logo ls-is-cached lazyloaded object-contain lg:col-span-1 block dark:hidden"
              />
            </Link>
          </div>
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
export default Navhero;
