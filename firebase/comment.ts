import firebase, { firestore } from "./config";

/**
 * Creates a new Comment
 * @param userId User ID
 * @param scriptId Script ID
 * @param comment Comment string
 */
export const createComment = async (
  userId: string,
  scriptId: string,
  comment: string
) => {
  return firestore.collection("comments").add({
    authorRef: firestore.doc(`/users/${userId}`),
    scriptId,
    text: comment,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  });
};


/**
 * Finds all comments linked to a script document 
 * @param id Script ID
 */
export const findCommentsByScriptId = async (id: string) => {
  try {
    const comments: firebase.firestore.DocumentData[] = [];
    const querySnapShot = await firestore
      .collection("comments")
      .where("scriptId", "==", id)
      .get();

    querySnapShot.forEach(async (doc) => {
      const user = await doc.data()?.authorRef.get();
      comments.push({ ...doc.data(), id: doc.id, user });
    });

    return comments;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a comment
 * @param id Comment ID
 */
export const removeComment = async (id: string) => {
  try {
    return firestore.collection("comments").doc(id).delete();
  } catch (error) {
    throw error;
  }
};
