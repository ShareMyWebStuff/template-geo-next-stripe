import {
  Html,
  Head,
  Heading,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
  Button,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userName?: string;
  url: string;
}

export const WelcomeEmail = ({
  userName = "John",
  url = 'http://localhost:3000;'

}: WelcomeEmailProps) => {

    const blue='#1c4966'
    const offWhite='#e7e9ec'
    const white='#ffffff'

    const main = {
        backgroundColor: offWhite,
        fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    };

    const container = {
        backgroundColor: white,
        margin: "0 auto",
        padding: "0",
        width: "100%",
        maxWidth: "600px",
        borderRadius: "12px",
        overflow: "hidden", // 🔑 clips the header

    };

    const headerWrapper = {
        margin: "0 auto",
        padding: "0",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        overflow: "hidden", // 🔑 clips the header
    }

    const header = {
        margin: "0",
        padding: "24px",
        textAlign: "center" as const,
        backgroundColor: blue
    };

    const footer = {
        padding: "0 24px",
        textAlign: "center" as const,
        backgroundColor: blue,
    };

    const footerText = {
        fontSize: "12px",
        color: offWhite,
        lineHeight: "18px",
    };

    const logo = {
        margin: "24px auto",
    };

    const content = {
        padding: "12px 24px",
    };

    const heading = {
        fontSize: "24px",
        fontWeight: "600",
        color: "#1f2937",
        margin: "16px 0",
    };

    const paragraph = {
        fontSize: "16px",
        lineHeight: "26px",
        color: "#4b5563",
    };

    const button = {
        backgroundColor: blue,
        borderRadius: "6px",
        color: offWhite,
        fontSize: "16px",
        textDecoration: "none",
        textAlign: "center" as const,
        display: "inline-block",
        padding: "12px 20px",
        margin: "20px 0",
    };

    const signature = {
        fontSize: "16px",
        color: blue,
        marginTop: "24px",
    };

    const hr = {
        borderColor: "#e5e7eb",
        margin: "32px 0",
    };

  return (
    <Html>
      <Head />
      <Preview>Welcome to TutorSeekers — let’s get started</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header / Logo */}
          <Section style={headerWrapper}>
            <Section style={header}>
                <Img
                src="http://localhost:3000/images/logo.png"
                width="300"
                height="60"
                alt="Acme"
                style={logo}
                />

            </Section>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Text style={heading}>Welcome, {userName} 👋</Text>

            <Text style={paragraph}>
              Thanks for joining <strong>TutorSeekers</strong>. We’re excited to have you
              on board. You can now start using all of our features to build,
              launch, and grow faster.
            </Text>

            <Button
              href={url}
              style={button}
            >
              Verify Email
            </Button>
            
            {/* Alternative Link */}
            <Section>
              <Text style={paragraph}>
                If the button above doesn&apos;t work, copy and paste this link into your browser:
              </Text>
              <Text style={paragraph}>
                {url}
              </Text>
            </Section>

            <Text style={paragraph}>
              Your account has been created and waiting for your email to be verified. Please click the button or visit find attached a verification code which will expire in 24 hours. 
            </Text>

            <Text style={paragraph}>
              If you have any questions, just message us we are always
              happy to help.
            </Text>

            <Text style={signature}>— The TutorSeekers Team</Text>
          </Section>

          {/* <Hr style={hr} /> */}

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} TutorSeekers. All rights reserved.
            </Text>
            <Text style={footerText}>
              The Farmhouse, Woking, Surrey. GU21 4DS
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
