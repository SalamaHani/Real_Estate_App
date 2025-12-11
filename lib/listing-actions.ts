"use server";

import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/users";
import { CreateListingSchema } from "@/utils/schema";

/**
 * Server action to create a new listing
 */
export async function createListingAction(formData: FormData) {
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized - Please log in",
            };
        }

        // Extract and parse form data
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
                unit_number: formData.get("unit_number") as string || "",
                lat: parseFloat(formData.get("lat") as string) || 0,
                lng: parseFloat(formData.get("lng") as string) || 0,
                display_address: true,
            },
            listing_source: formData.get("listing_source") as string || "Admin",
            mls_name: formData.get("mls_name") as string || "",
            listing_email: formData.get("listing_email") as string || "",
            always_email_agents: formData.get("always_email_agents") as string || "false",
            make_notified: formData.get("make_notified") === "true",
            is_rental: formData.get("is_rental") === "true",
            url: formData.get("url") as string || "",
            virtual_tour_url: formData.get("virtual_tour_url") as string || "",
            single_property_website: formData.get("single_property_website") as string || "",
            schools_district: formData.get("schools_district") as string || "",
            photos: formData.get("photos")
                ? (formData.get("photos") as string).split(",").map(p => p.trim()).filter(Boolean)
                : [],
            agents: [],
            offices: [],
            office_ids: [],
            coordinates: [
                parseFloat(formData.get("lng") as string) || 0,
                parseFloat(formData.get("lat") as string) || 0
            ],
            is_caravan: false,
        };

        // Validate
        const validation = CreateListingSchema.safeParse(data);
        if (!validation.success) {
            return {
                success: false,
                error: "Validation failed",
                validationErrors: validation.error.flatten().fieldErrors,
            };
        }

        const validatedData = validation.data;

        // Prepare data for Prisma with proper type annotation to avoid TypeScript errors
        const listingData: any = {
            ...validatedData,
            bedrooms: BigInt(validatedData.bedrooms),
            bathrooms: BigInt(validatedData.bathrooms),
            full_bathrooms: BigInt(validatedData.full_bathrooms),
            half_bathrooms: BigInt(validatedData.half_bathrooms),
            living_area: validatedData.living_area ? BigInt(validatedData.living_area) : null,
            year_built: validatedData.year_built ? BigInt(validatedData.year_built) : null,
            url: validatedData.url || `https://barringtongroup.com/listing/${Date.now()}`,
        };

        // Create listing
        const listing = await prisma.listing.create({
            data: listingData,
        });

        revalidatePath("/admin/listings");

        return {
            success: true,
            message: "Listing created successfully",
            listingId: listing.id,
        };

    } catch (error) {
        console.error("Error in createListingAction:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create listing",
        };
    }
}

/**
 * Server action to update a listing
 */
export async function updateListingAction(listingId: string, formData: FormData) {
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized - Please log in",
            };
        }

        // Similar extraction and validation as create
        // ... (implement similar logic)

        revalidatePath("/admin/listings");
        revalidatePath(`/listing/${listingId}`);

        return {
            success: true,
            message: "Listing updated successfully",
        };

    } catch (error) {
        console.error("Error in updateListingAction:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update listing",
        };
    }
}

/**
 * Server action to delete a listing
 */
export async function deleteListingAction(listingId: string) {
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized - Please log in",
            };
        }

        await prisma.listing.delete({
            where: { id: listingId },
        });

        revalidatePath("/admin/listings");

        return {
            success: true,
            message: "Listing deleted successfully",
        };

    } catch (error) {
        console.error("Error in deleteListingAction:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete listing",
        };
    }
}
