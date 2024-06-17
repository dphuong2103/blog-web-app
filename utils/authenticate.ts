import { expiryDuration } from "@/constants/value";
import { User } from "@/models/type";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
export const secretKey =
  "ECPCVSx5bhnlEWVnESptXEyOPI9KeGUUECPCVSx5bhnlEWVnESptXEyOPI9KeGUU";

export const key = new TextEncoder().encode(secretKey);

export function getJwt() {
  const cookieStore = cookies();
  const session = cookieStore.get("Authorization")?.value;
  return session?.split(" ")[1];
}

export async function encrypt(payload: any) {
  const expiryDurationInSeconds = 24 * 60 * 60;
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiryDurationInSeconds)
    .sign(key);
}

export async function decrypt(input?: string): Promise<any> {
  if (!input) return null;
  try {
    const { payload } = await jwtVerify(input.trim(), key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.log("error decrypting input: ", e);
    return null;
  }
}

export async function logout() {
  const jwt = getJwt();
  if (!jwt) return;
  cookies().set("Authorization", "", { expires: new Date(0) });
}

export async function getSession() {
  const jwt = getJwt();
  if (!jwt) return null;
  return await decrypt(jwt);
}

export async function getUser() {
  return (await getSession())?.user as User | null;
}

// export async function updateSession(request: NextRequest) {
//     const jwt = getJwt();
//     if (!jwt) return;
//     // Refresh the session so it doesn't expire
//     const parsed = await decrypt(jwt);
//     parsed.expires = new Date(Date.now() + expiryDuration);
//     const res = NextResponse.next();
//     res.cookies.set({
//         name: "Authorization",
//         value: "Bearer " + await encrypt(parsed),
//         httpOnly: true,
//         expires: parsed.expires,
//     });
//     return res;
// }

// export async function getUserFromRequest(req: Request) {
//     const jwt = req.headers.get("Authorization")?.split(" ")[1];
//     return (await decrypt(jwt))?.user as User | null;
// }
