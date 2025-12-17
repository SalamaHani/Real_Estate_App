export type actionFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export interface UserFormData {
  FirstName: string;
  LastName: string;
  email: string;
  Phone: number;
  userId?: string;
  agentEmail?: string;
  listingId?: string;
}
export interface UserFormDataSaved {
  nameSearch: string;
  userId?: string;
  email_frequency?: string;
  url?: string;
}
export interface ActionAgent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  funactuon?: any;
  Data?: UserFormData;
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UserFormData]?: string[];
  };
}
export interface ActionUserReview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  funactuon?: any;
  Data?: RevierFormData;
  success: boolean;
  message: string;
  errors?: {
    [K in keyof RevierFormData]?: string[];
  };
}
export interface ActionUserSeavd {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  funactuon?: any;
  Data?: UserFormDataSaved;
  success: boolean;
  message: string;
  errors?: {
    [K in keyof UserFormDataSaved]?: string[];
  };
}
export interface metaData {
  total: number;
  totalPage: number;
}
export interface RevierFormData {
  rating: number;
  comment?: string;
  authorName?: string;
  listingId: string;
}
export interface CuantersT {
  country: string;
  iso_code: string;
}

// types/prismaModels.ts
export interface Areacuntry {
  id: string;
  AboutAllCountry: bigint;
  AvgWorkCommute: bigint;
  Catholic: bigint;
  Maps: string;
  MedianAge: bigint;
  MedianAreaIncome: bigint;
  MedianSalePrice: bigint;
  Mosques: bigint;
  Stores: bigint;
  Universities: bigint;
  areaKm2: number;
  description: string;
  hospitalsCount: bigint;
  living_area: bigint;
  name: string;
  photos: string[];
  population: bigint;
  property_type: string;
  schoolsCount: bigint;
}

export interface ListingAgentsSocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  pinterest?: string;
  twitter?: string;
  youtube?: string;
}

export interface ListingAgents {
  broker_email: string;
  broker_phone: string;
  brokerage_name: string;
  email: string;
  first_name: string;
  franchise_name: string;
  full_name: string;
  last_name: string;
  mobile_phone_line_number: string;
  office_city: string;
  office_line_number: string;
  office_name: string;
  office_state: string;
  office_street_address: string;
  office_zip_code: string;
  photo: string;
  social_media: ListingAgentsSocialMedia;
}

export interface ListingLocation {
  city: string;
  county: string;
  display_address?: boolean;
  lat: number;
  lng: number;
  neighborhood: string;
  state: string;
  street_address: string;
  unit_number: string;
  zip_code: string;
}

export interface ListingOffices {
  broker_email: string;
  broker_phone: string;
  brokerage_name: string;
  franchise_name: string;
  office_city: string;
  office_name: string;
  office_state: string;
  office_street_address: string;
  office_zip_code: string;
}

export interface Listing {
  id: string;
  favorites: Favorite[];
  agents: ListingAgents[];
  always_email_agents: string;
  bathrooms: bigint;
  bedrooms: bigint;
  caravan_end_time?: string;
  caravan_food_offered?: string;
  caravan_notes?: string;
  caravan_start_date?: string;
  caravan_start_time?: string;
  coordinates: number[];
  description: string;
  full_bathrooms: bigint;
  half_bathrooms: bigint;
  is_caravan?: boolean;
  is_rental: boolean;
  listing_email: string;
  listing_source: string;
  listing_status: string;
  living_area?: bigint;
  location: ListingLocation;
  lot_size?: number;
  make_notified: boolean;
  mls_name: string;
  office_ids: string[];
  offices: ListingOffices[];
  photos: string[];
  price: number;
  property_type: string;
  schools_district: string;
  single_property_website: string;
  url: string;
  virtual_tour_url: string;
  year_built?: bigint;
}

export interface Favorite {
  id: string;
  userId: string;
  listingId: string;
  listing: Listing;
  createdAt: Date;
}

export interface Review {
  id: string;
  authorName: string;
  comment: string;
  createdAt: Date;
  listingId: string;
  rating: bigint;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  createdAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  updatedAt: Date;
}

export interface Account {
  id: string;
  accessToken?: string;
  accessTokenExpiresAt?: Date;
  accountId: string;
  createdAt: Date;
  idToken?: string;
  password?: string;
  providerId: string;
  scope?: string;
  updatedAt: Date;
  userId: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  metadata?: string;
  createdAt: Date;
}

// Add more models like Areacuntry, interest, session, verification as needed
