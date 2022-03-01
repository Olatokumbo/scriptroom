import firebase, { firestore } from "./config";
import { fileUpload } from "./storage";

interface IScriptDetails {
  title: string;
  author: string;
  description: string[];
  category: string;
  file: File | null;
}

export const scriptsByCategory = async (category: string) => {
  try {
    const querySnapShot = await firestore
      .collection("scripts")
      .where("category", "==", category)
      .get();

    const scripts = await addUser(querySnapShot.docs);
    return scripts;
  } catch (error) {
    throw error;
  }
};

const addUser = async (docs: firebase.firestore.DocumentData[]) => {
  const document: firebase.firestore.DocumentData[] = [];
  await Promise.all(
    docs.map(async (doc) => {
      const docRef = await doc.data();
      const user = await docRef.authorRef.get();
      document.push({ ...docRef, id: doc.id, user: user.data() });
    })
  );
  return document;
};

export const scriptById = async (id: string) => {
  try {
    const doc = await firestore.collection("scripts").doc(id).get();
    const user = await doc.data()?.authorRef.get();
    return JSON.stringify({
      ...doc.data(),
      id: doc.id,
      user: { ...user.data(), id: user.id },
    });
  } catch (error) {
    throw error;
  }
};

export const scriptsByUserId = async (userId: string) => {
  try {
    const querySnapShot = await firestore
      .collection("scripts")
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .get();

    const scripts = await addUser(querySnapShot.docs);
    return scripts;
  } catch (error) {
    throw error;
  }
};

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
    const userId = firebase.auth().currentUser?.uid;
    const docRef = await firestore.collection("scripts").add({
      title: script.title,
      description: script.description,
      category: script.category,
      userId,
      authorRef: firestore.doc(`/users/${userId}`),
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

// export const listScriptId = async () => {
//   const Id = await firestore.collection("scripts").withConverter
// };
