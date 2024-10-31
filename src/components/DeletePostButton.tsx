"use client";

import { deletePost } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function ({ params }: { params: { id: string } }) {
  const router = useRouter();

  async function handleClick() {
    await deletePost(params.id);
    router.replace("/posts");
  }

  return (
    <button
      onClick={handleClick}
      className="bg-red-500 p-2 text-sm text-white font-bold rounded-md hover:bg-slate-800"
    >
      Delete Post
    </button>
  );
}
