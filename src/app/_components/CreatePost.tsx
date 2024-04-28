"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setDescription("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost.mutate({ name, description });
    toast.success("Nota criada com sucesso");
    if (!name.trim() || !description.trim()) {
      setError("Os campos de título e/ou descrição não podem estar vazios.");
      return;
    } else {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
      {error && <p className="p-4 text-red-500">{error}</p>}
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
