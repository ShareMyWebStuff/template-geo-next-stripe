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


export function EmailVerifiedForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    
  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onBack = () => {
    router.push("/auth/signin");
  }

  return (
    <div className="flex justify-center">

    <Card className="border-none bg-white text-blue max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Email Verification</CardTitle>
        {/* <CardDescription className="my-2 text-blue">{subHeader}</CardDescription> */}
        <Separator className="my-4" />
        
      </CardHeader>
      <CardContent>

        <p className="pb-8">Your email has been verified successfully. Please click the button to visit the login screen.</p>

        <Button variant="blueWhiteOutline" asChild>
          <Link href="/auth/sign-in">Login Screen</Link>
        </Button>

      </CardContent>
    </Card>
    </div>
  )

}
