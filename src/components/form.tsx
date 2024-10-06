"use client";

import { createPost } from "@/actions/actions";
import { useRef } from "react";

export function Form() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createPost(formData);
        ref.current?.reset();
      }}
      className="flex flex-col gap-y-2 w-[300px]"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="px-2 py-1 rounded-sm border-2"
      />
      <textarea
        name="content"
        rows={5}
        placeholder="Content"
        className="px-2 py-1 rounded-sm border-2"
      ></textarea>
      <button type="submit" className="bg-blue-700 py-2 text-white rounded-sm">
        Create Post
      </button>
    </form>
  );
}
