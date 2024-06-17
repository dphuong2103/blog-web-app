// import { CreateBlogRequest } from "@/api/blog";
// import { useCallback } from "react";
// import axios from 'axios';
// import { Blog, Result } from "@/models/type";
// import useMutateData from "./useMutateData";
// import { KeyedMutator } from "swr";

// function useCreateBlog(mutate?: KeyedMutator<any>) {
//     const requestHandler = useCallback(async (request: CreateBlogRequest) => {
//         var axiosResponse = await axios.post<Result<Blog>>("/api/blog", JSON.stringify(request));
//         return axiosResponse.data;
//     }, [])

//     const [data, sendRequest, isLoading, error] = useMutateData({
//         requestHandler: () => requestHandler(),
//         mutate: mutate
//     });

//     return [data, sendRequest, isLoading, error];
// }
