import React from 'react'
import BlogEditorForm from "./BlogEditorForm"
import { getAllTags } from "@/api/tag";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Blog",
}

async function NewBlogPage() {
    const tags = await getAllTags();
    return (
        <div>
            <BlogEditorForm tags={tags ?? []} />
        </div>
    )
}
export default NewBlogPage

















