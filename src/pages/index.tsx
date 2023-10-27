import { Post, getPosts } from "src/lib/posts";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import text from "src/data/text.json";
import AboutMe from "src/app/components/AboutMe";
import { isDev } from "src/lib/env";

export const metadata: Metadata = {
  title: "My Posts",
};

const Home: React.FC<{ posts: Array<Post> }> = ({ posts }) => {
  return (
    <main className="max-w-screen-md mx-auto py-12 px-4">
      <div className="mb-16">
        <AboutMe />
      </div>

      {posts.map((post) => (
        <div
          key={post.slug}
          className="mb-8 shadow-xl p-4 rounded-lg ring-2 ring-gray-200 hover:bg-gray-100 transition-colors"
        >
          <Link href={post.slug} className="block text-2xl font-bold mb-3 link">
            {post.header}
          </Link>
          <div>
            <p className="inline">{post.preview}...</p>
            <Link className="link" href={post.slug}>
              <span>{text.more}</span>
            </Link>
          </div>

          {isDev() && !post.published && (
            <div className="mt-4">
              <span className="bg-amber-100 text-amber-500 px-2 py-1 rounded-full text-sm">
                {text.notPublished}
              </span>
            </div>
          )}
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
