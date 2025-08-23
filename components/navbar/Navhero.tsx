"use client";
import Continer from "../global/Continer";
import imgdark from "../../public/imges/app_uploads_sites_barringtonteam_2024_04_Barrington-Group-Logo-lg-text-1 (laiet).webp";
import imglhait from "../../public/imges/output-onlinepngtools.png";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Session } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
function Navhero({ session }: { session: Session | null }) {
  return (
    <>
      <nav className="border-b ">
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
          <div className=" flex gap-4 items-center  ">
            {/* <CartButton /> */}
            <DarkMode />
            <LinksDropdown session={session} />
          </div>
        </Continer>
      </nav>
    </>
  );
}
export default Navhero;
