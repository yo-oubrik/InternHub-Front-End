import { z } from "zod";

export const VERIFICATION_CODE_COOLDOWN = 180; // 3 minutes in seconds

export const companySignUpSchema = z
    .object({
        name: z.string().min(1, "Company name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(8, "Password should be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const verificationCodeSchema = z.object({
    verificationCode: z
        .string()
        .min(6, { message: "Verification code must be 6 characters" })
        .max(6, { message: "Verification code must be 6 characters" })
        .regex(/^[a-zA-Z0-9]{6}$/, {
            message: "Verification code must contain only alphanumeric characters",
        }),
});

export type CompanySignUpFormData = z.infer<typeof companySignUpSchema>;
export type VerificationFormData = z.infer<typeof verificationCodeSchema>;
