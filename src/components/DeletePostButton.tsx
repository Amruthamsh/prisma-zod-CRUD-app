"use client";

import { deletePost } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  async function handleClick() {
    await deletePost(params.id);
    router.replace("/posts");
  }

  return (
    <div>
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-start justify-center z-50">
          <div className="relative bg-white/90 p-6 rounded shadow-lg text-center m-4 max-w-lg backdrop-blur-lg backdrop-filter">
            Are you sure you want to delete this post?
            <button
              onClick={handleClick}
              className="ml-2 text-red-500 font-bold hover:underline"
            >
              Confirm
            </button>
            <button
              onClick={() => setDeleteConfirm(false)}
              className="ml-2 text-blue-600 hover:underline font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setDeleteConfirm(true)}
        className="bg-red-500 p-2 text-sm text-white font-bold rounded-md hover:bg-slate-800"
      >
        Delete Post
      </button>
    </div>
  );
}
