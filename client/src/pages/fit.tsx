import React from "react";
import text from "../data/text.json";
import Head from "next/head";

const Fit: React.FC = () => {
  return (
    <>
      <Head>
        <title>{text.pages.fit.title}</title>
        <meta property="og:title" content={text.pages.fit.title} />
        <meta property="og:description" content={text.pages.fit.subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ar_AA" />
      </Head>
      <div className="max-w-screen-md mx-auto py-16 px-4">
        <h1 className="text-center text-6xl font-bold mb-5 underline">
          &quot;{text.pages.fit.title}&quot;
        </h1>
        <h3 className="text-center italic mb-5 text">
          {text.pages.fit.subtitle}
        </h3>
        <p className="leading-loose">{text.pages.fit.description}</p>
      </div>
    </>
  );
};

export default Fit;
