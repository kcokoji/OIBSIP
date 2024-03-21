import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import ConfirmationEmail from "@/emails/confirmation-email";
import ResetPasswordEmail from "@/emails/reset-email";
import { db } from "./db";
import NotifcationsEmail from "@/emails/notifications.email";
import { LowStockItem } from "@/app/api/notifications/route";
import OrderNotificationEmail from "@/emails/order-email";
import updateOrderNotificationEmail from "@/emails/update-order-email";
import { OrderStatus } from "@prisma/client";

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
  try {
    const emailHtml = render(ResetPasswordEmail({ token }));

    await transporter.sendMail({
      from: `"Pizzeria" <${email}>`,
      to: userEmail,
      subject: "Reset your password",
      html: emailHtml,
    });
  } catch (error) {
    console.log("Error sending password reset email:", error);
  }
};

const getAdminUsers = async () => {
  try {
    const adminUsers = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
      select: {
        email: true,
      },
    });

    return adminUsers.map((user) => user.email);
  } catch (error) {
    console.error("Error retrieving admin users:", error);
    return null;
  }
};

export const notifcationEmail = async (lowStockItems: LowStockItem[]) => {
  try {
    const emailHtml = render(NotifcationsEmail({ lowStockItems }));
    const admins = await getAdminUsers();
    await transporter.sendMail({
      from: `"Pizzeria" <${email}>`,
      to: admins?.join(","),
      subject: "Low stock notification",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Error sending low stock notification emails:", error);
  }
};

export const orderNotifcationEmail = async (
  orderId: string,
  email: string,
  status: OrderStatus
) => {
  try {
    const emailHtml = render(OrderNotificationEmail({ orderId, status }));

    await transporter.sendMail({
      from: `"Pizzeria" <${email}>`,
      to: email,
      subject: "Order notification",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Error sending order notification emails:", error);
  }
};
export const updateOrderNotifcationEmail = async (
  orderId: string,
  email: string,
  status: OrderStatus
) => {
  try {
    const emailHtml = render(updateOrderNotificationEmail({ orderId, status }));

    await transporter.sendMail({
      from: `"Pizzeria" <${email}>`,
      to: email,
      subject: "Order notification",
      html: emailHtml,
    });
  } catch (error) {
    console.error("Error sending update order notification emails:", error);
  }
};

export const sendVerificationEmail = async (
  userEmail: string,
  token: string
) => {
  try {
    const emailHtml = render(ConfirmationEmail({ token }));

    await transporter.sendMail({
      from: `"Pizzeria" <${email}>`, // sender address
      to: userEmail, // list of receivers
      subject: "Confirm your email", // Subject line
      text: "Hello world?", // plain text body
      html: emailHtml,
    });
  } catch (err) {
    console.log("Error sending verification email:", err);
  }
};
