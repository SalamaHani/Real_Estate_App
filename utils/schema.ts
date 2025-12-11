import { z } from "zod";
export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
export const AgentcontactSchema = z.object({
  FirstName: z.string().min(1, { message: "First Name is required" }),
  LastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  Phone: z.number().min(7, { message: "Phone number is required" }),
});
export const SavedcontactSchema = z.object({
  nameSearch: z.string().min(1, { message: "Name Search  is required" }),
  email_frequency: z.string().min(1, { message: "Email frequency is required" }),
  url: z.string().min(1, { message: "URL is required" }),
});

// ==================== LISTING VALIDATION SCHEMAS ====================

// Location validation schema
export const LocationSchema = z.object({
  street_address: z.string().min(1, { message: "Street address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }).max(2, { message: "State must be 2 characters." }),
  zip_code: z.string().min(5, { message: "Valid ZIP code is required." }),
  county: z.string().optional(),
  neighborhood: z.string().optional(),
  unit_number: z.string().optional(),
  lat: z.number().min(-90, { message: "Invalid latitude." }).max(90, { message: "Invalid latitude." }),
  lng: z.number().min(-180, { message: "Invalid longitude." }).max(180, { message: "Invalid longitude." }),
  display_address: z.boolean().optional().default(true),
});

// Agent validation schema
export const AgentSchema = z.object({
  broker_email: z.string().email().optional().default(""),
  broker_phone: z.string().optional().default(""),
  brokerage_name: z.string().optional().default(""),
  email: z.string().email({ message: "Valid email required." }),
  first_name: z.string().min(1, { message: "First name is required." }),
  franchise_name: z.string().optional().default(""),
  full_name: z.string().min(1, { message: "Full name is required." }),
  last_name: z.string().min(1, { message: "Last name is required." }),
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
export const OfficeSchema = z.object({
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
export const CreateListingSchema = z.object({
  // Required fields
  price: z.number().positive({ message: "Price must be positive." }),
  bedrooms: z.number().int().nonnegative({ message: "Bedrooms must be non-negative." }),
  bathrooms: z.number().int().nonnegative({ message: "Bathrooms must be non-negative." }),
  full_bathrooms: z.number().int().nonnegative().default(0),
  half_bathrooms: z.number().int().nonnegative().default(0),
  property_type: z.string().min(1, { message: "Property type is required." }),
  listing_status: z.string().min(1, { message: "Listing status is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  location: LocationSchema,

  // Optional fields
  living_area: z.number().int().positive().nullable().optional(),
  lot_size: z.number().positive().nullable().optional(),
  year_built: z.number().int().min(1800, { message: "Invalid year." }).max(new Date().getFullYear() + 1, { message: "Invalid year." }).nullable().optional(),

  // Listing details
  listing_source: z.string().default("Admin"),
  mls_name: z.string().default(""),
  listing_email: z.string().email({ message: "Valid email required." }).or(z.literal("")),
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
  agents: z.array(AgentSchema).default([]),
  offices: z.array(OfficeSchema).default([]),
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
export const UpdateListingSchema = CreateListingSchema.partial();

// Type inference
export type CreateListingInput = z.infer<typeof CreateListingSchema>;
export type UpdateListingInput = z.infer<typeof UpdateListingSchema>;
