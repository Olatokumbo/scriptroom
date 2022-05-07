import { v4 } from "uuid";
import firebase, { firestore } from "./config";
import { fileUpload } from "./storage";

interface IScriptDetails {
  title: string;
  author: string;
  description: string[];
  category: string;
  file: File | null;
  coverPhoto?: File | null;
}

interface UpdateScript extends Omit<IScriptDetails, "file"> {
  posterURL?: string;
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

export const scriptById2 = async (id: string) => {
  try {
    const script = await firestore.collection("scripts").doc(id).get();

    return JSON.stringify(script.data());
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

export const scriptsByProfileId = async (id: string) => {
  const scripts: firebase.firestore.DocumentData[] = [];
  try {
    const querySnapShot = await firestore
      .collection("scripts")
      .where("userId", "==", id)
      .get();

    querySnapShot.forEach((doc) => {
      scripts.push({ ...doc.data(), id: doc.id });
    });

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
      author: script.author,
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

    const posterURL = await fileUpload(
      script.coverPhoto as File,
      "covers",
      docRef.id
    );

    await firestore.collection("scripts").doc(docRef.id).update({
      scriptURL,
      posterURL,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateScript = async (id: string, script: UpdateScript) => {
  const posterURL = script.coverPhoto
    ? await fileUpload(script.coverPhoto as File, "covers", v4())
    : script.posterURL;
  delete script.coverPhoto;

  await firestore
    .collection("scripts")
    .doc(id)
    .update({
      ...script,
      posterURL,
    });
};

export const deleteScript = async (id: string) => {
  await firestore.collection("scripts").doc(id).delete();
};

export const listScripts = async () => {
  try {
    const querySnapShot = await firestore
      .collection("scripts")
      .orderBy("date", "desc")
      .get();

    const scripts = await addUser(querySnapShot.docs);
    return scripts;
  } catch (error) {
    throw error;
  }
};
