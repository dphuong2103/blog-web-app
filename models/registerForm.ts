import { z } from "zod";
import { nonEmptyString } from "./z-custom";

export const registerFormSchema = z
  .object({
    email: nonEmptyString.email("Please input valid email!"),
    password: nonEmptyString,
    confirmPassword: nonEmptyString,
    firstName: nonEmptyString,
    lastName: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterForm = z.infer<typeof registerFormSchema>;
export type RegisterFormError = z.ZodError<RegisterForm>;
