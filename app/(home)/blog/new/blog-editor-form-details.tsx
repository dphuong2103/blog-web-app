"use client";
import React, { useCallback, useMemo, useState } from "react";
import { CreateBlogForm, createBlogFormSchema } from "@/models/createBlogForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputFormField from "@/components/mui/input-form-field";
import MultiSelectFormField from "@/components/mui/multi-select-form-field";
import BlogEditor from "./blog-editor";
import { Button } from "@/components/ui/button";
import { Blog, DropdownOption, Tag } from "@/models/type";
import useMutateData from "@/hooks/useMutateData";
import { createBlog } from "@/api/blog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  RadioGroupFormField,
  RadioOption,
} from "@/components/mui/radio-group-form-field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BlogEditorFormDetailsProps {
  tags: Tag[];
}

function BlogEditorFormDetails({ tags }: BlogEditorFormDetailsProps) {
  const router = useRouter();

  const form = useForm<CreateBlogForm>({
    resolver: zodResolver(createBlogFormSchema),
    defaultValues: {
      content: "",
      isPublished: "false",
      summary: "",
      tags: [],
      title: "",
    },
  });

  const onCreateBlogSuccess = useCallback(
    (createdBlog?: Blog) => {
      if (createdBlog) {
        toast.success("Create blog successfully");
        router.push(`/blog/${createdBlog.slug}`);
      }
    },
    [router],
  );

  const onCreateBlogError = useCallback(() => {
    toast.error("Create blog failed, please try again later!");
  }, []);

  const handleCreateBlog = useCallback((data: CreateBlogForm) => {
    return createBlog({
      title: data.title,
      content: data.content,
      isPublished: data.isPublished === "true",
      summary: data.summary,
      tags: data.tags,
    });
  }, []);

  const {
    data,
    sendRequest,
    isLoading: isCreatingBlogLoading,
    error,
  } = useMutateData({
    requestHandler: handleCreateBlog,
    onSuccess: onCreateBlogSuccess,
    onError: onCreateBlogError,
  });

  const tagOptions = useMemo<DropdownOption[]>(() => {
    return (tags ?? []).map((t) => ({
      value: t.id,
      label: t.tagNameEn,
    }));
  }, [tags]);

  const publishOptions = useMemo<RadioOption[]>(() => {
    return [
      {
        value: "true",
        label: "Publish",
      },
      {
        value: "false",
        label: "Save as draft",
      },
    ];
  }, []);
  const formId = "creat-blog-form";
  return (
    <div className="px-4 md:max-lg:px-10 mt-10">
      <div className="border-border border-b">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(sendRequest)} id={formId}>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" type="button">
                      Publish
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-3">
                    <DropdownMenuLabel>
                      Select your publish option
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <RadioGroupFormField
                      control={form.control}
                      name="isPublished"
                      options={publishOptions}
                    />
                    <Button type="submit" form={formId}>
                      Save
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <BlogEditor control={form.control} name="content" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default BlogEditorFormDetails;
