import { GetStaticPropsContext } from "next";
import React from "react";
import { Post, getPostById } from "src/lib/posts";
import Image from "next/image";

const Post: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div>
      <div id="post" className="max-w-screen-md mx-auto">
        <h1 className="mt-8">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
    </div>
  );
};

export default Post;

export async function getStaticProps(
  context: GetStaticPropsContext<{ postId: string }>
) {
  const postId = Number(context.params?.postId);
  if (Number.isNaN(postId)) throw new Error("Invalid or missing post id");
  const post = await getPostById(postId);

  return {
    props: { post },
  };
}

export async function getStaticPaths() {
  return {
    paths: ["/1"],
    fallback: "blocking",
  };
}
