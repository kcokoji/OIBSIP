import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import ConfirmationEmail from "@/emails/confirmation-email";
import ResetPasswordEmail from "@/emails/reset-email";

const email = process.env.EMAIL;

const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: email,
    pass,
  },
});

export const sendPasswordResetEmail = async (
  userEmail: string,
  token: string
) => {
  const emailHtml = render(ResetPasswordEmail({ token }));

  await transporter.sendMail({
    from: email,
    to: userEmail,
    subject: "Reset your password",
    html: emailHtml,
  });
};

export const sendVerificationEmail = async (
  userEmail: string,
  token: string
) => {
  const emailHtml = render(ConfirmationEmail({ token }));

  await transporter.sendMail({
    from: `"Pizzeria" <${email}>`, // sender address
    to: userEmail, // list of receivers
    subject: "Confirm your email", // Subject line
    text: "Hello world?", // plain text body
    html: emailHtml,
  });
};
