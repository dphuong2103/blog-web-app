import { authenticate_api_url } from "@/constants/api";
import { encrypt } from "@/utils/authenticate";
import { cookies } from "next/headers";

const url = `${authenticate_api_url}/login`;
export async function POST(req: Request) {
    const request = await req.json()

    const userResponse = await fetch(url, {
        body: JSON.stringify(request),
        headers: {
            "content-type": "application/json"
        }
    })
    const user = await userResponse.json();
    console.log("Created user: ", user);
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    return new Response(JSON.stringify(user), {
        status: 200
    })
}