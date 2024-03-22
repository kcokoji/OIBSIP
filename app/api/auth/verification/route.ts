import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const hasExpired = new Date(existingToken.expire) < new Date();
    const tokenExpiredMessage = "Token has expired";
    if (hasExpired) {
      return NextResponse.redirect(
        new URL(`/error?message=${tokenExpiredMessage}`, request.url)
      );
    }
    const existingUser = await getUserByEmail(existingToken.email);
    const existingUserMessage = "Token has expired";
    if (!existingUser) {
      return NextResponse.redirect(
        new URL(`/error?message=${existingUserMessage}`, request.url)
      );
    }

    await Promise.all([
      db.user.update({
        where: { id: existingUser.id },
        data: {
          emailVerified: new Date(),
          email: existingToken.email,
        },
      }),
      db.verificationToken.delete({
        where: { id: existingToken.id },
      }),
    ]);
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (err) {
    return NextResponse.redirect(new URL(`/error?message=${err}`, request.url));
  }
}
