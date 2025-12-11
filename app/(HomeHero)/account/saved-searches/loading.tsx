import { ListItemLoading } from "@/components/ui/loading-skeletons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SavedSearchesLoading() {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>

            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <ListItemLoading key={i} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
