import { firestore } from "firebase-admin";
import { useState, useEffect } from "react";
import { firestore as db } from "../firebase/config";

const useFetchComments = (id?: string) => {
  const [comments, setComments] = useState<firestore.DocumentData[]>([]);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = db
      .collection("comments")
      .where("scriptId", "==", id)
      .orderBy("date", "asc")
      .onSnapshot(async (snap) => {
        const data = snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          authorRef: doc.data().authorRef,
        }));
        const newData = data.map(async (doc) => {
          const user = await doc.authorRef.get();
          return {
            ...doc,
            user: { ...user.data(), id: user.id },
          };
        });
        Promise.all(newData).then((data) => {
          setComments(data);
        });
      });

    return () => unsubscribe();
  }, []);

  return comments;
};

export default useFetchComments;
