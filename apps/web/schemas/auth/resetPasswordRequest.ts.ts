import { z } from "zod";


export const passwordResetRequest = z
  .object({
    email: z.email({
      message: "Please enter a valid email address."
    }),
  });

export type PasswordResetRequest = z.infer<typeof passwordResetRequest>;
