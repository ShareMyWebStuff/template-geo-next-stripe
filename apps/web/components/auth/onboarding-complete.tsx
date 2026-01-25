"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { authClient } from "@/lib/auth-client";
import { NewInput, NewPassword } from "@/components/ui/new-input";
import { useOnboardingStore } from "@/app/(auth)/onboarding/store";
import { onboardingCompleteSchema, OnboardingCompleteSchema } from "@/schemas/auth/onboarding";
import Link from "next/link";


export function OnboardingCompleteForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const state = useOnboardingStore((state) => state);
  const setData = useOnboardingStore((state) => state.setData);

  const form = useForm<OnboardingCompleteSchema>({
    resolver: zodResolver(onboardingCompleteSchema),
      mode: 'onTouched',
      criteriaMode: "all",
      defaultValues: {
        email: "",
        password: "",
        confirm: ""
      },
  });

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

    const onBack = () => {
      const values = form.getValues();
      setData({...state, ...values});
      router.push("/onboarding/checks");
    }

    async function onSubmit(values: OnboardingCompleteSchema) {

    setIsLoading(true);

    const res = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: state.preferredName!,
      callbackURL: "/auth/email-verified",
    });

    if (res.error) {
      toast.error(res.error.message);
      setIsLoading(false);
      return;
    }

    // Resets the localstorage
    setData({});
    toast.success("Account created successfully");
    router.push("/auth/welcome");
    setIsLoading(false);
  }

  return (
  <div className="flex justify-center">

    <Card className="border-none bg-white text-blue max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Thank you for entering your account information</CardTitle>
        <CardDescription className="my-2 text-blue">Please choose how you want to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form  className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">

              <Button
                className="w-full"
                onClick={signInWithGoogle}
                type="button"
                variant="offWhiteFull"
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <title>Google</title>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                Signup with Google
              </Button>

              <div className="flex items-center justify-between mt-4 text-blue">
                  <span className="w-2/5 border-b border-blue"></span>
                  <span className="text-xs text-center uppercase">
                      or 
                  </span>
                  <span className="w-2/5 border-b border-blue"></span>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-3">

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

                  <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                              <NewPassword variant="offWhite" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="confirm"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Repeat Password</FormLabel>
                          <FormControl>
                              <NewPassword variant="offWhite" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                  />

                </div>

                <div className="flex justify-between">

                  <Button type="button" variant="blueWhiteOutline" onClick={onBack} className="">
                    Back
                  </Button>

                  <Button variant="blueWhiteFull" className="w-4/5" disabled={isLoading} type="submit">
                      {isLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                      ) : (
                      "Create Account"
                      )}
                  </Button>
                </div>

              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col">
        <p className="text-sm my-6">
          By continuing, you agree to TutorSeekers{" "}
          <Link
            href="/company/legal?legal=terms"
            target="_blank"
            className="text-gold underline"
          >
            Terms of Service
          </Link>
          ,{" "}
          <Link
            href="/company/legal?legal=privacy"
            target="_blank"
            className="text-gold underline"
          >
            Privacy policy
          </Link>
          and{" "}
          <Link
            href="/company/legal?legal=cookies"
            target="_blank"
            className="text-gold underline"
          >
            Cookie Use
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  </div>
  )

}
