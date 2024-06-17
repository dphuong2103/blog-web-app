"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { slug } from "github-slugger";
function SearchBox() {
  const params = useSearchParams();
  const initialValue = params.get("q")?.replaceAll("-", " ");
  const [searchValue, setSearchValue] = useState(initialValue ?? "");
  const router = useRouter();

  const onSearchClick = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchValue) {
        router.push(`/search?q=${slug(searchValue)}`);
      }
    },
    [searchValue, router],
  );

  return (
    <form onSubmit={onSearchClick}>
      <div className="flex gap-2">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by title, content,..."
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

export default SearchBox;
