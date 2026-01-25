import { OnboardingCompleteForm } from "@/components/auth/onboarding-complete";
import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";

export default async function page() {

  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div className="py-12 m-auto max-w-7xl w-11/12 min-h-195">
        <OnboardingCompleteForm />
    </div>
  )
}
