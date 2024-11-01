import prisma from "@/lib/db";
import DeletePostButton from "@/components/DeletePostButton";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center max-w-2xl mx-auto">
      {post === null ? (
        <h1>Post not found</h1>
      ) : (
        <>
          <Link href={`/posts`} className="text-blue-500 underline">
            All Posts
          </Link>
          <h1 className="text-3xl font-semibold">{post?.title}</h1>
          <p className="whitespace-pre-wrap p-5 border border-gray-300 rounded-md text-left">
            {post?.content}
          </p>

          <div className="flex flex-row gap-5">
            <Link
              href={`/posts/${post.slug}/edit`}
              className="bg-blue-600 p-2 text-sm text-white font-bold rounded-md hover:bg-slate-800"
            >
              Edit Post
            </Link>
            <DeletePostButton params={{ id: post.id }} />
          </div>
        </>
      )}
    </main>
  );
}
