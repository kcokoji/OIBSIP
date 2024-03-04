"use client";

import { FaUser } from "react-icons/fa";
import {
  UserIcon,
  Package2Icon,
  LogOutIcon,
  MenuSquareIcon,
  LayoutDashboard,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { UserRole } from "@prisma/client";

export interface UserProps {
  id?: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role: UserRole | undefined;
  isTwoFactorEnabled?: boolean;
}

export const UserButton = (user: UserProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-[#ea701f]">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role == UserRole.ADMIN && (
          <Link href="/admin">
            <DropdownMenuItem>
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </DropdownMenuItem>
          </Link>
        )}
        <Link href="/profile">
          <DropdownMenuItem>
            <UserIcon className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/menus">
          <DropdownMenuItem>
            <MenuSquareIcon className="h-4 w-4 mr-2" />
            Menu
          </DropdownMenuItem>
        </Link>
        <Link href="/orders">
          <DropdownMenuItem>
            <Package2Icon className="h-4 w-4 mr-2" />
            Orders
          </DropdownMenuItem>
        </Link>

        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
