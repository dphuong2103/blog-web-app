import { z } from "zod";

export const createBlogFormSchema = z.object({
    title: z.string().min(1, "required"),
    summary: z.string(),
    isPublished: z.boolean(),
    tags: z.array(z.string()),
    content: z.string().min(1, "required")
});

export type CreateBlogForm = z.infer<typeof createBlogFormSchema>;
export type CreateBlogFormError = z.ZodError<CreateBlogForm>;