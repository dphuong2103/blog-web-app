import { blog_api_url } from "@/constants/api";
import {
  Blog,
  BlogFilter,
  PaginationRequest,
  PaginationResult,
} from "@/models/type";
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";

export type CreateBlogRequest = {
  title: string;
  content: string;
  summary: string;
  isPublished: boolean;
  tags: string[];
};
const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
};
export async function createBlog(request: CreateBlogRequest) {
  const url = "/api/proxy?path=blogs";
  var axiosResponse = await axios.post<Blog>(
    url,
    JSON.stringify(request),
    config,
  );
  return axiosResponse.data;
}

export async function getBlogsPagination(
  request: PaginationRequest,
  filter?: BlogFilter,
) {
  const filterdObject = Object.fromEntries(
    Object.entries({ ...request, ...filter }).filter(
      ([key, value]) => value !== undefined,
    ),
  );
  const searchParams = new URLSearchParams({ ...filterdObject });
  const hasParams = !!searchParams.toString();
  const url = `${blog_api_url}${hasParams ? "?" : ""}${searchParams.toString()}`;
  const fetchedRes = await fetch(url);
  const data = (await fetchedRes.json()) as PaginationResult<Blog>;
  return data;
}

export async function getPostBySlug(slug: string) {
  const url = `${blog_api_url}/${slug}`;
  const fetchedRes = await fetch(url, { cache: "no-store" });
  const contentType = fetchedRes.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await fetchedRes.json()) as Blog;
  } else {
    return null;
  }
}
