import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import ResetPasswordRequestForm from "@/components/auth/reset-password-request";

export default async function page() {

  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect('/dashboard');

  return (
    <div className="py-12 max-w-xl mx-auto">
      <ResetPasswordRequestForm />
    </div>
  )
}
