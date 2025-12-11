import { GridLoading } from "@/components/ui/loading-skeletons";

export default function HomeLoading() {
    return (
        <div className="container mx-auto p-6">
            {/* Hero Section Skeleton */}
            <div className="mb-12">
                <div className="h-16 w-96 bg-muted animate-pulse rounded mb-4" />
                <div className="h-6 w-full max-w-2xl bg-muted animate-pulse rounded mb-8" />
                <div className="flex gap-4">
                    <div className="h-12 w-32 bg-muted animate-pulse rounded" />
                    <div className="h-12 w-32 bg-muted animate-pulse rounded" />
                </div>
            </div>

            {/* Featured Listings */}
            <div className="mb-8">
                <div className="h-8 w-48 bg-muted animate-pulse rounded mb-6" />
                <GridLoading count={6} />
            </div>
        </div>
    );
}
