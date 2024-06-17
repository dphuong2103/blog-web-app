import { getBlogsPagination } from "@/api/blog";
import { getAllTags } from "@/api/tag";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sortShownTagsByCount } from "@/utils/sort-tags";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My blog",
  description: "This is a description",
};

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { data, pageInfo } = await getBlogsPagination({
    page: searchParams.page,
  });
  const totalPages = Math.ceil(pageInfo.totalCount / pageInfo.size);
  const tags = await getAllTags();
  const tagIds: string[] = [];
  data.forEach((b) =>
    b.tags.forEach((t) => {
      tagIds.push(t.id);
    }),
  );
  const tagsByCount =
    tags !== undefined ? sortShownTagsByCount(tagIds, tags) : [];
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My ramblings on all things web dev.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {data?.length > 0 ? (
            <ul className="flex flex-col">
              {(data ?? []).map((post) => {
                const { slug, title, summary, createdAt } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={createdAt}
                      title={title}
                      description={summary}
                      tags={post.tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {tagsByCount?.map((i) => (
              <Tag tag={i.tag} key={i.tag.id} count={i.count} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
