import {z} from 'zod';


// export const registerSchema = z.object({
//     email: z.string().trim().email({ message: "Invalid email address" }).trim(),
//     password: z.string().trim().min(6, {
//         message: 'Password must be at least 6 characters'
//     })
// })

// export type RegisterSchema = z.infer<typeof registerSchema>

export const registerSchema = z
  .object({
    email: z.email(),
    password: z
    .string().superRefine((val, ctx)=> {
      const password = val || "";
      const uppercase = password.match(/[A-Z]/);
      const lowercase = password.match(/[a-z]/);
      const digit = password.match(/\d/);
      const special = password.match(/[^A-Za-z0-9]/);

      if (password.length < 8) {
        ctx.addIssue({
          message: "Password must be at least 8 characters.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (password.length > 20) {
        ctx.addIssue({
          message: "Password cannot be more than 20 characters.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!uppercase) {
        ctx.addIssue({
          message: "Password must contain an uppercase letter.",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!lowercase) {
        ctx.addIssue({
          message: "Password must contain an lowercase letter.",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!digit) {
        ctx.addIssue({
          message: "Password must contain a number.",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!special) {
        ctx.addIssue({
          message: "Password must contain a special character.",
          code: z.ZodIssueCode.custom,
        });
      }
    }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;