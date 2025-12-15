"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SellLoading() {
  return (
    <div className="w-full">
      {/* Hero Section Skeleton */}
      <section className="relative h-96 w-full bg-muted flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white w-full max-w-2xl px-4 space-y-6">
          {/* Title Skeleton */}
          <Skeleton className="h-12 w-80 mx-auto rounded-lg" />
          
          {/* Subtitle Skeleton */}
          <Skeleton className="h-6 w-96 mx-auto rounded-lg" />
          
          {/* Search Input Skeleton */}
          <div className="w-full space-y-3">
            <div className="flex gap-2">
              <Skeleton className="flex-1 h-14 rounded-lg" />
              <Skeleton className="w-14 h-14 rounded-lg" />
            </div>
          </div>
          
          {/* Dropdown/Results Skeleton */}
          <div className="bg-popover rounded-b-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
            <div className="max-h-80 space-y-2 p-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Section 1: Header */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-96" />
          <div className="space-y-3 max-w-3xl">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Section 2: FAQ Header */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-80" />
          
          {/* Accordion Items Skeleton */}
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="border border-border rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <Skeleton className="h-6 w-96" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-lg bg-card border border-border space-y-4"
            >
              <Skeleton className="h-8 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}