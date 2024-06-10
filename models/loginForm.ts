import { z } from "zod";
import { nonEmptyString } from "./z-custom";

export const loginFormSchema = z.object({
    email: nonEmptyString.email("Please input valid email!"),
    password: nonEmptyString,
});

export type LoginForm = z.infer<typeof loginFormSchema>;
export type LoginFormError = z.ZodError<LoginForm>;