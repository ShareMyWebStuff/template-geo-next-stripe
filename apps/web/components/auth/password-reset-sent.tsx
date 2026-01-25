"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";


export function PasswordResetSent({
  className,
  ...props
}: React.ComponentProps<"div">) {
    
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex justify-center">

    <Card className="border-none bg-white text-blue max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Password Reset Email Sent</CardTitle>
        {/* <CardDescription className="my-2 text-blue">{subHeader}</CardDescription> */}
        <Separator className="my-4" />
        
      </CardHeader>
      <CardContent>

        <p className="mb-6 md:my-4">We have sent you a password reset email.</p>
        <p className="mb-6 md:my-4">Please click the link in the email we have sent you. This will take you to a screen where you can change your password.</p>

      </CardContent>
    </Card>
    </div>
  )

}
