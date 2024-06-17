import { Skeleton } from "@/components/ui/skeleton";

export default function NewBlogLoadingPage() {
  return (
    <div className="container flex flex-col gap-2 px-10 mt-10">
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-96" />
    </div>
  );
}
