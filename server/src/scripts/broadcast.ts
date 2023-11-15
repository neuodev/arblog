import "colors";
import path from "node:path";
import fs from "node:fs";
import Email from "../models/email";
import connectDB from "../config/db";
import marked from "marked";
import type { Tokens } from "marked";
import { render } from "@react-email/render";
import NewPostTemplate from "../templates/NewPost";
import { sendEmail } from "../services/email";

marked.use({
  renderer: {
    image(href, _title, text) {
      return `<img withd="600px" height="600px" src="https://ar.ahmedibrahim.dev/${href}" title="${text}"/>`;
    },
  },
});

function postAsHtml(slug: string): [string, string] {
  const postPath = path.join(
    __dirname,
    "../../../client",
    "src",
    "posts",
    slug + ".md"
  );

  const md = fs.readFileSync(postPath).toString("utf-8");
  const ast = marked.lexer(md);

  const [h1, p] = ast as unknown as [Tokens.Heading, Tokens.Paragraph];

  const html = render(
    NewPostTemplate({
      header: h1.text,
      body: marked.parse(p.raw),
      link: `https://ar.ahmedibrahim.dev/${slug}`,
    }),
    {
      pretty: true,
    }
  );

  return [html, h1.text];
}

async function main() {
  const postSlug = process.argv[2];
  if (!postSlug) throw new Error("post slug is required");

  await connectDB();
  const emails = await Email.find({ confirmed: true });
  const [html, title] = postAsHtml(postSlug);

  await Promise.all(
    emails.map(async ({ email }) => sendEmail(email, title, html))
  );

  console.log("Emails sent successfully".bgGreen.bold);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err instanceof Error ? err.message.bgRed : err);
  });
