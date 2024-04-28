"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setDescription("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name, description });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Título"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 block w-full rounded border border-gray-300 bg-white p-2 text-black focus:outline-none"
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2 block h-40 w-full rounded border border-gray-300 bg-white p-2 text-black focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Criando..." : "Criar"}
      </button>
    </form>
  );
}
