"use client";

import { z } from "zod";
import { OnboardingNameSchema, onboardingNameSchema } from "@/schemas/auth/onboarding";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { useOnboardingStore } from "@/app/(auth)/onboarding/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NewInput } from "../ui/new-input";
import { TitleTypes, TitleTypeValues } from "@/constants/title";
import { GenderTypes, GenderTypeValues } from "@/constants/gender";
import { AccountTypeValues } from "@/constants/account-type";

// const onboardingNameSchema = onboardingSchema.pick({
//     title: true,
//     firstname: true,
//     lastname: true,
//     gender: true,
//     preferredName: true
// });

// type OnboardingNameSchema = z.infer<typeof onboardingNameSchema>;

export default function OnboardingNameForm() {
  const router = useRouter();

  const state = useOnboardingStore((state) => state);
  const setData = useOnboardingStore((state) => state.setData);

  const headerLabel = "Account Name";
  const subHeader = "Please enter you name .";

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!state.accountType ) {
      router.push("/onboarding/account-type");
    }
  }, [
    // useOnboardingStore.persist.hasHydrated,
    state.accountType,
    router,
  ]);

  const accountType = state.accountType

  let defaultValues: OnboardingNameSchema;
  switch (accountType) {
    case AccountTypeValues.Tutor:
      defaultValues = {
        accountType: AccountTypeValues.Tutor,
        title: state.title ?? TitleTypeValues.NotSelected,
        firstname: state.firstname ?? "",
        lastname: state.lastname ?? "",
        gender: state.gender ?? GenderTypeValues.NotSelected,
        preferredName: state.preferredName ?? "",
      };
      break;

    case AccountTypeValues.Student:
    case AccountTypeValues.Parent:
      defaultValues = {
        accountType,
        preferredName: state.preferredName ?? "",
      };
      break;

    default:
      throw new Error("Invalid account type");
  }

  const form = useForm<OnboardingNameSchema>({
    resolver: zodResolver(onboardingNameSchema),
    defaultValues
  });

  // console.log(form.formState.errors);

  const onBack = () => {
    const values = form.getValues();
    setData({...state, ...values});

    router.push("/onboarding/account-type");
  }


  const onSubmit = (data: OnboardingNameSchema) => {
    console.log({
      ...data,
    });
    setData({...state, ...data});
    router.push("/onboarding/address");
  };

  return (

    <Card className="border-blue w-full">
      <CardHeader className="text-center ">
        <CardTitle className="text-xl text-blue">{headerLabel}</CardTitle>
        <CardDescription className="my-2 text-blue">{subHeader}</CardDescription>
        <Separator className="my-2" />
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form  className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>

            { accountType === AccountTypeValues.Tutor &&
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-blue min-w-44">
                          <SelectValue placeholder="Select a title" />
                        </SelectTrigger>

                        <SelectContent>
                          {TitleTypes.map((title) => (
                            <SelectItem key={title.key} value={title.key}>
                              {title.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            }

            { accountType === AccountTypeValues.Tutor &&
            <div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="border-blue  min-w-44">
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>

                        <SelectContent>
                          {GenderTypes.map((title) => (
                            <SelectItem key={title.key} value={title.key}>
                              {title.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            }

            <div>
              <FormField
                  control={form.control}
                  name="preferredName"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Preferred Name</FormLabel>
                      <FormControl>
                          <NewInput variant="offWhite" type="text" placeholder="Your prefered name" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
            </div>

            { accountType === AccountTypeValues.Tutor &&
            <div></div>
            }

            { accountType === AccountTypeValues.Tutor &&
            <div>
              <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                          <NewInput variant="offWhite" type="text" placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
            </div>
            }

            { accountType === AccountTypeValues.Tutor &&
            <div>
              <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                          <NewInput variant="offWhite" type="text" placeholder="Your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
            </div>
            }

            <div className="mt-6 flex justify-between md:col-span-2">

              <Button type="button" variant="blueWhiteFull" onClick={onBack} className="">
                  Back
              </Button>

              <Button variant="blueWhiteFull" className="" type="submit">
                  Continue
              </Button>

          </div>

        </form>
      </Form>
    </CardContent>
  </Card>
  );
}