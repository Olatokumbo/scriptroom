import { v4 } from "uuid";
import { firestore } from "./config";
import { fileUpload } from "./storage";

export const getUserById = async (id: string) => {
  try {
    const snapshot = await firestore.collection("users").doc(id).get();
    if (!snapshot.exists) return null;
    return snapshot.data();
  } catch (error) {
    throw error;
  }
};

export const updateCoverPhoto = async (userId: string, coverPhoto: File) => {
  const coverURL = await fileUpload(coverPhoto as File, "profileCovers", v4());

  return await firestore.collection("users").doc(userId).update({
    coverURL,
  });
};
