import { blog_api_url } from "@/app/api/blog/route";
import { Blog, BlogFilter, PaginationRequest, PaginationResult } from "@/models/type";
import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";

export type CreateBlogRequest = {
    title: string;
    content: string;
    summary: string;
    isPublished: boolean;
    tags: string[]
}
const config: AxiosRequestConfig = {
    headers: {
        'content-type': 'application/json'
    }
}
export async function createBlog(request: CreateBlogRequest) {
    var axiosResponse = await axios.post<Blog>("/api/blog", JSON.stringify(request), config);
    return axiosResponse.data;
}

export async function getBlogsPagination(request: PaginationRequest, filter?: BlogFilter) {
    const filterdObject = Object.fromEntries(
        Object.entries({ ...request, ...filter }).filter(([key, value]) => value !== undefined)
    );
    const searchParams = new URLSearchParams({ ...filterdObject });
    const hasParams = !!searchParams.toString();
    const url = `${blog_api_url}${hasParams ? "?" : ""}${searchParams.toString()}`
    const fetchedRes = await fetch(url);
    const data = await fetchedRes.json() as PaginationResult<Blog>;
    return data;
}

export async function getPostBySlug(slug: string) {
    const url = `${blog_api_url}/${slug}`;
    const fetchedRes = await fetch(url, { cache: 'no-store' });
    const data = await fetchedRes.json() as Blog;
    return data;
}