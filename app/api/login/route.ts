import { authenticate_api_url } from "@/constants/api";
import { expiryDuration } from "@/constants/value";
import { User } from "@/models/type";
import { encrypt } from "@/utils/authenticate";
import { NextResponse } from "next/server";
const url = `${authenticate_api_url}/login`;

export async function POST(req: Request) {
  const request = await req.json();
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
  const user = (await userResponse.json()) as User;
  const expires = new Date(Date.now() + expiryDuration);
  const jwt = await encrypt({ user, expires });
  const response = NextResponse.json(JSON.stringify(user), {
    status: 200,
  });
  const value = `Bearer ${jwt}`;
  response.cookies.set({
    name: "Authorization",
    value: value,
    httpOnly: true,
  });
  return response;
}
