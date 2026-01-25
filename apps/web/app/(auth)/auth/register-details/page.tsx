import Image from "next/image";
import sideImg from "@/app/assets/landing/banner-bg.png"
import { SigninForm } from "@/components/auth/signin";
import { RegisterChecks } from "@/components/auth/registerChecks";
// import { getServerSession } from "@/lib/get-server-session";
// import { redirect } from "next/navigation";

export default async function page() {

  // const session = await getServerSession();
  // const user = session?.user;

  // if (user) redirect('/dashboard');

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <RegisterChecks />
    </div>
  )
}
