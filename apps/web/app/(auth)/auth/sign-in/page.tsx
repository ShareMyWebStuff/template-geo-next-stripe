import Image from "next/image";
import sideImg from "@/app/assets/landing/banner-bg.png"
import { SigninForm } from "@/components/auth/signin";
import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";

export default async function page() {

  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <div className="flex justify-center h-195">

      {/* Image for md and up */}
      <div className="hidden md:block md:w-1/2 overflow-hidden rounded-r-none bg-clip-border rounded-xl h-full ">
        <Image
          src={sideImg}
          alt="Sign in image"
          className="object-cover h-full w-full"
          width={1927}
          height={1061}
          priority={true}
        />
      </div>

      {/* Text */}
      <div className="w-full sm:w-3/4 md:w-1/2 h-full rounded-xl md:rounded-l-none text-blue bg-white flex justify-center mx-4 sm:m-0">
        <SigninForm />
      </div>
      </div>
    </div>
  )
}
