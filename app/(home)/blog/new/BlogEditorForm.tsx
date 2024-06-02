"use client"
import React, { useCallback, useMemo, useState } from 'react'
import { CreateBlogForm, createBlogFormSchema } from "@/models/createBlogForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputFormField from "@/components/mui/InputFormField";
import MultiSelectFormField from "@/components/mui/MultiSelectFormField";
import BlogEditor from "./BlogEditor";
import { Button } from "@/components/ui/button";
import { Blog, DropdownOption, Tag } from "@/models/type";
import useMutateData from "@/hooks/useMutateData";
import { createBlog } from "@/api/blog";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface BlogEditorFormProps {
    tags: Tag[]
}

function BlogEditorForm({ tags }: BlogEditorFormProps) {
    const router = useRouter();

    const form = useForm<CreateBlogForm>({
        resolver: zodResolver(createBlogFormSchema),
        defaultValues: {
            content: "",
            isPublished: false,
            summary: "",
            tags: [],
            title: ""
        }
    });

    const onCreateBlogSuccess = useCallback((createdBlog?: Blog) => {
        if (createdBlog) {
            toast.success("Create blog successfully");
            router.push(`/blog/${createdBlog.slug}`);
        }
    }, [router])

    const onCreateBlogError = useCallback(() => {
        toast.error("Create blog failed, please try again later!");
    }, [])

    const { data, sendRequest, isLoading: isCreatingBlogLoading, error } = useMutateData({
        requestHandler: createBlog,
        onSuccess: onCreateBlogSuccess,
        onError: onCreateBlogError
    });

    const tagOptions = useMemo<DropdownOption[]>(() => {
        return (tags ?? []).map(t => ({
            value: t.id,
            label: t.tagNameEn,
        }))
    }, [tags])

    return (
        <div className="px-4 md:max-lg:px-10 mt-10">
            <div className="border-border border-b">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(sendRequest)}>
                        <div className="flex flex-col gap-1">
                            <InputFormField
                                control={form.control}
                                name="title"
                                placeholder="Title"
                            />
                            <InputFormField
                                control={form.control}
                                name="summary"
                                placeholder="Summary"
                            />
                            <div className="flex items-center content-center gap-2">
                                <MultiSelectFormField
                                    control={form.control}
                                    name="tags"
                                    options={tagOptions}
                                    className="mr-auto w-full"
                                    placeholder="Tags"
                                />
                                <Button variant={"default"} disabled={isCreatingBlogLoading}>
                                    {isCreatingBlogLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create
                                </Button>
                            </div>

                            <BlogEditor control={form.control} name="content" />
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}

export default BlogEditorForm

