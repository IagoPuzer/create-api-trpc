interface Post {
  name: string;
  description: string;
}

interface Props {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewNote({ isOpen, onClose, post }: Props) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="z-10 w-96 rounded-lg bg-white p-8 shadow-lg md:w-1/2 2xl:w-1/4">
            <div className="mb-4 flex justify-between">
              <h2 className="mb-2 text-xl font-bold text-gray-700">
                Visualizar Nota
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                {post.name}
              </h3>
              <p className="max-h-80 overflow-x-auto text-gray-700">
                {post.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
