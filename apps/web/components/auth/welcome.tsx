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


export function OnboardingWelcomeForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex justify-center">

    <Card className="border-none bg-white text-blue max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome to TutorSeekers</CardTitle>
        <CardDescription className="my-2 text-blue">Thank you for registering with us.</CardDescription>
        <Separator className="mt-4" />
        
      </CardHeader>
      <CardContent>

        <p className="py-4">
          Your account has been created. We have sent you an email to the
          email address you entered.
        </p>

        <p className="py-4">
          There is a validation button you can click or a link that you can
          visit to validate your account. Then you are free to logon.
        </p>

        <p className="py-4">
          We value the security of our clients and feel it is important that
          you know we verify ever persons email address.{" "}
        </p>

        <Button className="mt-4" variant="blueWhiteOutline" asChild>
          <Link href="/auth/sign-in">Login Screen</Link>
        </Button>

      </CardContent>
    </Card>
    </div>
  )

}
