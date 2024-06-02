import { tag_api_url } from "@/app/api/tag/route";
import { Tag } from "@/models/type";

export async function getAllTags() {
    try {
        var response = await fetch(tag_api_url);
        var responseData = await response.json() as Tag[];
        return responseData;
    } catch (error) {
        console.error("fetch tag fail", error);
    }
}
