import { GetStaticPropsContext } from "next";
import React from "react";
import { getPostBySlug } from "src/lib/posts";
import blog from "src/data/blog.json";
import text from "src/data/text.json";
import Link from "next/link";
import { isProd } from "src/lib/env";
import AboutMe from "src/app/components/AboutMe";

const Post: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="py-16 px-4 max-w-screen-md mx-auto">
      <div className="mb-4">
        <Link href="/" className="btn-light inline-block mb-4">
          {text.backToHome}
        </Link>
      </div>
      <div id="post">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div className="my-20">
        <AboutMe />
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
    paths: blog.posts
      .filter((post) => (isProd() ? post.published : true))
      .map((post) => `/${post.slug}`),
    fallback: "blocking",
  };
}
