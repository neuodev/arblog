import fs from "node:fs/promises";
import path from "node:path";
import marked from "marked";
import blog from "src/data/blog.json";
import assert from "node:assert";
import { isProd } from "./env";
import { markedRenderer } from "./md-renderer";

// note: this fille will be used from '.next/server'
const POSTS_DIR = path.join(__dirname, "../../../src/posts");

marked.use({ renderer: markedRenderer });

export type Post = {
  slug: string;
  filename: string;
  published: boolean;
  header: string;
  preview: string;
  html: string;
};

async function readPostFile(filename: string): Promise<string> {
  const buffer = await fs.readFile(path.join(POSTS_DIR, filename));
  const content = buffer.toString();
  return content.replace(/\u200f|\u200B|\u200D|\u200E|\uFEFF/g, "");
}

async function loadPostInfo(
  post: (typeof blog.posts)[0]
): Promise<Omit<Post, "html">> {
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
    preview: marked.parse(preview.raw),
  };
}

export async function getPosts(): Promise<Array<Omit<Post, "html">>> {
  const posts = await Promise.all(
    blog.posts
      .filter((post) => (isProd() ? post.published : true))
      .map(loadPostInfo)
  );

  return posts;
}

export async function getPostBySlug(
  slug: string
): Promise<Post & { html: string }> {
  const post = blog.posts.find((p) => p.slug == slug);
  if (!post) throw new Error(`Post not found: ${slug}`);
  const postInfo = await loadPostInfo(post);
  const content = await readPostFile(post.filename);
  const html = marked.parse(content);
  return {
    ...postInfo,
    html,
  };
}
