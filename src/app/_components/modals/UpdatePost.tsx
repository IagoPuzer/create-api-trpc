"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

interface Post {
  id: number;
  name: string;
  description: string;
}

interface UpdatePostProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePost({ isOpen, onClose, post }: UpdatePostProps) {
  const router = useRouter();
  const [updatedPost, setUpdatedPost] = useState<Post>({
    ...post,
    id: post.id,
  });
  const [error, setError] = useState<string>("");

  const postUpdate = api.post.updatePost.useMutation({
    onSuccess: () => {
      router.refresh();
      onClose();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUpdatedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postUpdate.mutate({ ...updatedPost, id: updatedPost.id });
    toast.success("Nota editada com sucesso");
    if (!updatedPost.name.trim() || !updatedPost.description.trim()) {
      setError("Os campos de título e/ou descrição não podem estar vazios.");
      return;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="z-10 w-96 rounded-lg bg-white p-8 shadow-lg md:w-1/2 2xl:w-1/4">
            <div className="mb-4 flex justify-between">
              <h2 className="mb-2 text-xl font-bold text-gray-700">
                Editar nota
              </h2>
            </div>
            <form
              className="mb-8 rounded bg-gray-100 p-4 "
              onSubmit={handleSubmit}
            >
              <label className="text-slate-700">Titulo:</label>
              <input
                type="text"
                name="name"
                placeholder="Title"
                className="mb-2 block w-full rounded border border-gray-300 bg-white p-2 text-black focus:outline-none"
                value={updatedPost.name}
                onChange={handleChange}
              />
              <label className="text-slate-700">Descrição:</label>
              <textarea
                name="description"
                placeholder="Description"
                className="mb-2 block h-40 w-full rounded border border-gray-300 bg-white p-2 text-black focus:outline-none"
                value={updatedPost.description}
                onChange={handleChange}
              />
              {error && <p className="p-4 text-red-500">{error}</p>}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
                >
                  Atualizar
                </button>
                <button
                  onClick={onClose}
                  className="rounded bg-gray-500 px-4 py-2 font-semibold text-white hover:bg-gray-600"
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
