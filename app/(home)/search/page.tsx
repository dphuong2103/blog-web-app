import React from "react";
import SearchBox from "./search-box";
import { getBlogsPagination } from "@/api/blog";
import { getAllTags } from "@/api/tag";
import { PostItem } from "@/components/post-item";
import { Blog } from "@/models/type";
import { QueryPagination } from "@/components/query-pagination";
import { sortShownTagsByCount } from "@/utils/sort-tags";

interface SearchPageParams {
  searchParams: {
    q?: string;
    page?: string;
  };
}

async function searchBlogsPagination({
  page,
  q,
}: SearchPageParams["searchParams"]) {
  if (!q) {
    return {
      pageInfo: null,
      data: [] as Blog[],
    };
  } else {
    return await getBlogsPagination({ page: page }, { q: q });
  }
}

async function SearchPage({ searchParams }: SearchPageParams) {
  const { data, pageInfo } = await searchBlogsPagination(searchParams);
  const totalPages = pageInfo
    ? Math.ceil(pageInfo.totalCount / pageInfo.size)
    : 0;
  const tags = await getAllTags();
  const tagIds: string[] = [];

  (data ?? []).forEach((b) =>
    b.tags.forEach((t) => {
      tagIds.push(t.id);
    }),
  );
  const tagsByCount =
    tags !== undefined ? sortShownTagsByCount(tagIds, tags) : [];

  return (
    <div className="container max-w-4xl py-6 lg:py-10 flex flex-col">
      <SearchBox />
      {data.length > 0 && (
        <ul className="flex flex-col p-2">
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
      )}
      {searchParams.q && data.length === 0 && (
        <p className="text-center p-5">No results!</p>
      )}
      <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
    </div>
  );
}

export default SearchPage;
