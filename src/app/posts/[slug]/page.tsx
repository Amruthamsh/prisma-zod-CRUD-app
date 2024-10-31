import prisma from "@/lib/db";
import DeletePostButton from "@/components/DeletePostButton";

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
        <div>
          <h1 className="text-3xl font-semibold">{post?.title}</h1>
          <p>{post?.content}</p>

          <div className="flex flex-row gap-5">
            <DeletePostButton params={{ id: post.id }} />
          </div>
        </div>
      )}
    </main>
  );
}
