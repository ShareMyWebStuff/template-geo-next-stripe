import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import OnboardingChecksForm from "@/components/auth/onboarding-checks";

export default async function page() {

  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div className="max-w-3xl w-full text-center">
      <OnboardingChecksForm />
    </div>
  )
}
