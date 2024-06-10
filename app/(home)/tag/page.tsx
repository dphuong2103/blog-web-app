import { Metadata } from "next";
import { Tag } from "@/components/tag";
import { getTagsWithBlogCount } from "@/api/tag";

export const metadata: Metadata = {
  title: "Tags",
  description: "Topic I've written about",
};

export default async function TagsPage() {
  const tags = await getTagsWithBlogCount();
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Tags</h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {tags?.map((item) => (
          <Tag tag={item.tag} count={item.count} key={item.count} />
        ))}
      </div>
    </div>
  );
}
