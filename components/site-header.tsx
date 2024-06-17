import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import SiteHeaderSearch from "./site-header-search";
import SiteHeaderAvatar from "./site-header-avatar";
import { getSession } from "@/utils/authenticate";
import { User } from "@/models/type";
import { Pencil } from "lucide-react";

export async function SiteHeader() {
  const session = await getSession();
  const user = session ? (session.user as User) : null;
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex-1 flex items-center justify-end gap-2 md:max-xl:gap-0">
            <SiteHeaderSearch />
            {user && (
              <Link href={"/blog/new"} rel="noreferrer">
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-10 px-0 hidden md:inline-flex text-secondary-foreground",
                  )}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">New Blog</span>
                </div>
              </Link>
            )}

            <ModeToggle />
            {user ? (
              <SiteHeaderAvatar user={user} />
            ) : (
              <Link href={"/login"} rel="noreferrer">
                <div
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "px-4 hidden md:inline-block",
                  )}
                >
                  <span>Log In</span>
                </div>
              </Link>
            )}
            <MobileNav user={user} />
          </nav>
        </div>
      </div>
    </header>
  );
}
