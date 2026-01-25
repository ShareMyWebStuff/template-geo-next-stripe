// 'use client'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Separator } from "@/components/ui/separator"
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js'
// import { convertToSubcurrency } from "@/lib/convert-to-subcurrency";
// import CheckoutPage from "./checkout-page";

// if ( process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined ) {
//     throw new Error ("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
// }

// const stripePromise = loadStripe ( process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

// export const Payment = () => {
//     const amount = 1.00;


//     return (
//     <div className="flex justify-center">

//     <Card className="border-none bg-white text-blue max-w-lg">
//       <CardHeader className="text-center">
//         <CardTitle className="text-xl">Email Verification</CardTitle>
//         {/* <CardDescription className="my-2 text-blue">{subHeader}</CardDescription> */}
//         <Separator className="my-4" />
        
//       </CardHeader>
//       <CardContent>

//         <p className="pb-8">TutorSeekers has requested £{amount}.</p>

//       <Elements
//         stripe={stripePromise}
//         options={{
//           mode: "payment",
//           amount: convertToSubcurrency(amount),
//           currency: "gbp",
//         }}
//       >
//         <h1>Checkout</h1>
//         <CheckoutPage amount={amount} />
//       </Elements>


//         {/* <Button variant="blueWhiteOutline" asChild>
//           <Link href="/">Login Screen</Link>
//         </Button> */}

//       </CardContent>
//     </Card>
//     </div>    )
// }
