import React from "react";
import articles from "./sample-articles";
import AllArticles from "../components/ArticlesList";

const ArticlesList = () => {
  return (
    <>
      <h1>Articles List</h1>
      <AllArticles articles={articles} />
    </>
  );
};

export default ArticlesList;
