import { z } from "zod";

export const registerFormSchema = z.object({
    email: z.string().min(1, "Required").email("Please input valid email!"),
    password: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string()
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword != password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        })
    }
});

export type RegisterForm = z.infer<typeof registerFormSchema>;
export type RegisterFormError = z.ZodError<RegisterForm>;