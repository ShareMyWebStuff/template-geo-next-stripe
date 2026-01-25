'use client';
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { isAuth } from '@/lib/features/auth/authSlice';



export default function Logo () {
    const signedIn = useAppSelector( isAuth )

    return (
        <span className="hover:cursor-pointer">
            <Link 
            href={ signedIn ? "/activity-center" : "/"} >
            <Image
                // className="w-[300px]"
                className="sm:w-[300px] w-[200px]"
                src="/images/general/logo.png"
                alt="Tutor seekers logo"
                width={360}
                height={67}
                quality={75}
            />
            </Link>
        </span>
    )
}