import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/v1/auth";

export const newUser = functions.auth.user().onCreate((user) => {
    return addUser(user);
  });
  
  const addUser = (user: UserRecord) => {
    return admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .create({
        email: user.email,
        displayName: user.email?.split("@")[0],
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        joined: admin.firestore.FieldValue.serverTimestamp(),
        description: ""
      })
      .then(() => functions.logger.info("New User has been Added"))
      .catch((err) => Error(err.message));
  };