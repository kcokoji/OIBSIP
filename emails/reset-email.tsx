import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetEmailProps {
  token?: string;
}

export default function ResetPasswordEmail({ token }: ResetEmailProps) {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const resetLink = `${domain}/new-password?token=${token}`;
  return (
    <Html>
      <Head />
      <Preview>Reset Password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Reset Password</Heading>
              <Text style={mainText}>Click the link to reset password</Text>
              <Section style={verificationSection}>
                <Button href={resetLink} style={button}>
                  Reset your password
                </Button>
                <Text style={validityText}></Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you didn&apos;t make this request,Ignore this email.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "30px",
  margin: "0 auto",
  backgroundColor: "#f2eddc",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "16px",
  margin: "24px 0",
};

const coverSection = {
  backgroundColor: "#fff",
  border: "1px solid black",
  borderRadius: "10px",
};

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };

const button = {
  borderRadius: "6px",
  fontWeight: "400",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 26px",
  backgroundColor: "#ea701f",
  margin: "4px 4px",
};
