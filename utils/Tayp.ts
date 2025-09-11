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
