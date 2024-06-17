"use client";
import { RegisterForm, registerFormSchema } from "@/models/registerForm";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import InputFormField from "@/components/mui/input-form-field";
import useMutateData from "@/hooks/useMutateData";
import { register } from "@/api/authenticate";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function RegisterFormDetails() {
  const router = useRouter();
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    values: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onValidSubmit = useCallback(async (data: RegisterForm) => {
    return register(data);
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
        <div className="flex gap-2">
          <InputFormField
            control={form.control}
            name="firstName"
            label="First Name"
          />
          <InputFormField
            control={form.control}
            name="lastName"
            label="Last Name"
          />
        </div>
        <InputFormField
          control={form.control}
          name="password"
          label="Password"
          placeholder="********"
          type="password"
        />

        <InputFormField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="********"
          type="password"
        />

        <Button variant={"default"} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}

export default RegisterFormDetails;
