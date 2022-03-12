import { useEffect, useState } from "react";
import algoliasearch from "algoliasearch";

const useAlgoliaSearch = (indexName: string, keyword: string) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  var client = algoliasearch(
    process.env.NEXT_PUBLIC__ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC__ALGOLIA_SEARCH_KEY!
  );
  var index = client.initIndex(indexName);
  useEffect(() => {
    if (keyword) {
      const unauthenticated_search = async (query: string) => {
        setLoading(true);
        await index
          .search(query)
          .then((responses) => {
            setResults(responses.hits);
            setLoading(false);
            setNotFound(false);
            if (responses.hits.length === 0) setNotFound(true);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      unauthenticated_search(keyword);
    }
  }, [keyword]);
  return { loading, results, notFound };
};

export default useAlgoliaSearch;
