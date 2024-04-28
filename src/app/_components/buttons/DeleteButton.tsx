"use client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const router = useRouter();
  const deletePost = api.post.deletePost.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync({ postId });
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  return (
    <button
      className="rounded-md bg-red-200 p-2 text-black hover:bg-red-300"
      onClick={handleDelete}
    >
      Deletar
    </button>
  );
}
