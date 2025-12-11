"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import { createListingAction } from "@/utils/admin-listing-actions";

const initialState = {
    success: false,
    error: "",
    validationErrors: {},
    data: {}, // Add data property to match action return type
};

export default function CreateListingPage() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            // Extract form data and convert to object
            const data = {
                price: parseFloat(formData.get("price") as string),
                bedrooms: parseInt(formData.get("bedrooms") as string),
                bathrooms: parseInt(formData.get("bathrooms") as string),
                full_bathrooms: parseInt(formData.get("full_bathrooms") as string) || 0,
                half_bathrooms: parseInt(formData.get("half_bathrooms") as string) || 0,
                living_area: formData.get("living_area")
                    ? parseInt(formData.get("living_area") as string)
                    : null,
                lot_size: formData.get("lot_size")
                    ? parseFloat(formData.get("lot_size") as string)
                    : null,
                year_built: formData.get("year_built")
                    ? parseInt(formData.get("year_built") as string)
                    : null,
                property_type: formData.get("property_type") as string,
                listing_status: formData.get("listing_status") as string,
                description: formData.get("description") as string,
                location: {
                    street_address: formData.get("street_address") as string,
                    city: formData.get("city") as string,
                    state: formData.get("state") as string,
                    zip_code: formData.get("zip_code") as string,
                    county: formData.get("county") as string || formData.get("city") as string,
                    neighborhood: formData.get("neighborhood") as string || formData.get("city") as string,
                    unit_number: "",
                    lat: parseFloat(formData.get("lat") as string) || 0,
                    lng: parseFloat(formData.get("lng") as string) || 0,
                },
                listing_source: "Admin",
                mls_name: formData.get("mls_name") as string || "",
                listing_email: formData.get("listing_email") as string || "",
                is_rental: formData.get("is_rental") === "true",
                photos: formData.get("photos")
                    ? (formData.get("photos") as string).split(",").map(p => p.trim()).filter(Boolean)
                    : [],
                virtual_tour_url: formData.get("virtual_tour_url") as string || "",
                single_property_website: formData.get("single_property_website") as string || "",
                schools_district: formData.get("schools_district") as string || "",
            };

            const result = await createListingAction(data);

            if (result.success) {
                toast.success("Listing created successfully!");
                router.push("/admin/listings");
            } else {
                toast.error(result.error || "Failed to create listing");
            }

            return result;
        },
        initialState
    );

    // Get form data from state (returned on error) or use empty defaults
    const formData = state.data || {};

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/admin/listings")}
                    className="mb-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Listings
                </Button>
                <h1 className="text-4xl font-bold text-foreground">Create New Listing</h1>
                <p className="text-muted-foreground mt-2">Add a new property to the database</p>
            </div>

            {state.error && !state.success && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-800 dark:text-red-400 font-medium">{state.error}</p>
                </div>
            )}

            <form action={formAction} className="space-y-6">
                {/* Basic Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Essential property details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price *</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    required
                                    defaultValue={formData.price || ""}
                                    placeholder="500000"
                                    className="mt-1"
                                />
                                {state.validationErrors?.price && (
                                    <p className="text-sm text-red-600 mt-1">{state.validationErrors.price[0]}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="property_type">Property Type *</Label>
                                <Select name="property_type" defaultValue={formData.property_type || "Single Family"} required>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Single Family">Single Family</SelectItem>
                                        <SelectItem value="Condo">Condo</SelectItem>
                                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                                        <SelectItem value="Multi Family">Multi Family</SelectItem>
                                        <SelectItem value="Land">Land</SelectItem>
                                        <SelectItem value="Commercial">Commercial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <Label htmlFor="bedrooms">Bedrooms *</Label>
                                <Input
                                    id="bedrooms"
                                    name="bedrooms"
                                    type="number"
                                    required
                                    defaultValue={formData.bedrooms || ""}
                                    placeholder="3"
                                    className="mt-1"
                                />
                                {state.validationErrors?.bedrooms && (
                                    <p className="text-sm text-red-600 mt-1">{state.validationErrors.bedrooms[0]}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="bathrooms">Bathrooms *</Label>
                                <Input
                                    id="bathrooms"
                                    name="bathrooms"
                                    type="number"
                                    required
                                    defaultValue={formData.bathrooms || ""}
                                    placeholder="2"
                                    className="mt-1"
                                />
                                {state.validationErrors?.bathrooms && (
                                    <p className="text-sm text-red-600 mt-1">{state.validationErrors.bathrooms[0]}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="full_bathrooms">Full Baths</Label>
                                <Input
                                    id="full_bathrooms"
                                    name="full_bathrooms"
                                    type="number"
                                    defaultValue={formData.full_bathrooms || ""}
                                    placeholder="2"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="half_bathrooms">Half Baths</Label>
                                <Input
                                    id="half_bathrooms"
                                    name="half_bathrooms"
                                    type="number"
                                    defaultValue={formData.half_bathrooms || ""}
                                    placeholder="0"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="living_area">Living Area (sq ft)</Label>
                                <Input
                                    id="living_area"
                                    name="living_area"
                                    type="number"
                                    defaultValue={formData.living_area || ""}
                                    placeholder="2000"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lot_size">Lot Size (acres)</Label>
                                <Input
                                    id="lot_size"
                                    name="lot_size"
                                    type="number"
                                    step="0.01"
                                    defaultValue={formData.lot_size || ""}
                                    placeholder="0.25"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="year_built">Year Built</Label>
                                <Input
                                    id="year_built"
                                    name="year_built"
                                    type="number"
                                    defaultValue={formData.year_built || ""}
                                    placeholder="2020"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                rows={4}
                                defaultValue={formData.description || ""}
                                placeholder="Beautiful property with amazing features..."
                                className="mt-1"
                            />
                            {state.validationErrors?.description && (
                                <p className="text-sm text-red-600 mt-1">{state.validationErrors.description[0]}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="listing_status">Status *</Label>
                                <Select name="listing_status" defaultValue={formData.listing_status || "Active"} required>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Sold">Sold</SelectItem>
                                        <SelectItem value="Off Market">Off Market</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="is_rental">Listing Type *</Label>
                                <Select name="is_rental" defaultValue="false" required>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="false">For Sale</SelectItem>
                                        <SelectItem value="true">For Rent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Location Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Property address and coordinates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="street_address">Street Address *</Label>
                            <Input
                                id="street_address"
                                name="street_address"
                                required
                                defaultValue={formData.location?.street_address || ""}
                                placeholder="123 Main St"
                                className="mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="city">City *</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    required
                                    defaultValue={formData.location?.city || ""}
                                    placeholder="New York"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="state">State *</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    required
                                    defaultValue={formData.location?.state || ""}
                                    placeholder="NY"
                                    maxLength={2}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="zip_code">ZIP Code *</Label>
                                <Input
                                    id="zip_code"
                                    name="zip_code"
                                    required
                                    defaultValue={formData.location?.zip_code || ""}
                                    placeholder="10001"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="county">County</Label>
                                <Input
                                    id="county"
                                    name="county"
                                    defaultValue={formData.location?.county || ""}
                                    placeholder="Manhattan"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="neighborhood">Neighborhood</Label>
                                <Input
                                    id="neighborhood"
                                    name="neighborhood"
                                    defaultValue={formData.location?.neighborhood || ""}
                                    placeholder="Upper West Side"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="lat">Latitude</Label>
                                <Input
                                    id="lat"
                                    name="lat"
                                    type="number"
                                    step="any"
                                    defaultValue={formData.location?.lat || ""}
                                    placeholder="40.7128"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lng">Longitude</Label>
                                <Input
                                    id="lng"
                                    name="lng"
                                    type="number"
                                    step="any"
                                    defaultValue={formData.location?.lng || ""}
                                    placeholder="-74.0060"
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Details Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Additional Details</CardTitle>
                        <CardDescription>Optional information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="mls_name">MLS Name</Label>
                                <Input
                                    id="mls_name"
                                    name="mls_name"
                                    placeholder="MLSLI"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="listing_email">Listing Email</Label>
                                <Input
                                    id="listing_email"
                                    name="listing_email"
                                    type="email"
                                    placeholder="agent@example.com"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="schools_district">School District</Label>
                            <Input
                                id="schools_district"
                                name="schools_district"
                                placeholder="District 2"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="photos">Photos (comma-separated URLs)</Label>
                            <Textarea
                                id="photos"
                                name="photos"
                                placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
                                rows={3}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="virtual_tour_url">Virtual Tour URL</Label>
                            <Input
                                id="virtual_tour_url"
                                name="virtual_tour_url"
                                type="url"
                                placeholder="https://example.com/tour"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="single_property_website">Property Website</Label>
                            <Input
                                id="single_property_website"
                                name="single_property_website"
                                type="url"
                                placeholder="https://example.com/property"
                                className="mt-1"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 bg-[#b45309] hover:bg-[#92400e] text-white"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Create Listing
                            </>
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/listings")}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
