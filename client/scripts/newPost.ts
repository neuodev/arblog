import blog from "../src/data/blog.json";
import fs from "node:fs/promises";
import path from "node:path";
import dayjs from "dayjs";
import { exec } from "node:child_process";

const POSTS = "../src/posts";

async function main() {
  const slug = process.argv[2];
  const open = !!process.argv[3];
  if (!slug) throw new Error("Missing post slug");

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
  blog.posts.unshift(post);
  await fs.writeFile(
    path.join(__dirname, "../src/data/blog.json"),
    JSON.stringify(blog, null, 2)
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
