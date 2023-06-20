import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./sample-articles";
import NotFound from "./NotFound";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const Article = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvote: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authToken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFound />;
  }
  return (
    <div>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>There are currently {articleInfo.upvote} upvotes.</p>
      </div>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log in to add a comment.</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </div>
  );
};

export default Article;
