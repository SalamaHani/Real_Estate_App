import { StatsCardLoading } from "@/components/ui/loading-skeletons";

export default function AdminDashboardLoading() {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <div className="h-10 w-64 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-96 bg-muted animate-pulse rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <StatsCardLoading key={i} />
                ))}
            </div>
        </div>
    );
}
