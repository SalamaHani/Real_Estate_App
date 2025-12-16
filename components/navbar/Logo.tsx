"use client";
import React from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";



function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group transition-all duration-200 hover:opacity-80"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
      </div>

      {/* Text Logo */}
      <div className="flex flex-col leading-tight">
        <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary tracking-tight">
          AQuery Group
        </span>
        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium -mt-1">
          Fine Properties
        </span>
      </div>
    </Link>
  );
}

export default Logo;

