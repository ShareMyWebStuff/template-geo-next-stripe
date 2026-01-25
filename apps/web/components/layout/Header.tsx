import HeaderBtns from "./HeadBtns";
import { HeaderNav } from "./HeaderNav";
import { auth } from '@/lib/auth'
import Logo from "./Logo";
import { headers } from "next/headers";
import { Session } from "better-auth";


export default async function Header() {

  // const session  = ( await auth.api.getSession({ headers: headers() }) ) as Session | null; 
  // const session = await auth.api.getSession({ headers: headers() });

   const nextHeaders = await headers();

  // Convert to plain object for Better Auth
  const headersObj: Record<string, string> = {};
  nextHeaders.forEach((value, key) => {
    headersObj[key] = value;
  });

  const session = ( await auth.api.getSession({ headers: headersObj }) ) as Session | null;

  return (
    <header className="bg-blue-normal pt-8 text-white-800">
      <div className="m-auto max-w-7xl w-11/12 ">
        <div className="flex items-center justify-between sm:border-b-1 border-white-500 border-solid pb-4 md:pb-4">

          <span className="hover:cursor-pointer">
            <Logo  session={session} />
          </span>

          <div className="flex items-center justify-between">
            <HeaderBtns session={session}  />
          </div>

        </div>
        <div className="sm:block hidden py-2">
            <HeaderNav source={"a"} manualExpand={false} />
        </div>

      </div>
    </header>
  )
}
