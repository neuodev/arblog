import React from "react";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import text from "../data/text.json";
import { Tailwind } from "@react-email/tailwind";
import { Font } from "@react-email/font";
import { Head } from "@react-email/head";

export function NewPostTemplate({
  header,
  body,
  link,
}: {
  header: string;
  body: string;
  link: string;
}) {
  return (
    <Tailwind>
      <Html lang="ar" dir="rtl">
        <Head>
          <Font
            fontFamily="Noto Kufi Arabic"
            fallbackFontFamily="sans-serif"
            webFont={{
              url: "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap",
              format: "embedded-opentype",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Text className="text-4xl font-bold mb-8 text-gray-800" dir="rtl">
          {header}
        </Text>
        <div dir="rtl" className="flex items-center justify-end">
          <div
            className="text-gray-800 text-base font-medium max-w-screen-md"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
        <Text dir="rtl">
          <Button
            className="px-2 py-2 bg-gray-300 text-gray-600 inline-block font-bold rounded-md"
            href={link}
            dir="rtl"
          >
            {text.readPost}
          </Button>
        </Text>
      </Html>
    </Tailwind>
  );
}

export default NewPostTemplate;
