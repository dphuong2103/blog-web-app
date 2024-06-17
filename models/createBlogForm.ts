import { z } from "zod";
import { BoolString, nonEmptyString } from "./z-custom";

export const createBlogFormSchema = z.object({
  title: nonEmptyString,
  summary: nonEmptyString,
  isPublished: z.enum(["true", "false"]),
  tags: z
    .array(z.string())
    .min(2, "You must select atleast 2 tags")
    .max(5, "You must select 5 tags at most"),
  content: nonEmptyString,
});

export type CreateBlogForm = z.infer<typeof createBlogFormSchema>;
export type CreateBlogFormError = z.ZodError<CreateBlogForm>;
