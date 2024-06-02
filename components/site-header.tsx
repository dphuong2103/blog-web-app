import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import SiteHeaderSearch from "./site-header-search";
import { LogIn } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <SiteHeaderSearch />

            <Link
              href={"/search"}
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 md:hidden"
                )}
              >
                <Icons.search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </div>

            </Link>

            <Link
              href={"/blog/new"}
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0"
                )}
              >
                <Icons.pencil className="h-4 w-4" />
                <span className="sr-only">New Blog</span>
              </div>
            </Link>

            <ModeToggle />
            <Link
              href={"/login"}
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0"
                )}
              >
                <LogIn className="h-4 w-4" />
                <span className="sr-only">Sign In/Sign Up</span>
              </div>
            </Link>
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
