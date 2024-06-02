import { Card } from "@/components/ui/card"
import React from 'react'
import LoginForm from "./LoginForm"

function LoginPage() {


  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
          Login into Midouz
        </h1>
        <LoginForm />
      </Card>
    </div>

  )
}

export default LoginPage