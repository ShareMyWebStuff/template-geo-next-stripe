import { PasswordResetForm } from "@/components/auth/password-reset";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {

  const { token } = await searchParams;

  // const session = await getServerSession();
  // const user = session?.user;

  // if (user) redirect('/dashboard');

  return (
    <div className="max-w-xl w-full text-center">
      <PasswordResetForm token={token}/>
    </div>
  )
}
