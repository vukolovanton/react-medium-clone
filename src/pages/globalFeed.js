import React, { useEffect, Fragment } from "react";
import Feed from "../components/feed";
import useFetch from "../hooks/useFetch";
import Pagination from "../components/pagination";
import { getPaginator, limit } from "../utils";
import { stringify } from "query-string";
import PopularTags from '../components/popularTags';

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.serach);
  const stringifiedParams = stringify({ limit, offset });
  const apiUrl = `/articles?${stringifiedParams}`;
  const currentUrl = match.url;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [currentPage, doFetch]);

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium Clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <Fragment>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={currentUrl}
                  currentPage={currentPage}
                ></Pagination>
              </Fragment>
            )}
          </div>
          <div className="col-md-3"><PopularTags/></div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
