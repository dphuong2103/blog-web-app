import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";
import { Tag as TTag } from "@/models/type";

interface TagProps {
  tag: TTag;
  current?: boolean;
  count?: number;
}

export function Tag({ tag, current, count }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={`/tag/${slug(tag.tagNameEn)}`}
    >
      {tag.tagNameEn} {count ? `(${count})` : null}
    </Link>
  );
}
