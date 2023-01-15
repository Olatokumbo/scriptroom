import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { File } from "@google-cloud/storage";
import {
  createAlgoliaObject,
  deleteAlgoliaObject,
  updateAlgoliaObject,
} from "./algolia";
import { isApiError } from "../utils/error";

/**
 * Delete Script file from Firebase storage
 * @param file 
 */
const deleteFile = (file: File) => file.delete();

/**
 * Get Storage File reference
 * @param id File ID
 */
const getFileRef = async (id: string) => {
  return admin.storage().bucket().file(`scripts/${id}.pdf`);
};


/**
 * Creates a script
 */
export const createScript = functions.firestore
  .document("scripts/{scriptId}")
  .onCreate(async (snap, context) => {
    try {
      const script = snap.data();
      script.objectID = context.params.scriptId;

      return createAlgoliaObject("scripts", script);
    } catch (error) {
      if (isApiError(error)) {
        console.error(error);
      }
    }
  });

/**
 * Deletes a script
 */
export const deleteScript = functions.firestore
  .document("scripts/{scriptId}")
  .onDelete(async (_snap, context) => {
    try {
      const file = await getFileRef(context.params.scriptId);
      const [exists] = await file.exists();
      if (exists) {
        await deleteFile(file);
      }

      return deleteAlgoliaObject("scripts", context.params.scriptId);
    } catch (error) {
      if (isApiError(error)) {
        console.error(error);
      }
    }
  });


/**
 * Updates a script
 */
export const updateScript = functions.firestore
  .document("scripts/{scriptId}")
  .onUpdate(async (change, context) => {
    try {
      const script = change.after.data();
      script.objectID = context.params.scriptId;

      return updateAlgoliaObject("scripts", script);
    } catch (error) {
      if (isApiError(error)) {
        console.error(error);
      }
    }
  });
