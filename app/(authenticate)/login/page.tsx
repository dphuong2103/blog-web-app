import { Card } from "@/components/ui/card";
import React from "react";
import LoginForm from "./login-form-details";
import Link from "next/link";

function LoginPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-11/12 flex flex-col p-4 max-w-96 gap-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance self-center mb-4">
          Welcome Back!
        </h1>
        <LoginForm />
        <div>
          Don&apos;t have an account? <Link href={"/register"}>Sign up</Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
