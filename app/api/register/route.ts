import { authenticate_api_url } from "@/constants/api";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);
async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10 sec from now")
        .sign(key);
}
export async function GET() {
    return new Response("hello", {
        status: 200
    });
}

export async function POST(req: Request) {
    const request = await (req.json());
    const url = `${authenticate_api_url}/register`;
    const userResponse = await fetch(url, {
        body: JSON.stringify(request),
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
    });
    if (userResponse.status > 300) {
        return new Response(await userResponse.text(), {
            status: userResponse.status
        })
    }
    const user = { name: "phuong" };
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    const response = NextResponse.json(JSON.stringify(user), {
        status: 201
    })
    response.cookies.set("Bearer", session, { expires, httpOnly: true });
    return response;
}