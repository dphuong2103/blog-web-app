import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";
import { Blog, Tag } from "@/models/type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Blog>) {
  return posts.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
}


export function sortTagsByCount(shownTagIds: string[], tags: Tag[]) {
  const tagsWithCount = tags.map(tag => {
    const count = shownTagIds.reduce((total, x) => {
      if (x === tag.id) {
        return total + 1;
      }
      return total;
    }, 0)
    return {
      tag,
      count
    }
  });
  return tagsWithCount.filter(x => x.count > 0).sort((a, b) => b.count - a.count);
}
