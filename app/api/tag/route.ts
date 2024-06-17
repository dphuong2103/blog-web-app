import { api_url } from "@/constants/api";
import { NextRequest } from "next/server";

export const tag_api_url = `${api_url}/tags`;
export async function GET(request: NextRequest) {
  const res = await fetch(tag_api_url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  var resJson = await res.json();
  return new Response(JSON.stringify(resJson), {
    status: 200,
  });
}
