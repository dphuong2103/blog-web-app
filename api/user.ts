import { user_api_url } from "@/constants/api";
import { User } from "@/models/type";

export async function getUserById(userId?: string) {
  if (!userId) return null;
  var response = await fetch(`${user_api_url}/${userId}`);
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as User;
}
