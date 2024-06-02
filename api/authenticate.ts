import { RegisterRequest, User } from "@/models/type";
import axios, { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig = {
    headers: {
        'content-type': 'application/json'
    }
}
export async function register(request: RegisterRequest) {
    // var response = await fetch("/api/register", {
    //     body: JSON.stringify(request),
    //     method: 'POST',
    //     headers: new Headers({ 'content-type': 'application/json' }),
    // })
    var axiosRes = await axios.post("/api/register", JSON.stringify(request), config);
    console.log("axiosRes", axiosRes);
    // var user = await response.json() as User;
    return axiosRes.data;
}