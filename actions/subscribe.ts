"use server";
import { getSubscriberEmail } from "@/data/user";
import { SubscribeSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const subscribe = async (values: z.infer<typeof SubscribeSchema>) => {
  const validatedFields = SubscribeSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email } = validatedFields.data;

  const existingEmail = await getSubscriberEmail(email);

  if (existingEmail) {
    return { error: "Email is already subscribed!" };
  }

  try {
    await db.subscribedEmail.create({
      data: {
        email,
      },
    });
    return { success: "You have successfully subscribed to our email list" };
  } catch (err) {
    return { error: "An unexpected error occured" };
  }
};
