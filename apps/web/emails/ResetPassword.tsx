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

interface ResetPasswordProps {
  name: string,
  resetUrl: string;
}

export const ResetPassword = ({
  name,
  resetUrl,
}: ResetPasswordProps) => {

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
        padding: "16px",
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
        color: blue,
        margin: "32px 24px 16px",
    };

    const paragraph = {
        fontSize: "16px",
        lineHeight: "26px",
        color: blue,
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

    const securitySection = {
        backgroundColor: offWhite,
        padding: "12px",
        borderRadius: "12px",
        color: blue,
        margin: "32px 0",
    };

  return (
    <Html>
      <Head />
      <Preview>Reset your password - Action required</Preview>

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
            <Text style={heading}>
              We received a request to reset your password
            </Text>
          </Section>

          <Container style={{padding: "24px"}}>

            {/* Main Content */}
            <Section>
              <Text style={paragraph}>
                Hello {name},
              </Text>
              <Text style={paragraph}>
                We received a request to reset the password for your account associated with this email.
              </Text>
              <Text style={paragraph}>
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                style={button}
              >
                Reset My Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text style={paragraph}>
                If the button above doesn&apos;t work, copy and paste this link into your browser:
              </Text>
              <Text style={paragraph}>
                {resetUrl}
              </Text>
            </Section>

            {/* Security Notice */}
            <Section style={securitySection}>
              <Text >
                <strong>Security Notice:</strong>
              </Text>
              <Text>
                If you didn&apos;t request this password reset, please ignore this email. Your password will remain unchanged. For security, this reset link will expire in 24 hours.
              </Text>
            </Section>
          </Container>

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

export default ResetPassword;
