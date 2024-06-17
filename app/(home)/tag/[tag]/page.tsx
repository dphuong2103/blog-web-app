import { getBlogsPagination } from "@/api/blog";
import { getAllTags } from "@/api/tag";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sortShownTagsByCount } from "@/utils/sort-tags";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
    page?: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  const { data: displayPosts, pageInfo } = await getBlogsPagination(
    { page: params.page },
    {
      tagSlug: params.tag,
    },
  );

  const tags = await getAllTags();
  const tagIds: string[] = [];
  displayPosts.forEach((b) =>
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
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
            {title}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, createdAt, title, summary, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={createdAt}
                      title={title}
                      description={summary}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {tagsByCount?.map((t) => (
              <Tag
                tag={t.tag}
                key={t.tag.id}
                count={t.count}
                current={slug(t.tag.id) === tag}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
