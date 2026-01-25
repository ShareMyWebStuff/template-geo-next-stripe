import { z } from "zod";
import { AccountTypeValues } from '@/constants/account-type'
import { GenderTypeValues } from '@/constants/gender';
import { TitleTypeValues } from '@/constants/title';
import { CountryTypeValues } from "@/constants/country";

// Create the schema for the Account Type page
export const onboardingAccountTypeSchema = z.object({
  accountType: z
    .string()
    .min(1, "Please select an account type")
    .refine(
      (val) =>
        Object.values(AccountTypeValues).includes(val as AccountTypeValues) &&
        val !== AccountTypeValues.NotSelected,
      { message: "Please select an account type" }
    ),
});

export type OnboardingAccountTypeSchema = z.infer<
  typeof onboardingAccountTypeSchema
>;

//
// Create the schemas for the name page
//
const nameBaseSchema = {
  accountType: z.enum([
    AccountTypeValues.Tutor,
    AccountTypeValues.Student,
    AccountTypeValues.Parent,
  ]),
  preferredName: z.string().min(2).max(50),
};

const tutorNameSchema = z.object({
  ...nameBaseSchema,
  accountType: z.literal(AccountTypeValues.Tutor),
  title: z.string().min(1),
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1).max(50),
  gender: z.string().min(1),
});

const studentNameSchema = z.object({
  ...nameBaseSchema,
  accountType: z.literal(AccountTypeValues.Student),
});

const parentNameSchema = z.object({
  ...nameBaseSchema,
  accountType: z.literal(AccountTypeValues.Parent),
});

export const onboardingNameSchema = z.discriminatedUnion(
  "accountType",
  [tutorNameSchema, studentNameSchema, parentNameSchema]
);

export type OnboardingNameSchema = z.infer<typeof onboardingNameSchema>;

//
// Create the schemas for the name page
//
const addressBaseSchema = {
    accountType: z.enum([
        AccountTypeValues.Tutor,
        AccountTypeValues.Student,
        AccountTypeValues.Parent,
    ]),
    town: z
      .string()
      .min(1, { message: "Enter your town / city" })
      .max(80, { message: "Must be 80 or less characters" }),
    postcode: z
      .string()
      .min(3, { message: "Enter a valid postcode" })
      .max(11, { message: "Must be 11 characters or less" }),
};

const tutorAddressSchema = z.object({
    ...addressBaseSchema,
    accountType: z.literal(AccountTypeValues.Tutor),
    address1: z
      .string()
      .min(1, { message: "Enter your address" })
      .max(80, { message: "Must be 80 or less characters" }),
    address2: z.string().max(80, { message: "Must be 80 or less characters" }),
    county: z
      .string()
      .min(1, { message: "Enter your county" })
      .max(80, { message: "Must be 80 or less characters" }),
    country: z
        .string()
        .refine(
            (val) => Object.values(CountryTypeValues).includes(val as CountryTypeValues) && val !== "0",
            { message: "Please select your country" }
        ),
});

const studentAddressSchema = z.object({
  ...addressBaseSchema,
  accountType: z.literal(AccountTypeValues.Student),
});

const parentAddressSchema = z.object({
  ...addressBaseSchema,
  accountType: z.literal(AccountTypeValues.Parent),
});

export const onboardingAddressSchema = z.discriminatedUnion(
  "accountType",
  [tutorAddressSchema, studentAddressSchema, parentAddressSchema]
);

export type OnboardingAddressSchema = z.infer<typeof onboardingAddressSchema>;

export const onboardingChecksSchema = z.object({
    // emailVerify: z.boolean().refine((val) => val === true, {
    //     message: "You need to have access to the email address you are registering with.",
    // }),
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
});

export type OnboardingChecksSchema = z.infer<typeof onboardingChecksSchema>;

export const onboardingCompleteSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    confirm: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"], // 👈 attach error to confirm field
});

export type OnboardingCompleteSchema = z.infer<typeof onboardingCompleteSchema>;







// const onboardingBaseSchema = {
//     accountType: z
//         .string()
//         .min(1, "Please select an account type") // required field
//         .refine(
//             (val) => Object.values(AccountTypeValues).includes(val as AccountTypeValues)  && val !== "0",
//             { message: "Invalid account type" }
//         ),
//     preferredName: z
//     .string()
//     .min(2, "Must be at least 2 characters long")
//     .max(50),
//     town: z
//       .string()
//       .min(1, { message: "Enter your town / city" })
//       .max(80, { message: "Must be 80 or less characters" }),
//     postcode: z
//       .string()
//       .min(3, { message: "Enter a valid postcode" })
//       .max(11, { message: "Must be 11 characters or less" }),
// };

// const onboardingTutorSchema = z.object({
//     ...onboardingBaseSchema,
//     accountType: z.literal(AccountTypeValues.Tutor),
//     title: z
//         .string()
//         .min(1, "Please select your title")
//         .refine(
//             (val) => Object.values(TitleTypeValues).includes(val as TitleTypeValues) && val !== TitleTypeValues.NotSelected,
//             { message: "Please select your title" }
//         ),
//     firstname: z.string().min(1).max(50),
//     lastname: z.string().min(1).max(50),
//     gender: z
//         .string()
//         .min(1, "Please select your gender")
//         .refine(
//             (val) => Object.values(GenderTypeValues).includes(val as GenderTypeValues) && val !== GenderTypeValues.NotSelected,
//             { message: "Please select your gender" }
//         ),
//     address1: z
//       .string()
//       .min(1, { message: "Enter your address" })
//       .max(80, { message: "Must be 80 or less characters" }),
//     address2: z.string().max(80, { message: "Must be 80 or less characters" }),
//     county: z
//       .string()
//       .min(1, { message: "Enter your county" })
//       .max(80, { message: "Must be 80 or less characters" }),
//     country: z
//         .string()
//         .refine(
//             (val) => Object.values(CountryTypeValues).includes(val as CountryTypeValues) && val !== "0",
//             { message: "Please select your country" }
//         ),
// });

// const onboardingStudentSchema = z.object({
//     ...onboardingBaseSchema,
//     accountType: z.literal(AccountTypeValues.Student),
// });

// const onboardingParentSchema = z.object({
//     ...onboardingBaseSchema,
//     accountType: z.literal(AccountTypeValues.Student),
// });

// export const onboardingSchema1 = z.discriminatedUnion("accountType", [
//     onboardingTutorSchema,
//     onboardingStudentSchema,
//     onboardingParentSchema
// ]);


export const onboardingSchema = z.object({

    accountType: z
        .string()
        .min(1, "Please select an account type") // required field
        .refine(
            (val) => Object.values(AccountTypeValues).includes(val as AccountTypeValues)  && val !== "0",
            { message: "Invalid account type" }
        ),

    title: z
        .string()
        .min(1, "Please select your title")
        .refine(
            (val) => Object.values(TitleTypeValues).includes(val as TitleTypeValues) && val !== "0",
            { message: "Please select your title" }
        ),
    firstname: z
      .string()
      .min(1, { message: "Enter your first name" })
      .max(50, "Must be 50 characters or less"),
    lastname: z
      .string()
      .min(1, { message: "Enter your last name" })
      .max(50, "Must be 50 characters or less"),
    gender: z
        .string()
        .min(1, "Please select your gender")
        .refine(
            (val) => Object.values(GenderTypeValues).includes(val as GenderTypeValues) && val !== "0",
            { message: "Please select your gender" }
        ),
    preferredName: z
      .string()
      .min(2, { message: "Must be at least 2 characters long" })
      .max(50, { message: "Must be 50 characters or less" }),

    // Student / Parent - Preferred Name / Town / Postcode
    // phone: z
    //   .string()
    //   .max(20, { message: "Must be 20 or less characters" })
    //   .refine((val) => val.length === 0 || val.length >= 6, {
    //     message: "Must be 5 - 20 characters",
    //   }),
    // mobile: z
    //   .string()
    //   .max(20, { message: "Must be 20 or less characters" })
    //   .refine((val) => val.length === 0 || val.length >= 6, {
    //     message: "Must be 5 - 20 characters",
    //   }),
    address1: z
      .string()
      .min(1, { message: "Enter your address" })
      .max(80, { message: "Must be 80 or less characters" }),
    address2: z.string().max(80, { message: "Must be 80 or less characters" }),
    town: z
      .string()
      .min(1, { message: "Enter your town / city" })
      .max(80, { message: "Must be 80 or less characters" }),
    county: z
      .string()
      .min(1, { message: "Enter your county" })
      .max(80, { message: "Must be 80 or less characters" }),
    postcode: z
      .string()
      .min(3, { message: "Enter a valid postcode" })
      .max(11, { message: "Must be 11 characters or less" }),
    country: z
        .string()
        .refine(
            (val) => Object.values(CountryTypeValues).includes(val as CountryTypeValues) && val !== "0",
            { message: "Please select your country" }
        ),



    emailVerify: z.boolean().refine((val) => val === true, {
        message: "You need to have access to the email address you are registering with.",
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
    // if (val.accountType === AccountTypeValues.Tutor && !val.rightToWork) {
    //   ctx.addIssue({
    //     message: "You need to have the right to work in the UK.",
    //     code: z.ZodIssueCode.custom,
    //     path: ["rightToWork"],
    //   });
    // }
  
//   })
  
export type OnboardingSchema = z.infer<typeof onboardingSchema>;