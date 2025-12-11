import { PageHeaderLoading } from "@/components/ui/loading-skeletons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeleteListingLoading() {
    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <PageHeaderLoading />

            <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-1">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 space-y-2">
                        <Skeleton className="h-5 w-24" />
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-3 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
