'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function signUpAction ( email: string, password: string, name: string ) {
  await auth.api.signUpEmail ({
    body: {
      email,
      password,
      name
    }
  })

  redirect ("/dashboard")
}

export async function signInAction ( email: string, password: string ) {
  await auth.api.signInEmail ({
    body: {
      email,
      password
    }
  })

  redirect ("/dashboard")
}

export async function signOutAction (  ) {
  await auth.api.signOut ({
    headers: await headers()
  })

  redirect ("/")
}


// export async function signOutAction (  ) {
//   await auth.api.e ({
//     headers: await headers()
//   })

//   redirect ("/")
// }
