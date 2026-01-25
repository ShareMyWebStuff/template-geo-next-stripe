import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import { EmailVerifiedForm } from "@/components/auth/email-verified";

export default async function page() {

  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div className="max-w-xl w-full text-center">
      <EmailVerifiedForm />
    </div>
  )
}
