"use client";

import { OnboardingChecksSchema, onboardingChecksSchema } from "@/schemas/auth/onboarding";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "../ui/separator";
import { useOnboardingStore } from "@/app/(auth)/onboarding/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface FormCheckboxProps {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function FormCheckbox({
  label,
  description,
  checked,
  onCheckedChange,
  className = "",
}: FormCheckboxProps) {
  return (
    <Label
      className={`hover:bg-accent/50 flex items-start gap-3 rounded-lg border px-3 py-6 text-blue
        has-aria-checked:border-blue 
        has-aria-checked:bg-white 
        dark:has-aria-checked:border-blue
        dark:has-aria-checked:bg-blue
        ${className}`}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="
          data-[state=checked]:border-blue
          data-[state=checked]:bg-blue 
          data-[state=checked]:text-white 
          dark:data-[state=checked]:border-blue
          dark:data-[state=checked]:bg-blue
        "
      />

      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">{label}</p>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
    </Label>
  )
}

export default function OnboardingChecksForm() {
  const router = useRouter();

  const state = useOnboardingStore((state) => state);
  const setData = useOnboardingStore((state) => state.setData);

  const headerLabel = "Account Checks";
  const subHeader = "Here at TutorSeekers we take safeguarding very seriously. In order for safeguarding to work properly it is imperative everyone understands our procedures......";

  const form = useForm<OnboardingChecksSchema>({
    resolver: zodResolver(onboardingChecksSchema),
    defaultValues: {
          readSafeguarding: state.readSafeguarding || false,
          over18: state.over18 || false,
          rightToWork: state.rightToWork || false,
          onlyAccount: state.onlyAccount || false,
          agreeTerms: state.agreeTerms || false,
        },
  });

  const onBack = () => {
    const values = form.getValues();
    setData({...state, ...values});
    router.push("/onboarding/address");
  }


  const onSubmit = (data: OnboardingChecksSchema) => {
    console.log({
      ...data,

    });
    setData({...state, ...data});
    router.push("/onboarding/complete");
  };

// USEEFFECT PARAMS ARE WRONG
// USEEFFECT PARAMS ARE WRONG
// USEEFFECT PARAMS ARE WRONG
// USEEFFECT PARAMS ARE WRONG
// USEEFFECT PARAMS ARE WRONG
// USEEFFECT PARAMS ARE WRONG

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!state.accountType ) {
      router.push("/onboarding/account-type");
    } else if ( !state.preferredName) {
      router.push("/onboarding/name");
    } else if (!state.postcode) {
      router.push("/onboarding/address");
    }

  }, [
    // useOnboardingStore.persist.hasHydrated,
    state.accountType,
    state.preferredName,
    state.postcode,
    router,
  ]);

  console.log('form.formState.errors');
console.log(form.formState.errors);


  return (

    <Card className="border-blue w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-blue">{headerLabel}</CardTitle>
        <CardDescription className="my-2 text-blue">{subHeader}</CardDescription>
        <Separator className="my-2" />
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form  className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

            <FormField
                control={form.control}
                name="readSafeguarding"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <FormCheckbox
                            label="I have read and understood the safeguarding policy."
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage className="text-blue border border-blue bg-off-white rounded p-2" />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="over18"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <FormCheckbox
                            label="I confirm I am 18 years old or over."
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage className="text-blue border border-blue bg-off-white rounded p-2" />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="rightToWork"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <FormCheckbox
                            label="I have the right to work in the UK."
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage className="text-blue border border-blue bg-off-white rounded p-2" />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="onlyAccount"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <FormCheckbox
                            label="I have no other accounts with TutorSeekers."
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage className="text-blue border border-blue bg-off-white rounded p-2" />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <FormCheckbox
                            label="I agree to TutorSeekers terms and conditions."
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage className="text-blue border border-blue bg-off-white rounded p-2" />
                </FormItem>
                )}
            />

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