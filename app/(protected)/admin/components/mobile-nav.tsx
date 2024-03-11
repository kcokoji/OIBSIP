"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  LineChartIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface Props {
  count: number | null;
}

export function MobileNav({ count }: Props) {
  const pathname = usePathname();
  return (
    <nav className="h-13 w-full border-b bg-white lg:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-none rounded-none">
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <nav className="grid items-start relative px-4 text-sm font-medium gap-1  w-[400px] md:w-[500px] py-4">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all  dark:text-gray-400 ">
                  <HomeIcon className="h-4 w-4" />
                  Home
                </div>
                <Link legacyBehavior passHref href="/admin">
                  <NavigationMenuLink
                    className={cn(
                      "flex items-center gap-3 rounded-lg hover:bg-gray-100 px-3 py-2   transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                      pathname === "/admin" ? "bg-gray-100 text-primary" : ""
                    )}
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
                  </NavigationMenuLink>
                </Link>
                <Link legacyBehavior passHref href="/admin/inventory">
                  <NavigationMenuLink
                    className={cn(
                      "flex items-center gap-3 rounded-lg hover:bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-primary dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                      pathname === "/admin/inventory"
                        ? "bg-gray-100 text-primary"
                        : ""
                    )}
                  >
                    <PackageIcon className="h-4 w-4" />
                    Inventory
                  </NavigationMenuLink>
                </Link>
                <Link legacyBehavior passHref href="/admin/customers">
                  <NavigationMenuLink
                    className={cn(
                      "flex items-center hover:bg-gray-100  gap-3 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-primary dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                      pathname === "/admin/customers"
                        ? "bg-gray-100 text-primary"
                        : ""
                    )}
                  >
                    <UsersIcon className="h-4 w-4" />
                    Customers
                  </NavigationMenuLink>
                </Link>
                <Link legacyBehavior passHref href="/admin/analytics">
                  <NavigationMenuLink
                    className={cn(
                      "flex items-center gap-3 hover:bg-gray-100 rounded-lg  px-3 py-2 text-gray-900  transition-all hover:text-primary dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50",
                      pathname === "/admin/analytics"
                        ? "bg-gray-100 text-primary"
                        : ""
                    )}
                  >
                    <LineChartIcon className="h-4 w-4" />
                    Analytics
                  </NavigationMenuLink>
                </Link>
              </nav>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
