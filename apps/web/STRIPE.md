# Stripe

## Dashboard
Goto the stripe dsahboard
https://dashboard.stripe.com/login

Login using email and password

## Create Sandbox

Create a sandbox account in ordewr to develop against

Name: TutorSeekers-Local
Copy your account

Get the API Keys 
- Publishable key
- Secret Key

.env.local

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000

Install stripe packages

npm install stripe @stripe/stripe-js

## This is from here 
https://hackernoon.com/integrating-stripe-checkout-with-nextjs-is-easier-than-you-think



4242 4242 4242 4242

## Subscriptions

Need to create products on stripe

Introduction - £20
Yearly Service - £12


## Testing Locally

https://docs.stripe.com/stripe-cli/install?install-method=windows



Run the following
stripe listen --forward-to http://localhost:3000/api/webhook


npx stripe listen --forward-to http://localhost:3000/api/webhook




