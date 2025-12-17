"use client";

import { useActionState, useState, useEffect } from "react";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import {
  updateListingAction,
  fetchListingForEditAction,
} from "@/utils/admin-listing-actions";

const initialState = {
  success: false,
  error: "",
  validationErrors: {},
};

type ProductEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};
export default function EditListingPage({ params }: ProductEditPageProps) {
  const sershparmid = async () => {
    const resolvedParams = await params;
    return resolvedParams?.id;
  };
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [state, formAction, isPending] = useActionState(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (prevState: any, formData: FormData) => {
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
          county:
            (formData.get("county") as string) ||
            (formData.get("city") as string),
          neighborhood:
            (formData.get("neighborhood") as string) ||
            (formData.get("city") as string),
          unit_number: "",
          lat: parseFloat(formData.get("lat") as string) || 0,
          lng: parseFloat(formData.get("lng") as string) || 0,
        },
        is_rental: formData.get("is_rental") === "true",
        photos: formData.get("photos")
          ? (formData.get("photos") as string)
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean)
          : [],
        virtual_tour_url: (formData.get("virtual_tour_url") as string) || "",
        single_property_website:
          (formData.get("single_property_website") as string) || "",
      };

      const result = await updateListingAction(await sershparmid(), data);

      if (result.success) {
        toast.success("Listing updated successfully!");
        router.push("/admin/listings");
      } else {
        toast.error(result.error || "Failed to update listing");
      }

      return result;
    },
    initialState
  );

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    try {
      const result = await fetchListingForEditAction(await sershparmid());
      if (result.success && result.listing) {
        setListing(result.listing);
      } else {
        toast.error(result.error || "Listing not found");
        router.push("/admin/listings");
      }
    } catch (error) {
      toast.error("Failed to fetch listing");
      router.push("/admin/listings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#b45309]" />
      </div>
    );
  }

  if (!listing) {
    return null;
  }

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
        <h1 className="text-4xl font-bold text-foreground">Edit Listing</h1>
        <p className="text-muted-foreground mt-2">
          Update property information
        </p>
      </div>

      {state.error && !state.success && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-400 font-medium">
            {state.error}
          </p>
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
                  defaultValue={listing.price}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="property_type">Property Type *</Label>
                <Select
                  name="property_type"
                  defaultValue={listing.property_type}
                  required
                >
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
                  defaultValue={listing.bedrooms?.toString()}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  required
                  defaultValue={listing.bathrooms?.toString()}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="full_bathrooms">Full Baths</Label>
                <Input
                  id="full_bathrooms"
                  name="full_bathrooms"
                  type="number"
                  defaultValue={listing.full_bathrooms?.toString() || "0"}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="half_bathrooms">Half Baths</Label>
                <Input
                  id="half_bathrooms"
                  name="half_bathrooms"
                  type="number"
                  defaultValue={listing.half_bathrooms?.toString() || "0"}
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
                  defaultValue={listing.living_area?.toString() || ""}
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
                  defaultValue={listing.lot_size || ""}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="year_built">Year Built</Label>
                <Input
                  id="year_built"
                  name="year_built"
                  type="number"
                  defaultValue={listing.year_built?.toString() || ""}
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
                defaultValue={listing.description}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="listing_status">Status *</Label>
                <Select
                  name="listing_status"
                  defaultValue={listing.listing_status}
                  required
                >
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
                <Select
                  name="is_rental"
                  defaultValue={listing.is_rental ? "true" : "false"}
                  required
                >
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
                defaultValue={listing.location?.street_address}
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
                  defaultValue={listing.location?.city}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  name="state"
                  required
                  defaultValue={listing.location?.state}
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
                  defaultValue={listing.location?.zip_code}
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
                  defaultValue={listing.location?.county}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  defaultValue={listing.location?.neighborhood}
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
                  defaultValue={listing.location?.lat}
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
                  defaultValue={listing.location?.lng}
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
            <div>
              <Label htmlFor="photos">Photos (comma-separated URLs)</Label>
              <Textarea
                id="photos"
                name="photos"
                defaultValue={listing.photos?.join(", ") || ""}
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
                defaultValue={listing.virtual_tour_url || ""}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="single_property_website">Property Website</Label>
              <Input
                id="single_property_website"
                name="single_property_website"
                type="url"
                defaultValue={listing.single_property_website || ""}
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
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Listing
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
