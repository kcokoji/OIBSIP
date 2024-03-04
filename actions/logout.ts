"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // Some server stuffs
  await signOut();
};
