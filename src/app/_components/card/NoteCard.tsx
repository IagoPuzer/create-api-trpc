"use client";
import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import ViewPost from "../modals/viewPost";

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

  const handleCloseUpdateModal = () => {
    setIsModalOpen(false);
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
            <DeleteButton postId={post.id} />
            <button className="rounded-md bg-sky-100 p-2 text-black hover:bg-sky-300">
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
      <ViewPost
        isOpen={isModalOpen}
        onClose={handleCloseUpdateModal}
        post={post}
      />
    </>
  );
}
