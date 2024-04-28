import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import NoteCard from "./_components/card/NoteCard";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="w-full max-w-xs">
          <h1 className="mb-6 flex w-full justify-center text-3xl">
            Notes APP
          </h1>
          <CreatePost />
        </div>
        <ShowPosts />
      </div>
    </main>
  );
}

async function ShowPosts() {
  const getAllPost = await api.post.listPosts();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {getAllPost.map((post) => (
        <NoteCard key={post.id} post={post} />
      ))}
    </div>
  );
}
