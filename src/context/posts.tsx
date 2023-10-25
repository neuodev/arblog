import { ReactElement, createContext, useContext, useMemo } from "react";
import { Post } from "src/lib/posts";

const PostsContext = createContext<Post[] | null>(null);

const PostsProvider: React.FC<{ posts: Post[]; children?: ReactElement }> = ({
  posts,
  children,
}) => {
  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export default PostsProvider;

export function usePosts(): Post[] {
  const ctx = useContext(PostsContext);

  if (ctx == null)
    throw new Error("Trying to use PostsContext outside the provider");

  return ctx;
}

export function usePostById(id: number): Post | null {
  const posts = usePosts();
  return posts.find((post) => post.id === id) ?? null;
}
