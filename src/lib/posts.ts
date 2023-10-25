import fs from "node:fs/promises";
import path from "node:path";
import marked from "marked";
import fm from "front-matter";
import blog from "src/data/blog.json";
import assert from "node:assert";

// note: this fille will be used from '.next/server'
const POSTS_DIR = path.join(__dirname, "../../../src/posts");

type Attributes = {
  title: string;
};

export type Post = {
  id: number;
  body: string;
  title: string;
};

export type IPost = {
  slug: string;
  filename: string;
  header: string;
  preview: string;
};

async function readPostFile(filename: string): Promise<string> {
  const buffer = await fs.readFile(path.join(POSTS_DIR, filename));
  const content = buffer.toString();
  return content.replace(/\u200f|\u200B|\u200D|\u200E|\uFEFF/gim, "");
}

// 1. use slug
// 2. render posts
// 3. render post
// 4. about me

export async function getPosts(): Promise<Array<IPost>> {
  const posts = await Promise.all(
    blog.posts.map(async (post) => {
      const content = await readPostFile(post.filename);
      const ast = marked.lexer(content);
      // 1st token MUST be "heading"
      // 2nd token MUST be "paragraph"
      const [header, preview] = ast;

      assert(
        header.type === "heading",
        `Unexpecting token: ${header.type}, expecting "heading"`
      );

      assert(
        preview.type === "paragraph",
        `Unexpecting token: ${preview.type}, expecting "paragraph"`
      );

      return {
        slug: post.slug,
        filename: post.filename,
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
