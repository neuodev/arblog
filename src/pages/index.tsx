import { IPost, Post, getPosts } from "src/lib/posts";
import React, { useCallback } from "react";

const Home: React.FC<{ posts: Array<IPost> }> = ({ posts }) => {
  return (
    <main className="">
      {posts.map((post) => (
        <div key={post.slug}>
          <h1>{post.header}</h1>
          <p>{post.preview}</p>
        </div>
      ))}
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
