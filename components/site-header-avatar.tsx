"use client";
import { User } from "@/models/type";
import React, { useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SiteHeaderAvatarProps {
  user: User;
}
function SiteHeaderAvatar({ user }: SiteHeaderAvatarProps) {
  const router = useRouter();
  const avtFallBack = useMemo(() => {
    return (
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase()
    );
  }, [user]);

  const onLogoutClick = useCallback(async () => {
    try {
      await fetch("/api/logout");
      window.location.reload();
      router.push("/blog");
    } catch (e) {
      toast.error("Logged out failed, please try again later!");
    }
  }, [router]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{avtFallBack}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogoutClick}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SiteHeaderAvatar;
