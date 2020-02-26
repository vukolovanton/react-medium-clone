import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/currentUser";
import ArticleForm from "../components/articleForm";

const CreateArticle = () => {
  const apiUrl = "/articles";
  const [{ response, error}, doFetch ] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);

  const onSubmit = article => {
    doFetch({
      method: "post",
      data: { article }
    });
  };

  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: []
  };

  const [isSucceeded, setIsSucceeded] = useState(false);

  useEffect(() => {
    if (!response) {
      return;
    }
    setIsSucceeded(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
      return <Redirect to="/"></Redirect>
  }

  if (isSucceeded) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  );
};

export default CreateArticle;
