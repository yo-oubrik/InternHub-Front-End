import { z } from "zod";

export const VERIFICATION_CODE_COOLDOWN = 180; // 3 minutes in seconds

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(1, { message: "First name is required" })
            .max(50, { message: "First name must be less than 50 characters" })
            .regex(/^[A-Za-z]+$/, {
                message:
                    "First name must contain only letters and be between 2 and 50 characters",
            }),
        lastName: z
            .string()
            .trim()
            .min(1, { message: "Last name is required" })
            .max(50, { message: "Last name must be less than 50 characters" })
            .regex(/^[A-Za-z\s]+$/, {
                message:
                    "Last name must contain only letters and be between 2 and 50 characters",
            }),
        email: z
            .string()
            .email({ message: "Please enter a valid email address" })
            .min(1, { message: "Email is required" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }),
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

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type VerificationFormData = z.infer<typeof verificationCodeSchema>;
