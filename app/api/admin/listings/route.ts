import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CreateListingSchema } from "@/utils/schema";
import { z } from "zod";

// GET - Fetch all listings with pagination
export async function GET(request: NextRequest) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [listings, total] = await Promise.all([
            prisma.listing.findMany({
                skip,
                take: limit,
                orderBy: { id: "desc" },
            }),
            prisma.listing.count(),
        ]);

        return NextResponse.json({
            success: true,
            listings,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch listings",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

// POST - Create new listing with validation
export async function POST(request: NextRequest) {
    try {
        const requestHeaders = await headers();
        const session = await auth.api.getSession({ headers: requestHeaders });

        if (!session?.user?.id) {
            return NextResponse.json({
                success: false,
                error: "Unauthorized"
            }, { status: 401 });
        }

        const body = await request.json();

        // Validate input data
        const validationResult = CreateListingSchema.safeParse(body);

        if (!validationResult.success) {
            const errors = validationResult.error.flatten();
            console.error("Validation errors:", errors);

            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    validationErrors: errors.fieldErrors,
                    message: "Please check all required fields",
                },
                { status: 400 }
            );
        }

        const validatedData = validationResult.data;

        // Prepare data for MongoDB
        const listingData = {
            price: validatedData.price,
            bedrooms: BigInt(validatedData.bedrooms),
            bathrooms: BigInt(validatedData.bathrooms),
            full_bathrooms: BigInt(validatedData.full_bathrooms || 0),
            half_bathrooms: BigInt(validatedData.half_bathrooms || 0),
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
            coordinates: validatedData.coordinates || [
                validatedData.location.lng,
                validatedData.location.lat
            ],
            is_caravan: validatedData.is_caravan ?? false,
            caravan_start_date: validatedData.caravan_start_date ?? null,
            caravan_start_time: validatedData.caravan_start_time ?? null,
            caravan_end_time: validatedData.caravan_end_time ?? null,
            caravan_food_offered: validatedData.caravan_food_offered ?? null,
            caravan_notes: validatedData.caravan_notes ?? null,
        };

        console.log("Creating listing with data:", {
            price: listingData.price,
            location: listingData.location.city,
            bedrooms: listingData.bedrooms.toString(),
        });

        // Create listing in database
        const listing = await prisma.listing.create({
            data: listingData,
        });

        console.log("✅ Listing created successfully:", listing.id);

        return NextResponse.json({
            success: true,
            message: "Listing created successfully",
            listing: {
                id: listing.id,
                price: listing.price,
                location: listing.location,
                property_type: listing.property_type,
            },
        }, { status: 201 });

    } catch (error) {
        console.error("❌ Error creating listing:", error);

        // Handle specific Prisma errors
        if (error instanceof Error) {
            if (error.message.includes("Unique constraint")) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Duplicate listing",
                        details: "A listing with this information already exists",
                    },
                    { status: 409 }
                );
            }
        }

        return NextResponse.json(
            {
                success: false,
                error: "Failed to create listing",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
