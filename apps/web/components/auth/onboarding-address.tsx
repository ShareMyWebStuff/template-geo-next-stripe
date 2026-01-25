"use client";

import { onboardingAddressSchema, OnboardingAddressSchema } from "@/schemas/auth/onboarding";
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
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { useOnboardingStore } from "@/app/(auth)/onboarding/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NewInput } from "../ui/new-input";
import { CountryTypes, CountryTypeValues } from "@/constants/country";
import { VirtualizedCombobox } from "@/components/virtualized-combobox";
import { AccountTypeValues } from "@/constants/account-type";


export default function OnboardingAddressForm() {
  const router = useRouter();

  const state = useOnboardingStore((state) => state);
  const setData = useOnboardingStore((state) => state.setData);
  // const countryList = CountryTypes.map ( item => item.label)

  const headerLabel = "Account Address";
  const subHeader = "Please enter your location so we can provide people closs to you.";

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    console.log ('Use Effect')
    // console.log (state)
    if (!state.accountType ) {
      router.push("/onboarding/account-type");
    } else if ( !state.preferredName) {
      console.log ('Oh No 1')
      router.push("/onboarding/name");
    }
  }, [
    // useOnboardingStore.persist.hasHydrated,
    state.accountType,
    state.preferredName,
    router,
  ]);

  const accountType = state.accountType

  let defaultValues: OnboardingAddressSchema;
  switch (accountType) {
    case AccountTypeValues.Tutor:
      defaultValues = {
        accountType: AccountTypeValues.Tutor,
        address1: state.address1 ?? "",
        address2: state.address2 ?? "",
        town: state.town ?? "",
        county: state.county ?? "",
        postcode: state.postcode ?? "",
        country: state.country ?? CountryTypeValues.NotSelected,
      };
      break;

    case AccountTypeValues.Student:
    case AccountTypeValues.Parent:
      defaultValues = {
        accountType,
        town: state.town ?? "",
        postcode: state.postcode ?? "",
      };
      break;

    default:
      throw new Error("Invalid account type");
  }

  const form = useForm<OnboardingAddressSchema>({
    resolver: zodResolver(onboardingAddressSchema),
    defaultValues
  });

  console.log(form.formState.errors);


  const onBack = () => {
    const values = form.getValues();
    setData({...state, ...values});

    router.push("/onboarding/name");
  }

  const onSubmit = (data: OnboardingAddressSchema) => {
    console.log (`On Submit`)
    console.log({
      ...data,
    });
    setData({...state, ...data});
    router.push("/onboarding/checks");
  };

  return (
    <Card className="border-blue w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-blue">{headerLabel}</CardTitle>
        <CardDescription className="my-2 text-blue">{subHeader}</CardDescription>
        <Separator className="my-2" />
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form  className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" onSubmit={form.handleSubmit(onSubmit)}>

            { accountType === AccountTypeValues.Tutor &&
            <FormField
                control={form.control}
                name="address1"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                        <NewInput variant="offWhite" type="text"  {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            }

            { accountType === AccountTypeValues.Tutor &&
            <FormField
                control={form.control}
                name="address2"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                        <NewInput variant="offWhite" type="text"  {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            }

            <FormField
                control={form.control}
                name="town"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Town</FormLabel>
                    <FormControl>
                        <NewInput variant="offWhite" type="text" placeholder="Your town / city"  {...field} /> 
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            { accountType === AccountTypeValues.Tutor &&
            <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>County</FormLabel>
                    <FormControl>
                        <NewInput variant="offWhite" type="text" placeholder="Your county" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            }

            <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                        <NewInput variant="offWhite" type="text" placeholder="Your postcode" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            { accountType === AccountTypeValues.Tutor &&
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl className="w-full">
                    <VirtualizedCombobox
                      options={CountryTypes}
                      searchPlaceholder="Select your country ..."
                      width="100%"
                      height="200px"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            }

            <div className="flex justify-between md:col-span-2">

              <Button type="button" variant="blueWhiteFull" onClick={onBack} className="">
                Back
              </Button>

              <Button variant="blueWhiteFull" type="submit">
                Continue
              </Button>

            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}