import React from "react";
import Layout from "src/app/components/Layout";
import { AppProps } from "next/app";
import "src/app/globals.css";
import { Post, getPosts } from "src/lib/posts";

const App: React.FC<AppProps & { posts: Post[] }> = ({
  Component,
  pageProps,
  posts,
}) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
