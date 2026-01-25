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
import { passwordResetSchema, PasswordResetSchema } from "@/schemas/auth/passwordReset";
import { NewPassword } from "../ui/new-input";

interface PasswordResetFormProps {
  token: string;
}

export function PasswordResetForm({ token }: PasswordResetFormProps) {
    
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
      mode: 'onTouched',
      criteriaMode: "all",
      defaultValues: {
        password: "",
        confirm: ""
      },
  });

  async function onSubmit(values: PasswordResetSchema) {

    setIsLoading(true);

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Password reset successfully");
    router.push("/auth/sign-in");
    setIsLoading(false);
  }

  return (

    <Card className="border-none bg-white text-blue max-w-2lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset Account Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form  className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>

            <div className="max-w-[400px]">
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
            </div>

            <div className="max-w-[400px]">
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

            <div className="flex justify-center">

              <Button variant="blueWhiteFull"  disabled={isLoading} type="submit">
                  {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                  ) : (
                  "Reset Password"
                  )}
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  )

}
