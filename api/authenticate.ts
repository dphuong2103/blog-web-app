import { LoginRequest, RegisterRequest, User } from "@/models/type";
import axios, { AxiosRequestConfig } from "axios";
const config: AxiosRequestConfig = {
  headers: {
    "content-type": "application/json",
  },
};
export async function register(request: RegisterRequest) {
  var axiosRes = await axios.post(
    "/api/register",
    JSON.stringify(request),
    config,
  );
  return axiosRes.data;
}

export async function login(request: LoginRequest) {
  var axiosRes = await axios.post(
    "/api/login",
    JSON.stringify(request),
    config,
  );
  return axiosRes.data;
}
