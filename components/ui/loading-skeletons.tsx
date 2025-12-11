import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Card Loading Skeleton
export const CardLoading = () => {
    return (
        <article className="group relative">
            <Card className="overflow-hidden pt-0">
                <Skeleton className="w-full aspect-[16/10]" />
                <CardHeader className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-2 w-48" />
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="flex flex-col justify-between">
                        <Skeleton className="h-3 w-30 mb-1" />
                        <Skeleton className="h-2 w-35 mb-1" />
                    </div>
                    <Skeleton className="h-4 w-20 rounded-full" />
                </CardContent>
            </Card>
            <div className="absolute top-4 right-4 z-5">
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </article>
    );
};

// Table Row Loading Skeleton
export const TableRowLoading = () => {
    return (
        <tr className="border-b">
            <td className="p-4"><Skeleton className="h-4 w-full" /></td>
            <td className="p-4"><Skeleton className="h-4 w-24" /></td>
            <td className="p-4"><Skeleton className="h-4 w-20" /></td>
            <td className="p-4"><Skeleton className="h-4 w-16" /></td>
            <td className="p-4"><Skeleton className="h-4 w-24" /></td>
            <td className="p-4"><Skeleton className="h-4 w-20" /></td>
            <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                </div>
            </td>
        </tr>
    );
};

// Dashboard Stats Loading
export const StatsCardLoading = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-3 w-40" />
            </CardContent>
        </Card>
    );
};

// Form Loading Skeleton
export const FormLoading = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

// List Item Loading
export const ListItemLoading = () => {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4 flex-1">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
            <Skeleton className="h-8 w-20 rounded" />
        </div>
    );
};

// Page Header Loading
export const PageHeaderLoading = () => {
    return (
        <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
        </div>
    );
};

// Grid Loading (for property cards)
export const GridLoading = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <CardLoading key={i} />
            ))}
        </div>
    );
};

// Table Loading (for admin tables)
export const TableLoading = ({ rows = 5 }: { rows?: number }) => {
    return (
        <div className="rounded-md border">
            <table className="w-full">
                <thead className="bg-muted/50">
                    <tr className="border-b">
                        <th className="p-4 text-left"><Skeleton className="h-4 w-24" /></th>
                        <th className="p-4 text-left"><Skeleton className="h-4 w-16" /></th>
                        <th className="p-4 text-left"><Skeleton className="h-4 w-16" /></th>
                        <th className="p-4 text-left"><Skeleton className="h-4 w-20" /></th>
                        <th className="p-4 text-left"><Skeleton className="h-4 w-16" /></th>
                        <th className="p-4 text-left"><Skeleton className="h-4 w-16" /></th>
                        <th className="p-4 text-right"><Skeleton className="h-4 w-16 ml-auto" /></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <TableRowLoading key={i} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
