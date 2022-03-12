import algoliasearch from "algoliasearch";
import { ALGOLIA_ID, ALGOLIA_ADMIN_KEY } from "../../config";

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

export const createAlgoliaObject = async (indexName: string, script: any) => {
  const index = client.initIndex(indexName);
  return index.saveObject(script);
};

export const updateAlgoliaObject = async (indexName: string, script: any) => {
  const index = client.initIndex(indexName);
  return index.partialUpdateObject(script);
};

export const deleteAlgoliaObject = async (indexName: string, id: string) => {
  const index = client.initIndex(indexName);
  return index.deleteObject(id);
};
