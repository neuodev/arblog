import fs from "node:fs/promises";
import path from "node:path";
import marked from "marked";
import fm from "front-matter";
import blog from "src/data/blog.json";
import assert from "node:assert";
import { isProd } from "./env";

// note: this fille will be used from '.next/server'
const POSTS_DIR = path.join(__dirname, "../../../src/posts");

export type Post = {
  slug: string;
  filename: string;
  published: boolean;
  header: string;
  preview: string;
};

async function readPostFile(filename: string): Promise<string> {
  const buffer = await fs.readFile(path.join(POSTS_DIR, filename));
  const content = buffer.toString();
  return content.replace(/\u200f|\u200B|\u200D|\u200E|\uFEFF/g, "");
}

export async function getPosts(): Promise<Array<Post>> {
  const posts = await Promise.all(
    blog.posts
      .filter((post) => (isProd() ? post.published : true))
      .map(async (post) => {
        const content = await readPostFile(post.filename);
        const ast = marked.lexer(content);
        // 1st token MUST be "heading"
        // 2nd token MUST be "paragraph"
        const [header, preview] = ast;

        assert(
          header.type === "heading",
          `Unexpecting token: ${header.type}, expecting "heading" in ${post.filename}`
        );

        assert(
          preview.type === "paragraph",
          `Unexpecting token: ${preview.type}, expecting "paragraph" in ${post.filename}`
        );

        return {
          slug: post.slug,
          filename: post.filename,
          published: post.published,
          header: header.text,
          preview: preview.text,
        };
      })
  );

  return posts;
}

export async function getPostBySlug(slug: string) {
  const post = blog.posts.find((p) => p.slug == slug);
  if (!post) throw new Error(`Post not found: ${slug}`);
  const content = await readPostFile(post.filename);
  const html = marked.parse(content);
  return html;
}
