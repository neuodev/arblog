import posts from "../src/data/blog.json";
import fs from "node:fs/promises";
import path from "node:path";
import dayjs from "dayjs";
import { exec } from "node:child_process";

const POSTS = "../src/posts";
const PUBLIC_POSTS_LIST = "../src/data/blog.json";

function getOps(): {
  slug: string;
  open: boolean;
} {
  const args = process.argv;
  const slug = args[2];
  if (!slug) throw new Error("Missing post slug");

  const open = args.some((arg) => ["open", "-o", "--open"].includes(arg));

  return {
    slug,
    open,
  };
}

async function main() {
  const { slug, open } = getOps();

  const filename = slug.concat(".md");
  const filePath = path.join(__dirname, POSTS, filename);

  await fs.writeFile(
    filePath,
    [`# new::post::${slug}`, "happy writing!!"].join("\n\n")
  );

  const post = {
    slug,
    filename,
    published: false,
    createdAt: dayjs().format("MMM D, YYYY"),
  };

  posts.posts.unshift(post);

  await fs.writeFile(
    path.join(__dirname, PUBLIC_POSTS_LIST),
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
