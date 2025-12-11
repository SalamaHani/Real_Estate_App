"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Edit, Home } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchListingsAction, deleteListingAction } from "@/utils/admin-listing-actions";

interface Listing {
    id: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    listing_status: string;
    property_type: string;
    location: {
        street_address: string;
        city: string;
        state: string;
    };
}

export default function ListingsPage() {
    const router = useRouter();
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    useEffect(() => {
        fetchListings();
    }, [pagination.page]);

    const fetchListings = async () => {
        try {
            setLoading(true);
            const result = await fetchListingsAction(pagination.page, pagination.limit);

            if (result.success) {
                setListings(result.listings);
                setPagination((prev) => ({ ...prev, ...result.pagination }));
            } else {
                toast.error(result.error || "Failed to fetch listings");
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
            toast.error("Failed to fetch listings");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing?")) return;

        try {
            setDeleting(id);
            const result = await deleteListingAction(id);

            if (result.success) {
                toast.success("Listing deleted successfully");
                fetchListings();
            } else {
                toast.error(result.error || "Failed to delete listing");
            }
        } catch (error) {
            console.error("Error deleting listing:", error);
            toast.error("An error occurred");
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <Home className="h-10 w-10 text-[#b45309]" />
                        Listings Management
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage all property listings in the database
                    </p>
                </div>
                <Button
                    onClick={() => router.push("/admin/listings/create")}
                    className="bg-[#b45309] hover:bg-[#92400e] text-white"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Listing
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">All Listings ({pagination.total})</CardTitle>
                    <CardDescription>
                        Browse, edit, and delete property listings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="rounded-md border">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr className="border-b">
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-24 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-16 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-16 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-20 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-16 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-left">
                                            <div className="h-4 w-16 bg-muted-foreground/20 animate-pulse rounded" />
                                        </th>
                                        <th className="p-4 text-right">
                                            <div className="h-4 w-16 bg-muted-foreground/20 animate-pulse rounded ml-auto" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                        <tr key={i} className="border-b">
                                            <td className="p-4">
                                                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                                    <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : listings.length === 0 ? (
                        <div className="text-center py-12">
                            <Home className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
                            <p className="text-muted-foreground mb-6">
                                Get started by creating your first listing
                            </p>
                            <Button
                                onClick={() => router.push("/admin/listings/create")}
                                className="bg-[#b45309] hover:bg-[#92400e]"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Listing
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="font-semibold">Address</TableHead>
                                            <TableHead className="font-semibold">City</TableHead>
                                            <TableHead className="font-semibold">Price</TableHead>
                                            <TableHead className="font-semibold">Bed/Bath</TableHead>
                                            <TableHead className="font-semibold">Type</TableHead>
                                            <TableHead className="font-semibold">Status</TableHead>
                                            <TableHead className="text-right font-semibold">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {listings.map((listing) => (
                                            <TableRow key={listing.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium">
                                                    {listing.location?.street_address || "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    {listing.location?.city}, {listing.location?.state}
                                                </TableCell>
                                                <TableCell className="font-semibold text-[#b45309]">
                                                    ${listing.price?.toLocaleString() || 0}
                                                </TableCell>
                                                <TableCell>
                                                    {listing.bedrooms || 0} / {listing.bathrooms || 0}
                                                </TableCell>
                                                <TableCell>{listing.property_type}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${listing.listing_status === "Active"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                            : listing.listing_status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                                                            }`}
                                                    >
                                                        {listing.listing_status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                router.push(`/admin/listings/${listing.id}/edit`)
                                                            }
                                                            className="hover:bg-[#b45309]/10 hover:text-[#b45309]"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                router.push(`/admin/listings/${listing.id}/delete`)
                                                            }
                                                            className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-muted-foreground">
                                    Showing page {pagination.page} of {pagination.totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setPagination((prev) => ({
                                                ...prev,
                                                page: Math.max(1, prev.page - 1),
                                            }))
                                        }
                                        disabled={pagination.page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setPagination((prev) => ({
                                                ...prev,
                                                page: Math.min(prev.totalPages, prev.page + 1),
                                            }))
                                        }
                                        disabled={pagination.page === pagination.totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
