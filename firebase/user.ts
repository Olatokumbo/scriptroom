import { v4 } from "uuid";
import { User } from "../utils/types";
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
  const coverURL = await fileUpload(coverPhoto, "profileCovers", v4());

  return await firestore.collection("users").doc(userId).update({
    coverURL,
  });
};

export const updateProfile = async (id: string, user: Partial<User>) => {
  return firestore
    .collection("users")
    .doc(id)
    .update({ ...user });
};
