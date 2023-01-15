import algoliasearch from "algoliasearch";
import { ALGOLIA_ID, ALGOLIA_ADMIN_KEY } from "../../config";

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

/**
 * Creates an Algolia Object 
 * @param indexName Name of the index category
 * @param object Object to be uploaded to algolia
 */
export const createAlgoliaObject = async (indexName: string, object: any) => {
  const index = client.initIndex(indexName);
  return index.saveObject(object);
};

/**
 * Updates an Algolia Object 
 * @param indexName Name of the index category
 * @param object Object to be updated within algolia
 */
export const updateAlgoliaObject = async (indexName: string, object: any) => {
  const index = client.initIndex(indexName);
  return index.partialUpdateObject(object);
};

/**
 * Deletes a Algolia Object 
 * @param indexName Name of the index category
 * @param id Id of the Algolia object that is to be deleted
 */
export const deleteAlgoliaObject = async (indexName: string, id: string) => {
  const index = client.initIndex(indexName);
  return index.deleteObject(id);
};
