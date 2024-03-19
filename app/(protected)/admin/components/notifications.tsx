"use client";
import React from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notification } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

interface Props {
  notifications: Notification[] | null;
}

export default function Notifications({ notifications }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <Bell />
          {notifications && notifications.length > 0 && (
            <span className="absolute top-1 right-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/90 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <DropdownMenuLabel className="text-base lg:text-xl">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications && notifications.length > 0 ? (
          <div className=" divide-y divide-slate-300">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="gap-2 flex justify-between items-center rounded-none lg:py-4 relative"
              >
                {/* Handle later */}

                {/* <Button
                  size="icon"
                  variant="destructive"
                  className="right-1 top-0 absolute h-4 w-4"
                >
                  <X className="" />
                </Button> */}
                <div className="text-sm line-clamp-1 flex items-center">
                  {" "}
                  <span className="inline-flex rounded-full h-2 w-2 bg-primary mr-1"></span>
                  {notification.title}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        ) : (
          <span className="text-sm italic text-muted-foreground py-4 flex justify-center items-center">
            No Notifications
          </span>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
