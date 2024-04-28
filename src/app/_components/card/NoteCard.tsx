"use client";
import { useState } from "react";
import ViewPost from "../modals/viewPost";
import UpdatePost from "../modals/UpdatePost";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Post {
  id: number;
  name: string;
  description: string;
}

interface NoteCardProps {
  post: Post;
}

export default function NoteCard({ post }: NoteCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const router = useRouter();

  const deletePost = api.post.deletePost.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync({ postId: post.id });
      toast.error("Nota excluída");
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
  };

  const handleOpenUpdateModal = () => {
    setIsModalUpdateOpen(true);
  };

  const handleViewPost = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <div className="flex flex-col">
            <h3 className="mb-4 text-xl font-medium text-slate-700">
              {post.name}
            </h3>
          </div>
          <p className="truncate">{post.description}</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              className="rounded-md bg-red-200 p-2 text-black hover:bg-red-300"
              onClick={handleDelete}
            >
              Deletar
            </button>
            <button
              className="rounded-md bg-sky-100 p-2 text-black hover:bg-sky-300"
              onClick={handleOpenUpdateModal}
            >
              Editar
            </button>
            <button
              className="rounded-md bg-green-100 p-2 text-black hover:bg-green-300"
              onClick={handleViewPost}
            >
              Visualizar
            </button>
          </div>
        </div>
      </div>
      <ViewPost isOpen={isModalOpen} onClose={handleCloseModal} post={post} />
      <UpdatePost
        isOpen={isModalUpdateOpen}
        onClose={handleCloseModal}
        post={post}
      />
    </>
  );
}
