import { z } from "zod";

// Create the schema for the Account Type page
export const passwordResetSchema = z.object({
    password: z.string().min(8),
    confirm: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"], // 👈 attach error to confirm field
});

export type PasswordResetSchema = z.infer<
  typeof passwordResetSchema
>;

