import { OrderStatus } from "@prisma/client";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  orderId?: string;
  status: OrderStatus;
}

export default function updateOrderNotificationEmail({
  orderId,
  status,
}: EmailProps) {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const resetLink = `${domain}/orders`;
  return (
    <Html>
      <Head />
      <Preview>Order update</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Your order is ready</Heading>
              <Text style={mainText}>
                Thank you for placing your order with us, your order is ready
                for pick up.
              </Text>
              <Text style={text}>Your order ID is:</Text>
              <Text style={orderIdStyle}>{orderId}</Text>
              <Text style={text}>Order status :</Text>
              <Text style={orderIdStyle}>{status}</Text>
              <Section style={verificationSection}>
                <Button href={resetLink} style={button}>
                  View order
                </Button>
                <Text style={validityText}></Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you have any questions regarding your order, feel free to
                contact us.
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

const orderIdStyle = {
  ...text,
  fontSize: "20px", // Increase font size for orderId
  fontWeight: "bold", // Bold font for orderId
};

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
