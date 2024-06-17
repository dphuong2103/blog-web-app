import { getAllTags } from "@/api/tag";
import useSWR from "swr";
const fetcher = () => getAllTags();

export default function useTags() {
  const { data, error, isLoading, mutate } = useSWR("tag", fetcher);

  return {
    tags: data,
    isLoading,
    isError: error,
    mutate,
  };
}
