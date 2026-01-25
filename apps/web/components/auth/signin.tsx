"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { Separator } from "@/components/ui/separator"
import { NewInput, NewPassword } from "@/components/ui/new-input";
import Link from "next/link";
import { auth } from "@/lib/auth";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onTouched',
        criteriaMode: "all",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const headerLabel = "Welcome to TutorSeekers";
    const subHeader = "Find help with all your tutition needs - TODAY";
    const signInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);

      await authClient.signIn.email({
          email: values.email,
          password: values.password
      }, {
          onError: async (ctx) => {
              // // Handle the error
              // if(ctx.error.status === 403) {
              //     alert("Please verify your email address")
              // }
              // //you can also show the original error message
              // alert(ctx.error.message)
              await authClient.sendVerificationEmail({
                  email: values.email,
                  callbackURL: 'http://localhost:3000/auth/email-verified'
              })

              router.push("/auth/welcome");
          }
      })

      // NEED TO GOTO DASHBOARD

      setIsLoading(false);
    }

    return (

    // <div className= "w-full max-w-md md:max-w-xl rounded-xl md:rounded-l-none flex flex-row mx-auto">
      <Card className="border-none blue-off-white-layout max-w-md md:max-w-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{headerLabel}</CardTitle>
          <CardDescription className="my-2 text-blue">{subHeader}</CardDescription>
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
                  Signin with Google
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
                    <div className="mb-2" >
                      <Link href={{ pathname: "/auth/reset-password-request" }}>
                        <p className="text-sm inline-block">Forgot your <span className="text-gold cursor-pointer">password?</span></p>
                      </Link>
                    </div>

                  </div>


                  <Button variant="blueWhiteFull" className="w-full border" disabled={isLoading} type="submit">
                      {isLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                      ) : (
                      "Sign In"
                      )}
                  </Button>

                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col">
          <p className="text-sm my-6">
            By continuing, you agree to TutorSeekers{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/company/legal?legal=terms");
              }}
            >
              Terms of Service
            </span>
            ,{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/company/legal?legal=privacy");
              }}
            >
              Privacy policy
            </span>{" "}
            and{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/company/legal?legal=cookies");
              }}
            >
              Cookie Use
            </span>
            .
          </p>

          <Separator />
          <p
            onClick={() => {
              console.log (`LoginForm : register please look into this `)
            }}
            className="text-center text-sm mt-4"
          >
            Not on TutorSeekers?{" "}
            <span
              className="text-gold cursor-pointer"
              onClick={() => {
                router.push("/auth/register");
              }}
            >
              Register
            </span>
          </p>
        </CardFooter>
      </Card>

  );
}
