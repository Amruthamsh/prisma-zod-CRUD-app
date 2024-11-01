import prisma from "@/lib/db";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

import { editPost } from "@/actions/actions";

export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });

  async function handleSave(formData: FormData) {
    "use server";
    await editPost(formData, post!.id);
    redirect(`/posts/${post!.slug}`, RedirectType.replace);
  }

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center ">
      {post === null ? (
        <h1>Post not found</h1>
      ) : (
        <>
          <form action={handleSave}>
            <h1 className="text-3xl font-semibold">{post?.title}</h1>

            <textarea
              name="content"
              id="content"
              defaultValue={post?.content}
              className="w-96 h-96 p-5 border border-gray-300 rounded-md"
            />
            <div className="flex flex-row justify-center gap-4">
              <button
                type="submit"
                className="bg-blue-600 w-16 p-2 text-sm text-white font-bold rounded-md hover:bg-slate-800"
              >
                Save
              </button>
              <Link
                href={`/posts/${post!.slug}`}
                className="bg-red-600 w-16 p-2 text-sm text-white font-bold rounded-md hover:bg-slate-800"
                replace
              >
                Cancel
              </Link>
            </div>
          </form>
        </>
      )}
    </main>
  );
}
