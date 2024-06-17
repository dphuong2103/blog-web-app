export const dynamic = "force-dynamic";
import { PostItem } from "@/components/post-item";
import { getBlogsPagination } from "@/api/blog";
async function getBlogs() {
  return getBlogsPagination({ page: "1" });
}

export default async function Home() {
  const { data: blogs } = await getBlogs();
  return (
    <>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {blogs.map((blog) => (
            <li key={blog.slug} className="first:border-t first:border-border">
              <PostItem
                slug={blog.slug}
                title={blog.title}
                description={blog.summary}
                date={blog.createdAt}
                tags={blog.tags}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
