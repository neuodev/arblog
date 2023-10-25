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
        `Unexpecting token: ${preview.type}, expecting "heading"`
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

export async function getPostById(id: number): Promise<Post> {
  const files = await fs.readdir(POSTS_DIR);
  let idx = id - 1;
  if (files.length <= idx) throw new Error(`"${id}" is not a valid file id`);

  const file = files[idx];

  const post: Post = await fs
    .readFile(path.join(POSTS_DIR, file))
    .then((buf) => buf.toString())
    .then((content) =>
      content.replace(/\u200f|\u200B|\u200D|\u200E|\uFEFF/gim, "")
    )
    .then((raw) => {
      const { attributes, body } = fm<Partial<Attributes>>(raw);
      const html = marked.parse(body);
      const { title } = attributes;

      if (!title) throw new Error("Missing a blog title");

      return {
        id,
        body: html,
        title,
      };
    });

  return post;
}
