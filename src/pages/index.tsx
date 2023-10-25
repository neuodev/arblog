import { Post, getPosts } from "src/lib/posts";
import React, { useCallback } from "react";

const Home: React.FC<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <main className="">
      <div dangerouslySetInnerHTML={{ __html: posts[0].body }} />
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}
