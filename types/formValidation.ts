// import { z } from "zod";

// export const companyInfosSchema = z.object({
//     companyName: z.string().min(1, "Company Name is required"),
//     logo: z.any().optional(),
//     companySize: z.string().min(1, "Company Size is required"),
//     description: z.string().min(10, "Description must be at least 10 characters"),
// });

// export const contactSchema = z.object({
//     address: z.string().min(1, "Address is required"),
//     contactEmail: z.string().email("Invalid email"),
//     phone: z.string().min(1, "Phone is required"),
// });

// export const adminSchema = z.object({
//     ice: z.string().min(1, "ICE is required"),
//     rc: z.string().min(1, "RC is required"),
// });

// export const enterpriseSchema = companyInfosSchema
//     .merge(contactSchema)
//     .merge(adminSchema);
//     export type EnterpriseFormData = z.infer<typeof enterpriseSchema>;
    

// // export const enterpriseSchema = z.object({
// //     companyName: z.string().min(1, "Company name is required"),
// //     logo: z.any().optional(),
// //     companySize: z.string().min(1, "Company size is required"),
// //     description: z.string().min(10, "Description must be at least 10 characters"),
// //     address: z.string().min(1, "Address is required"),
// //     contactEmail: z.string().email("Invalid email address"),
// //     phone: z.string().regex(/^\+?\d{8,15}$/, "Invalid phone number"),
// //     ice: z.string().min(1, "ICE is required"),
// //     rc: z.string(),
// // });

