import Container from "./container";

import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import { UserButton } from "./user-button";

import { currentUser } from "@/lib/auth";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <Container className="sticky top-0 z-50 bg-white border-b border-black">
      <div className="flex justify-between items-center">
        <div className="lg:hidden">
          <Link href="/">
            <div className="flex items-center gap-x-2">
              <Image
                src="/img/logo.png"
                width={30}
                height={30}
                alt="logo"
                className="w-auto  h-auto"
                priority
              />
              <p className="font-bold lg:text-lg ">PIZZERIA</p>
            </div>
          </Link>
        </div>
        <p className="font-bold lg:text-lg hidden lg:block">PIZZERIA</p>
        <Link href="/">
          <Image
            src="/img/logo.png"
            width={40}
            height={40}
            alt="logo"
            className="w-auto h-auto hidden lg:block"
            priority
          />
        </Link>
        {!user ? (
          <Button size="lg" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        ) : (
          <UserButton {...user} />
        )}
      </div>
    </Container>
  );
}
