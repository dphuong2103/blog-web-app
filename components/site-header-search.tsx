"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { slug } from "github-slugger";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface SiteHeaderSearchProps {
  className?: string;
}

function SiteHeaderSearch({ className }: SiteHeaderSearchProps) {
  const params = useSearchParams();
  const initialValue = params.get("q");
  const [searchValue, setSearchValue] = useState(initialValue ?? "");
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathName !== "/search") {
      setSearchValue("");
    }
  }, [pathName]);

  const onSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchValue) {
        router.push(`/search?q=${slug(searchValue.trim())}`);
      }
    },
    [searchValue, router],
  );

  const classN = useMemo(() => {
    return cn(
      className,
      pathName === "/search" ? "hidden" : "hidden md:inline-flex mr-1",
    );
  }, [pathName, className]);

  return (
    <div className={classN}>
      <form onSubmit={onSearch}>
        <div className="flex items-center content-center gap-1">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by title, content,..."
          />
          <Button variant="outline" className="p-3">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SiteHeaderSearch;
