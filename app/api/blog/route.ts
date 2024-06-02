import { api_url } from "@/constants/api";

export const blog_api_url = `${api_url}/blogs`

export async function POST(req: Request) {
    const body = await req.json();
    const apiRes = await fetch(blog_api_url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
    })
    if (!apiRes.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    var apiResData = await apiRes.json();
    return new Response(JSON.stringify(apiResData), {
        status: 201
    })
}