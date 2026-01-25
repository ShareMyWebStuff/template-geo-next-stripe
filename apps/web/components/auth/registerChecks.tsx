"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RegisterChecksSchema, registerChecksSchema } from "@/schemas/auth/register-checks";
import { Separator } from "../ui/separator";
import Link from "next/link";

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

export const RegisterChecks = () => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm<RegisterChecksSchema>({
        resolver: zodResolver(registerChecksSchema),
        mode: 'onTouched',
        criteriaMode: "all",
        defaultValues: {
          emailVerify: false,
          readSafeguarding: false,
          over18: false,
          rightToWork: false,
          onlyAccount: false,
          agreeTerms: false,
        },
    });

    async function onSubmit(values: RegisterChecksSchema) {

        console.log ('Here I am ')
        setIsLoading(true);

        router.push("/dashboard");
        toast.error("123456 - There is missing code here");
    // const { success, message } = await signUp(
    //   values.email,
    //   values.password,
    //   values.username
    // );

    // if (success) {
    //   toast.success(
    //     `${message as string} Please check your email for verification.`
    //   );
    //   router.push("/dashboard");
    // } else {
    //   toast.error(message as string);
    // }

        setIsLoading(false);
    }

    const headerLabel = "Account Checks";
    const subHeader = "Here at TutorSeekers we take safeguarding very seriously. In order for safeguarding to work properly it is imperative everyone understands our procedures......";

    return (
    <Card className="border-blue">
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

                <Button variant="blueOutline" asChild className="" disabled={isLoading} type="submit">
                    <Link href="/">Back</Link>
                </Button>


                  <Button variant="blueOutline" className="" disabled={isLoading} type="submit">
                    Sign In
                      {/* {isLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                      ) : ( */}
                      {/* "Sign In" */}
                      {/* )} */}
                  </Button>


              </div>


            </form>
          </Form>
        </CardContent>
      </Card>

    )
}
