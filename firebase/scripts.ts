import { firestore } from "./config";

export const scriptsByCategory = async (category: string) => {
  const scripts: firebase.default.firestore.DocumentData[] = [];
  try {
    const querySnapShot = await firestore
      .collection("scripts")
      .where("category", "==", category)
      .get();

    querySnapShot.forEach((doc) => {
      scripts.push({ ...doc.data(), id: doc.id });
    });

    return scripts;
  } catch (error) {
    throw error;
  }
};

export const scriptById = async (id: string) => {
  try {
    const doc = await firestore.collection("scripts").doc(id).get();
    return JSON.stringify({ ...doc.data(), id: doc.id });
  } catch (error) {
    throw error;
  }
};
