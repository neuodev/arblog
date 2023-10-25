import { GetStaticPropsContext } from "next";
import React from "react";
import { getPostBySlug } from "src/lib/posts";
import blog from "src/data/blog.json";

const Post: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="py-16 px-4">
      <div id="post" className="max-w-screen-md mx-auto">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Post;

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;
  if (!slug) throw new Error("Invalid or missing post slug");
  const content = await getPostBySlug(slug);

  return {
    props: { content },
  };
}

export async function getStaticPaths() {
  return {
    paths: blog.posts.map((post) => `/${post.slug}`),
    fallback: "blocking",
  };
}
