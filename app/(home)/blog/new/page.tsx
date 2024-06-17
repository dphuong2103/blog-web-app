import React from "react";
import BlogEditorFormDetails from "./blog-editor-form-details";
import { getAllTags } from "@/api/tag";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog",
};

async function NewBlogPage() {
  const tags = await getAllTags();
  return (
    <div>
      <BlogEditorFormDetails tags={tags ?? []} />
    </div>
  );
}
export default NewBlogPage;
