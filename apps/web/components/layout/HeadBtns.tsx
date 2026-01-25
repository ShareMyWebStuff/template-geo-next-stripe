'use client';

import Link from 'next/link'
import { FaRegistered } from "react-icons/fa";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import type { Session } from "better-auth";
import { authClient } from "@/lib/auth-client";


import HeaderMobileNav from './HeaderMobileNav';
import { Button } from '../ui/button';

type Props = {
  session: Session | null;
};

export default function HeaderBtns( { session }: Props ) {

  const router = useRouter();

  if ( !session ) {
    return (
      <>
        <div className="text-lg sm:block hidden">
          <Button asChild variant="offWhiteOutline">
            <Link href="/auth/sign-in"><span className="flex items-center justify-center"><FaSignInAlt className="mr-1" />Sign In</span></Link>
          </Button>

          <Button className="ml-2" asChild  variant="offWhiteOutline">
            <Link href="/onboarding/account-type"><span className="flex items-center justify-center"><FaRegistered className="mr-1" />Register</span></Link>
          </Button>
        </div>

        <div  className="text-lg sm:hidden block">
          <Button asChild variant="offWhiteOutline">
            <Link href="/auth/sign-in"><FaSignInAlt /></Link>
          </Button>

          <Button className="ml-2" asChild  variant="offWhiteOutline">
            <Link href="/onboarding/account-type"><FaRegistered /></Link>
          </Button>
        </div>

        <HeaderMobileNav />

      </>
    )
  }

    return (
    <>
      <div className="text-lg sm:block hidden">
        <Button
          variant="offWhiteOutline"
          onClick={async () => {
              await authClient.signOut();
              router.refresh()
          }}
        >
          <span className="flex items-center justify-center"><FaSignOutAlt className="mr-1" />Sign Out</span>
        </Button>
      </div>

      <div className="ml-2 text-lg sm:hidden block">
        <Button 
          className="ml-2" 
          variant="offWhiteOutline"
          onClick={async () => {
              await authClient.signOut();
              router.refresh()
          }}>
            <FaSignOutAlt />
        </Button>
      </div>

      <HeaderMobileNav />
    </>
  )
}
