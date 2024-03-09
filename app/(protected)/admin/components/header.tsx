import Image from "next/image";

import Notifications from "./notifications";

import Link from "next/link";
import { UserButton, UserProps } from "@/components/user-button";

export default function Header(user: UserProps) {
  return (
    <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4 border-b bg-white sticky top-0 z-50 px-6 dark:bg-gray-800/40">
      <Link href="/" className=" lg:hidden">
        <div className="flex items-center gap-x-2">
          <Image
            src="/img/logo.png"
            width={30}
            height={30}
            alt="logo"
            className="w-auto  h-auto"
            priority
          />
        </div>
      </Link>

      <div className="flex  items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Notifications />
        <div className=" lg:hidden">
          <UserButton {...user} />
        </div>
      </div>
    </header>
  );
}
