import publicPosts from "../src/data/blog.json";
import privatePosts from "../src/data/blog.private.json";
import fs from "node:fs/promises";
import path from "node:path";
import dayjs from "dayjs";
import { exec } from "node:child_process";

const POSTS = "../src/posts";
const PRIVATE_POSTS_LIST = "../src/data/blog.private.json";
const PUBLIC_POSTS_LIST = "../src/data/blog.json";

function getOps(): {
  slug: string;
  open: boolean;
  isPrivate: boolean;
} {
  const args = process.argv;
  const slug = args[2];
  if (!slug) throw new Error("Missing post slug");

  const open = !!args.find((arg) => arg === "open" || "-o" || "--open");
  const isPrivate = !!args.find(
    (arg) => arg === "private" || "--private" || "-p" || "--prv"
  );

  return {
    slug,
    open,
    isPrivate,
  };
}

async function main() {
  const { slug, open, isPrivate } = getOps();

  const filename = isPrivate ? slug.concat(".private.md") : slug.concat(".md");
  const filePath = path.join(__dirname, POSTS, filename);

  await fs.writeFile(
    filePath,
    [`# new::post::${slug}`, "happy writing!!"].join("\n\n")
  );

  const posts = isPrivate ? privatePosts : publicPosts;

  const post = {
    slug,
    filename,
    published: false,
    createdAt: dayjs().format("MMM D, YYYY"),
  };

  posts.posts.unshift(post);

  await fs.writeFile(
    path.join(__dirname, isPrivate ? PRIVATE_POSTS_LIST : PUBLIC_POSTS_LIST),
    JSON.stringify(posts, null, 2)
  );

  if (open) exec(`open -a TextEdit ${filePath}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err instanceof Error ? err.message : err);
    process.exit(1);
  });
