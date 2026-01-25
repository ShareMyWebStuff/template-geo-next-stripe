import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import OnboardingAccountTypeForm from "@/components/auth/onboarding-account-type";
import { getSomething } from "@/actions/event.actions";

export default async function page() {

  const session = await getServerSession();
  const user = session?.user;

  const poo = await getSomething()
  console.log (poo)

  if (user) redirect('/dashboard');

  return (
    <div className="max-w-xl w-full text-center">
      <OnboardingAccountTypeForm/>
    </div>
  )
}
