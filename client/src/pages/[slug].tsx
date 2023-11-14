import { GetStaticPropsContext, Metadata } from "next";
import React from "react";
import { Post, getPostBySlug } from "src/lib/posts";
import blog from "src/data/blog.json";
import text from "src/data/text.json";
import Link from "next/link";
import { isProd } from "src/lib/env";
import AboutMe from "src/app/components/AboutMe";
import Head from "next/head";
import NewsLetter from "src/app/components/NewsLetter";

const Post: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      <Head>
        <title>
          {post.header} | {text.ahmedIbrahim}
          <meta property="og:title" content={post.header} />
          <meta property="og:description" content={post.preview.raw} />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="ar_AA" />
        </title>
      </Head>
      <div className="py-16 px-4 max-w-screen-md mx-auto">
        <div className="mb-4">
          <Link href="/" className="btn inline-block mb-4">
            {text.backToHome}
          </Link>
        </div>
        <div id="post">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>

        <div className="flex flex-col gap-8 my-20">
          <AboutMe />
          <NewsLetter />
        </div>
      </div>
    </>
  );
};

export default Post;

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const slug = context.params?.slug;
  if (!slug) throw new Error("Invalid or missing post slug");
  const post = await getPostBySlug(slug);

  return {
    props: { post },
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
