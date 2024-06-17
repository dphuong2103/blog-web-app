import { Blog } from "@/models/type";

export function sortPosts(posts: Array<Blog>) {
  return posts.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
}
