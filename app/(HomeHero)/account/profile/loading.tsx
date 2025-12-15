"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30 py-8 px-4 md:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Profile Card Skeleton */}
        <Card className="border-0 shadow-lg dark:bg-linear-to-br dark:from-card dark:via-card dark:to-muted">
          <CardHeader className="bg-linear-to-r from-primary/10 to-primary/5 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar Skeleton */}
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              {/* Edit Button Skeleton */}
              <Skeleton className="h-10 w-32" />
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Name Field Skeleton */}
              <div className="p-4 rounded-lg bg-muted/50">
                <Skeleton className="h-4 w-20 mb-3" />
                <Skeleton className="h-6 w-32" />
              </div>

              {/* Email Field Skeleton */}
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                </div>
              </div>

              {/* Avatar Status Skeleton */}
              <div className="p-4 rounded-lg bg-muted/50">
                <Skeleton className="h-4 w-28 mb-3" />
                <Skeleton className="h-6 w-40" />
              </div>

              {/* Member Since Skeleton */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Security Section Skeleton */}
        <div className="mt-8 p-6 rounded-lg bg-muted/30 border border-muted/50">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-4 w-full mb-3" />
          <Skeleton className="h-4 w-96 mb-4" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
