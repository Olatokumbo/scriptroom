import firebase, { firestore } from "./config";
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
