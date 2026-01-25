import { z } from 'zod'
// import { AccountTypeValues } from '@/constants/account-type';

export const registerChecksSchema = z.object({
  // accountType: z
  //   .nativeEnum(AccountTypeValues),
  //   // accountType: z.string(),
  emailVerify: z.boolean().refine((val) => val === true, {
    message:
      "You need to have access to the email address you are registering with.",
  }),
  readSafeguarding: z.boolean().refine((val) => val === true, {
    message: "Please read our safeguarding policy.",
  }),
  over18: z.boolean().refine((val) => val === true, {
    message: "You need to be 18 or over to use this site.",
  }),
  rightToWork: z.boolean().refine((val) => val === true, {
    message: "You need to have the right to work in the UK.",
  }),
  onlyAccount: z.boolean().refine((val) => val === true, {
    message: "Please delete your other accounts before creating a new one.",
  }),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, { message: "Please read our terms." }),
  })
  // .superRefine((val, ctx) => {
  //   if (val.accountType === AccountTypeValues.Tutor && !val.rightToWork) {
  //     ctx.addIssue({
  //       message: "You need to have the right to work in the UK.",
  //       code: z.ZodIssueCode.custom,
  //       path: ["rightToWork"],
  //     });
  //   }
  
  // })
  
export type RegisterChecksSchema = z.infer<typeof registerChecksSchema>;
