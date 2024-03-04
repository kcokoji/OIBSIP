"use client";

import {
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  LineChartIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { UserButton, UserProps } from "@/components/user-button";

interface Props {
  user: any;
  count: number | null;
}

export default function SideBar({ user, count }: Props) {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background lg:block dark:bg-gray-800/40">
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
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
        <div className="flex-1">
          <nav className="grid items-start relative px-4 text-sm font-medium gap-1">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all  dark:text-gray-400 ">
              <HomeIcon className="h-4 w-4" />
              Home
            </div>
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg hover:bg-gray-100 px-3 py-2   transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                pathname === "/admin" ? "bg-gray-100 text-primary" : ""
              )}
              href="/admin"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Orders
              {count! > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                >
                  {count}
                </Badge>
              )}
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 rounded-lg hover:bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-primary dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                pathname === "/admin/inventory"
                  ? "bg-gray-100 text-primary"
                  : ""
              )}
              href="/admin/inventory"
            >
              <PackageIcon className="h-4 w-4" />
              Inventory
            </Link>
            <Link
              className={cn(
                "flex items-center hover:bg-gray-100  gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-primary dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                pathname === "/admin/customers"
                  ? "bg-gray-100 text-primary"
                  : ""
              )}
              href="/admin/customers"
            >
              <UsersIcon className="h-4 w-4" />
              Customers
            </Link>
            <Link
              className={cn(
                "flex items-center gap-3 hover:bg-gray-100 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-primary dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                pathname === "/admin/analytics"
                  ? "bg-gray-100 text-primary"
                  : ""
              )}
              href="/admin/analytics"
            >
              <LineChartIcon className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 p-4 absolute bottom-1">
          <UserButton {...user} />
          <div className="text-sm">
            <div className="font-semibold">{user.name}</div>
            <div className="text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
