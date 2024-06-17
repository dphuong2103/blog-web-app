import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = NextResponse.json({
    status: 200,
  });
  response.cookies.delete("Authorization");
  return response;
}
