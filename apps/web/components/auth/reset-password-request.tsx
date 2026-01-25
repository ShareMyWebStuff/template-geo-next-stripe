"use client";

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
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { NewInput } from "../ui/new-input";
import { passwordResetRequest, PasswordResetRequest } from "@/schemas/auth/resetPasswordRequest.ts";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";


export default function ResetPasswordRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const headerLabel = "Reset Password";

  const form = useForm<PasswordResetRequest>({
    resolver: zodResolver(passwordResetRequest),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: PasswordResetRequest) => {

    form.reset()

    await authClient.requestPasswordReset ({
      email: data.email,
      redirectTo: 'http://localhost:3000/auth/password-reset'
    })

    router.push("/auth/password-reset-sent");
  };

  return (

    <Card className="border-blue w-full mb-80">
      <CardHeader className="text-center py-2">
        <CardTitle className="text-xl text-blue">{headerLabel}</CardTitle>
        {/* <CardDescription className="my-2 text-blue">{subHeader}</CardDescription> */}
        <Separator className="my-4" />
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form className="flex flex-col gap-y-3" onSubmit={form.handleSubmit(onSubmit)}>

            <div>
            <p className="text-sm">Please enter your email address and we will email you a link to reset your password.</p>
            </div>

            <div className="mt-6">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                          <NewInput variant="offWhite" placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
            </div>

            <div className="mt-6 flex justify-end md:col-span-2">

            <Button disabled={isLoading} aria-disabled={isLoading} variant="blueWhiteFull" className="" type="submit">
                Send Reset
            </Button>

          </div>

        </form>

      </Form>
    </CardContent>
  </Card>
  );
}