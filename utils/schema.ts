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
// export const ReiewUsertSchema = z.object({
//   comment: z.string().min(1, { message: "First Name is required" }),
//   listingId: z.string().min(1, { message: "Last Name is required" }),
//   authorName: z.string().min(1, { message: "Invalid email address" }),
//   rating: z.number().min(7, { message: "Phone number is required" }),
// });
