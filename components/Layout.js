import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Footer from "./Footer";

export default props => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/semantic.min.css"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-118444101-2"
        />
        <script async src="/static/ga.js" />
      </Head>
      <Header />
      {props.children}
      <Footer />
    </Container>
  );
};
