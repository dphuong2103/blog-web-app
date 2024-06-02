import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/api/blog";
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tag } from "@/components/tag";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPostFromParams(slug: string) {
  const post = await getPostBySlug(slug);
  return post;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params.slug);

  //todo: chec  !post.isPublished
  if (!post) {
    notFound();
  }
  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </div>
      {post.summary ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.summary}</p>
      ) : null}
      <hr className="my-4" />

      <Markdown remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => <Table>{children}</Table>,
          tr: ({ children }) => <TableRow>{children}</TableRow>,
          thead: ({ children }) => <TableHeader>{children}</TableHeader>,
          th: ({ children }) => <TableHead className="font-bold">{children}</TableHead>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          td: ({ children }) => <TableCell>{children}</TableCell>,
          link: ({ children }) => <Link href={children as string} target="_blank" rel="noreferrer">{children}</Link>
        }} >
        {post.content
        }</Markdown>
    </article>
  );
}


export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.slug);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.summary,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}
