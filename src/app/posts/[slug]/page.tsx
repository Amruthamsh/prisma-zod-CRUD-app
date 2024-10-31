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
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center ">
      {post === null ? (
        <h1>Post not found</h1>
      ) : (
        <>
          <Link href={`/posts`}>All Posts</Link>
          <h1 className="text-3xl font-semibold">{post?.title}</h1>
          <p>{post?.content}</p>

          <div className="flex flex-row gap-5">
            <DeletePostButton params={{ id: post.id }} />
            <Link
              href={`/posts/${post.slug}/edit`}
              className="bg-blue-600 p-2 text-sm text-white font-bold rounded-md hover:bg-slate-800"
            >
              Edit Post
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
