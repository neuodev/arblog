import fs from "node:fs/promises";
import path from "node:path";
import marked from "marked";
import fm from "front-matter";

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

export async function getPosts(): Promise<Array<Post>> {
  const files = await fs.readdir(POSTS_DIR);

  const posts: Array<Post> = await Promise.all(
    files.map(
      async (file, idx) =>
        await fs
          .readFile(path.join(POSTS_DIR, file))
          .then((buf) => buf.toString())
          .then((content) =>
            content.replace(/\u200f|\u200B|\u200D|\u200E|\uFEFF/gim, "")
          )
          .then((raw) => {
            const { attributes, body } = fm<Partial<Attributes>>(raw);
            const html = marked.parse(body);
            const title = attributes.title;

            if (!title) throw new Error("Missing a blog title");

            return {
              id: idx + 1,
              body: html,
              title,
            };
          })
    )
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
