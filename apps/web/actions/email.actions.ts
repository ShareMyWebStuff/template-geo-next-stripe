'use server';

// import React from "react";
// import ReactDOMServer from "react-dom/server";
import { ResetPassword } from '@/emails/ResetPassword';
import { VerifyEmail } from '@/emails/VerifyEmail';
import { WelcomeEmail } from '@/emails/Welcome';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string)   // ("re_NhBgp5pj_3qKE5Xm7e4EbWSWPXEEPWB3f");
const teamEmail = process.env.TEAM_EMAIL || 'dave@harmonydata.co.uk';

/**
 * Sends a welcome email
 * 
 * @returns 
 */
export const sendWelcomeEmail = async (email: string, userName: string, url: string ) => {

    try {
      console.log ('Sending Welcome Email')

      await resend.emails.send({
        from: teamEmail,
        to: email,
        subject: 'Welcome to TutorSeekers',
        react: WelcomeEmail({userName, url})
      });

      return true;
    
    } catch (error) {
        console.log ('SERVER ACTION ERROR')
        console.log (error)
        throw new Error ('Error saving members about profile.')
    }

}

/**
 * Sends an email for the user to verify the email they use
 * 
 * @param email 
 * @param url 
 * @returns 
 */
export const sendVerifyEmail = async ( email: string, url: string ) => {

    try {
      console.log ('Sending Verify Email')
      console.log (`email: ${email}`)
      console.log (`url: ${url}`)

      await resend.emails.send({
        from: teamEmail,
        to: email,
        subject: 'TutorSeekers - Verify Email',
        react: VerifyEmail({url})
      });

      return true;
    
    } catch (error) {
        console.log ('SERVER ACTION ERROR')
        console.log (error)
        throw new Error ('Error saving members about profile.')
    }

}

export const sendResetPassword = async ( email: string, name: string, url: string ) => {

    try {
      console.log ('Reset Password')
      console.log (`email: ${email}`)
      console.log (`url: ${url}`)

      await resend.emails.send({
        from: teamEmail,
        to: email,
        subject: 'Reset your TutorSeekers Password',
        react: ResetPassword({name, resetUrl: url})
      });

      return true;
    
    } catch (error) {
        console.log ('SERVER ACTION ERROR')
        console.log (error)
        throw new Error ('Error saving members about profile.')
    }

}



