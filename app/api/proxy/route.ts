import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
const api_url = "http://localhost:8081/api/v1";

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

export async function PUT(req: NextRequest) {
  return handleRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
  const url = new URL(req.url);
  const path = url.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 });
  }

  // Construct the API path with query parameters
  const apiPath = `${api_url}/${path}`;
  url.searchParams.delete("path");
  const queryString = url.searchParams.toString();
  const finalUrl = queryString ? `${apiPath}&${queryString}` : apiPath;

  const cookies = cookie.parse(req.headers.get("cookie") || "");

  const requestHeaders = new Headers(req.headers);
  if (cookies.Authorization) {
    requestHeaders.set("Authorization", cookies.Authorization);
  }
  const fetchOptions: RequestInit = {
    method: req.method,
    headers: requestHeaders,
    body: req.method !== "GET" ? await req.text() : undefined,
  };

  try {
    const response = await fetch(finalUrl, fetchOptions);

    // Handle different content types
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Fetch error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
