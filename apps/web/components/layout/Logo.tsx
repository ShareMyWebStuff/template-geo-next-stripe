'use client';
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/general/logo.png"
import type { Session } from "better-auth";

type Props = {
  session: Session | null;
};

export default function Logo (  { session }: Props ) {

    return (
        <span className="hover:cursor-pointer">
            <Link 
            href={ session ? "/dashboard" : "/"} >
            <Image
                className="sm:w-[300px] w-[200px]"
                src={logo}
                alt="Tutor seekers logo"
                width={360}
                height={67}
                quality={75}
            />
            </Link>
        </span>
    )
}