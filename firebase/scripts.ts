import firebase, { firestore } from "./config";
import { fileUpload } from "./storage";

export const scriptsByCategory = async (category: string) => {
  const scripts: firebase.firestore.DocumentData[] = [];
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

interface IScriptDetails {
  title: string;
  author: string;
  description: string[];
  category: string;
  file: File | null;
}

// export const createScript = async (script: IScriptDetails) => {
//   try {
//     const docRef = await firestore.collection("scripts").add({
//       ...script,
//       created: firebase.firestore.FieldValue.serverTimestamp(),
//     });

//     return docRef.get();
//   } catch (error: any) {
//     alert(error.message);
//   }
// };

export const uploadScript = async (script: IScriptDetails) => {
  try {
    const docRef = await firestore.collection("scripts").add({
      title: script.title,
      description: script.description,
      category: script.category,
      authorRef: firestore.doc(`/users/${firebase.auth().currentUser?.uid}`),
      scriptURL: null,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const scriptURL = await fileUpload(
      script.file as File,
      "scripts",
      docRef.id
    );
    await firestore.collection("scripts").doc(docRef.id).update({
      scriptURL,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
