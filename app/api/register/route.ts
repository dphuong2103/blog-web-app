import { authenticate_api_url } from "@/constants/api";
import { expiryDuration } from "@/constants/value";
import { encrypt } from "@/utils/authenticate";
import { NextResponse } from "next/server";

export async function GET() {
  return new Response("hello", {
    status: 200,
  });
}

export async function POST(req: Request) {
  const request = await req.json();
  const url = `${authenticate_api_url}/register`;
  const userResponse = await fetch(url, {
    body: JSON.stringify(request),
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
  });

  if (userResponse.status > 300) {
    return new Response(await userResponse.text(), {
      status: userResponse.status,
    });
  }
  const user = await userResponse.json();
  const expires = new Date(Date.now() + expiryDuration);
  const jwt = await encrypt({ user, expires });

  const response = NextResponse.json(JSON.stringify(user), {
    status: 201,
  });
  response.cookies.set("Authorization", `Bearer ${jwt}`, {
    expires,
    httpOnly: true,
  });
  return response;
}
