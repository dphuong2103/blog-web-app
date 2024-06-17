"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import InputFormField from "@/components/mui/input-form-field";
import useMutateData from "@/hooks/useMutateData";
import { login } from "@/api/authenticate";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoginForm, loginFormSchema } from "@/models/loginForm";

function LoginFormDetails() {
  const router = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    values: {
      email: "",
      password: "",
    },
  });

  const onValidSubmit = useCallback(async (data: LoginForm) => {
    return login(data);
  }, []);

  const onRegisterError = useCallback((error: any) => {
    toast.error(error.response.data);
    console.error("Error", error);
  }, []);

  const onRegisterSuccess = useCallback(() => {
    router.push("/blog");
  }, [router]);

  const { data, sendRequest, isLoading, error } = useMutateData({
    requestHandler: onValidSubmit,
    onError: onRegisterError,
    onSuccess: onRegisterSuccess,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendRequest)}
        className="flex flex-col gap-3 md:max-lg:w-"
      >
        <InputFormField
          control={form.control}
          name="email"
          label="Email"
          type="email"
        />

        <InputFormField
          control={form.control}
          name="password"
          label="Password"
          placeholder="********"
          type="password"
        />

        <Button variant={"default"} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Log In
        </Button>
      </form>
    </Form>
  );
}

export default LoginFormDetails;
