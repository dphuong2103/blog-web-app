import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoadingPage() {
  return (
    <article className="container flex flex-col gap-2 py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-8" />
      <hr className="my-4" />

      <Skeleton className="w-full h-10" />
      <div>
        <Skeleton className="w-full h-96" />
        <Skeleton className="w-full h-96" />
      </div>
    </article>
  );
}
