import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import OnboardingAddressForm from "@/components/auth/onboarding-address";

export default async function page() {

  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div className="max-w-xl w-full text-center">
      <OnboardingAddressForm />
    </div>
  )
}
