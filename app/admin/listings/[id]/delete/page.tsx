"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteListingAction, fetchListingForEditAction } from "@/utils/admin-listing-actions";

export default function DeleteListingPage() {
    const router = useRouter();
    const params = useParams();
    const listingId = params?.id as string;

    const [listing, setListing] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            if (!listingId) return;

            const result = await fetchListingForEditAction(listingId);
            if (result.success && result.listing) {
                setListing(result.listing);
            } else {
                toast.error("Failed to load listing");
                router.push("/admin/listings");
            }
            setLoading(false);
        };

        fetchListing();
    }, [listingId, router]);

    const handleDelete = async () => {
        if (!listingId) return;

        setDeleting(true);
        const result = await deleteListingAction(listingId);

        if (result.success) {
            toast.success("Listing deleted successfully!");
            router.push("/admin/listings");
        } else {
            toast.error(result.error || "Failed to delete listing");
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6 max-w-2xl">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-[#b45309]" />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/admin/listings")}
                    className="mb-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Listings
                </Button>
                <h1 className="text-4xl font-bold text-foreground">Delete Listing</h1>
                <p className="text-muted-foreground mt-2">
                    This action cannot be undone
                </p>
            </div>

            <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <CardTitle className="text-red-600 dark:text-red-400">
                                Confirm Deletion
                            </CardTitle>
                            <CardDescription>
                                Are you sure you want to delete this listing?
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {listing && (
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Address</p>
                                    <p className="font-medium">
                                        {listing.location?.street_address || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Price</p>
                                    <p className="font-medium">
                                        ${listing.price?.toLocaleString() || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Property Type</p>
                                    <p className="font-medium">{listing.property_type || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Status</p>
                                    <p className="font-medium">{listing.listing_status || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">
                            Warning
                        </h3>
                        <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
                            <li>This listing will be permanently deleted</li>
                            <li>All associated data will be removed</li>
                            <li>This action cannot be undone</li>
                            <li>Users will no longer be able to view this property</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/listings")}
                        disabled={deleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {deleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Listing
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
