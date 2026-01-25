// import { db } from "@/utils/db/db";
import { sendResetPassword, sendVerifyEmail } from "@/actions/email.actions";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { createPool } from 'mysql2/promise';


export const auth = betterAuth({
  database: createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 3306,
      connectionLimit: 10
  }),

  advanced: {
      cookies: {
          session_token: {
              name: "custom_session_token",
              attributes: {
                  // Set custom cookie attributes
              }
          },
      }
  },

  // request can be used to determine the ip address or where the request came from
  emailVerification: {
    sendOnSignUp: true, // Send email after signup
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendVerifyEmail(user.email, url );
    }
  },

  // 
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // Require verification to log in
    sendResetPassword: async ({ user, url, token }) => {
      await sendResetPassword(user.email, user.name, url);
    },
  },

  user: {
    changeEmail: {
      enabled: true,
      async sendChangeEmailVerification({ user, newEmail, url }) {
        console.log ('Change email - send email')
        // await sendEmail({
        //   to: user.email,
        //   subject: "Approve email change",
        //   text: `Your email has been changed to ${newEmail}. Click the link to approve the change: ${url}`,
        // });
      },
    },
  },

  socialProviders: {
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  additionalFields: {
    accountType: {
      type: "string",
      input: false,
    },
    agreedAccountChecks: {
      type: "boolean",
      input: false,
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
