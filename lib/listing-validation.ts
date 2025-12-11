import { z } from "zod";

// Location validation schema
const locationSchema = z.object({
    street_address: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "State is required").max(2, "State must be 2 characters"),
    zip_code: z.string().min(5, "Valid ZIP code is required"),
    county: z.string().optional(),
    neighborhood: z.string().optional(),
    unit_number: z.string().optional(),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    display_address: z.boolean().optional().default(true),
});

// Agent validation schema
const agentSchema = z.object({
    broker_email: z.string().email().optional().default(""),
    broker_phone: z.string().optional().default(""),
    brokerage_name: z.string().optional().default(""),
    email: z.string().email(),
    first_name: z.string().min(1),
    franchise_name: z.string().optional().default(""),
    full_name: z.string().min(1),
    last_name: z.string().min(1),
    mobile_phone_line_number: z.string().optional().default(""),
    office_city: z.string().optional().default(""),
    office_line_number: z.string().optional().default(""),
    office_name: z.string().optional().default(""),
    office_state: z.string().optional().default(""),
    office_street_address: z.string().optional().default(""),
    office_zip_code: z.string().optional().default(""),
    photo: z.string().url().optional().default(""),
    social_media: z.object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        linkedin: z.string().optional(),
        pinterest: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
    }).optional().default({}),
});

// Office validation schema
const officeSchema = z.object({
    broker_email: z.string().email().optional().default(""),
    broker_phone: z.string().optional().default(""),
    brokerage_name: z.string().optional().default(""),
    franchise_name: z.string().optional().default(""),
    office_city: z.string().optional().default(""),
    office_name: z.string().optional().default(""),
    office_state: z.string().optional().default(""),
    office_street_address: z.string().optional().default(""),
    office_zip_code: z.string().optional().default(""),
});

// Main listing validation schema
export const createListingSchema = z.object({
    // Required fields
    price: z.number().positive("Price must be positive"),
    bedrooms: z.number().int().nonnegative("Bedrooms must be non-negative"),
    bathrooms: z.number().int().nonnegative("Bathrooms must be non-negative"),
    full_bathrooms: z.number().int().nonnegative().default(0),
    half_bathrooms: z.number().int().nonnegative().default(0),
    property_type: z.string().min(1, "Property type is required"),
    listing_status: z.string().min(1, "Listing status is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    location: locationSchema,

    // Optional fields
    living_area: z.number().int().positive().nullable().optional(),
    lot_size: z.number().positive().nullable().optional(),
    year_built: z.number().int().min(1800).max(new Date().getFullYear() + 1).nullable().optional(),

    // Listing details
    listing_source: z.string().default("Admin"),
    mls_name: z.string().default(""),
    listing_email: z.string().email("Valid email required").or(z.literal("")),
    always_email_agents: z.string().default("false"),
    make_notified: z.boolean().default(true),
    is_rental: z.boolean().default(false),

    // URLs
    url: z.string().url().optional(),
    virtual_tour_url: z.string().url().optional().or(z.literal("")),
    single_property_website: z.string().url().optional().or(z.literal("")),

    // Additional info
    schools_district: z.string().default(""),
    photos: z.array(z.string().url()).default([]),
    agents: z.array(agentSchema).default([]),
    offices: z.array(officeSchema).default([]),
    office_ids: z.array(z.string()).default([]),
    coordinates: z.array(z.number()).length(2).optional(),

    // Caravan fields
    is_caravan: z.boolean().optional().default(false),
    caravan_start_date: z.string().nullable().optional(),
    caravan_start_time: z.string().nullable().optional(),
    caravan_end_time: z.string().nullable().optional(),
    caravan_food_offered: z.string().nullable().optional(),
    caravan_notes: z.string().nullable().optional(),
});

// Update listing schema (allows partial updates)
export const updateListingSchema = createListingSchema.partial();

// Type inference
export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
