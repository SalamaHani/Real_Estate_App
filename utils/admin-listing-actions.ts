"use server";
import { CreateListingSchema, UpdateListingSchema } from "@/utils/schema";
import prisma from "@/utils/db";
import { getSession } from "@/utils/users";
import { revalidatePath } from "next/cache";

// ==================== ADMIN LISTING MANAGEMENT ACTIONS ====================

/**
 * Server action to create a new listing
 */
export async function createListingAction(data: any) {
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized - Please log in",
                data: data, // Return data for form repopulation
            };
        }

        // Validate input
        const validation = CreateListingSchema.safeParse(data);
        if (!validation.success) {
            const errors = validation.error.flatten();
            console.log("Validation errors:", errors);

            return {
                success: false,
                error: "Validation failed",
                validationErrors: errors.fieldErrors,
                data: data, // Return original data so form can repopulate
            };
        }

        const validatedData = validation.data;

        // Prepare listing data with proper types for Prisma
        const listingData: any = {
            price: validatedData.price,
            bedrooms: BigInt(validatedData.bedrooms),
            bathrooms: BigInt(validatedData.bathrooms),
            full_bathrooms: BigInt(validatedData.full_bathrooms),
            half_bathrooms: BigInt(validatedData.half_bathrooms),
            living_area: validatedData.living_area ? BigInt(validatedData.living_area) : null,
            lot_size: validatedData.lot_size ?? null,
            year_built: validatedData.year_built ? BigInt(validatedData.year_built) : null,
            property_type: validatedData.property_type,
            listing_status: validatedData.listing_status,
            description: validatedData.description,
            location: {
                street_address: validatedData.location.street_address,
                city: validatedData.location.city,
                state: validatedData.location.state,
                zip_code: validatedData.location.zip_code,
                county: validatedData.location.county || validatedData.location.city,
                neighborhood: validatedData.location.neighborhood || validatedData.location.city,
                unit_number: validatedData.location.unit_number || "",
                lat: validatedData.location.lat,
                lng: validatedData.location.lng,
                display_address: validatedData.location.display_address ?? true,
            },
            listing_source: validatedData.listing_source || "Admin",
            mls_name: validatedData.mls_name || "",
            listing_email: validatedData.listing_email || "",
            always_email_agents: validatedData.always_email_agents || "false",
            make_notified: validatedData.make_notified ?? true,
            is_rental: validatedData.is_rental ?? false,
            url: validatedData.url || `https://barringtongroup.com/listing/${Date.now()}`,
            virtual_tour_url: validatedData.virtual_tour_url || "",
            single_property_website: validatedData.single_property_website || "",
            schools_district: validatedData.schools_district || "",
            photos: validatedData.photos || [],
            agents: validatedData.agents || [],
            offices: validatedData.offices || [],
            office_ids: validatedData.office_ids || [],
            coordinates: [validatedData.location.lng, validatedData.location.lat],
            is_caravan: false,
            caravan_start_date: null,
            caravan_start_time: null,
            caravan_end_time: null,
            caravan_food_offered: null,
            caravan_notes: null,
        };

        // Create listing
        const listing = await prisma.listing.create({
            data: listingData,
        });

        console.log("✅ Listing created:", listing.id);

        revalidatePath("/admin/listings");
        revalidatePath("/");

        return {
            success: true,
            message: "Listing created successfully",
            listingId: listing.id,
        };

    } catch (error) {
        console.error("❌ Error creating listing:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create listing",
            data: data, // Return data even on error
        };
    }
}

/**
 * Server action to update a listing
 */
export async function updateListingAction(listingId: string, data: any) {
    "use server";
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized - Please log in" };
        }

        const validation = UpdateListingSchema.safeParse(data);
        if (!validation.success) {
            return {
                success: false,
                error: "Validation failed",
                validationErrors: validation.error.flatten().fieldErrors,
            };
        }

        const validatedData = validation.data;

        // Prepare update data
        const updateData: any = {};

        if (validatedData.price !== undefined) updateData.price = validatedData.price;
        if (validatedData.bedrooms !== undefined) updateData.bedrooms = BigInt(validatedData.bedrooms);
        if (validatedData.bathrooms !== undefined) updateData.bathrooms = BigInt(validatedData.bathrooms);
        if (validatedData.full_bathrooms !== undefined) updateData.full_bathrooms = BigInt(validatedData.full_bathrooms);
        if (validatedData.half_bathrooms !== undefined) updateData.half_bathrooms = BigInt(validatedData.half_bathrooms);
        if (validatedData.living_area !== undefined) updateData.living_area = validatedData.living_area ? BigInt(validatedData.living_area) : null;
        if (validatedData.lot_size !== undefined) updateData.lot_size = validatedData.lot_size;
        if (validatedData.year_built !== undefined) updateData.year_built = validatedData.year_built ? BigInt(validatedData.year_built) : null;
        if (validatedData.property_type) updateData.property_type = validatedData.property_type;
        if (validatedData.listing_status) updateData.listing_status = validatedData.listing_status;
        if (validatedData.description) updateData.description = validatedData.description;

        if (validatedData.location) {
            updateData.location = {
                street_address: validatedData.location.street_address!,
                city: validatedData.location.city!,
                state: validatedData.location.state!,
                zip_code: validatedData.location.zip_code!,
                county: validatedData.location.county || validatedData.location.city!,
                neighborhood: validatedData.location.neighborhood || validatedData.location.city!,
                unit_number: validatedData.location.unit_number || "",
                lat: validatedData.location.lat!,
                lng: validatedData.location.lng!,
                display_address: validatedData.location.display_address ?? true,
            };
            updateData.coordinates = [validatedData.location.lng!, validatedData.location.lat!];
        }

        if (validatedData.photos) updateData.photos = validatedData.photos;
        if (validatedData.virtual_tour_url !== undefined) updateData.virtual_tour_url = validatedData.virtual_tour_url;
        if (validatedData.is_rental !== undefined) updateData.is_rental = validatedData.is_rental;

        await prisma.listing.update({
            where: { id: listingId },
            data: updateData,
        });

        revalidatePath("/admin/listings");
        revalidatePath(`/listing/${listingId}`);
        revalidatePath("/");

        return { success: true, message: "Listing updated successfully" };

    } catch (error) {
        console.error("❌ Error updating listing:", error);
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
            return { success: false, error: "Unauthorized - Please log in" };
        }

        await prisma.listing.delete({
            where: { id: listingId },
        });

        revalidatePath("/admin/listings");
        revalidatePath("/");

        return { success: true, message: "Listing deleted successfully" };

    } catch (error) {
        console.error("❌ Error deleting listing:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete listing",
        };
    }
}

/**
 * Server action to fetch all listings with pagination
 */
export async function fetchListingsAction(page: number = 1, limit: number = 10) {
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized",
                listings: [],
                pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
            };
        }

        const skip = (page - 1) * limit;

        const [listings, total] = await Promise.all([
            prisma.listing.findMany({
                skip,
                take: limit,
                orderBy: { id: "desc" },
            }),
            prisma.listing.count(),
        ]);

        return {
            success: true,
            listings,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };

    } catch (error) {
        console.error("Error fetching listings:", error);
        return {
            success: false,
            error: "Failed to fetch listings",
            listings: [],
            pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
        };
    }
}

/**
 * Server action to fetch single listing for editing
 */
export async function fetchListingForEditAction(listingId: string) {
    try {
        const session = await getSession();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized", listing: null };
        }

        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
        });

        if (!listing) {
            return { success: false, error: "Listing not found", listing: null };
        }

        return { success: true, listing };

    } catch (error) {
        console.error("Error fetching listing:", error);
        return { success: false, error: "Failed to fetch listing", listing: null };
    }
}
