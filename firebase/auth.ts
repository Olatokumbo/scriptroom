import { googleProvider, auth } from "./config";

/**
 * Google signup 
 */
export const signinGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      auth.currentUser?.updateProfile({
        displayName: result?.user?.email?.split("@")[0],
      });
    })
    .catch((error) => {
      alert(error.message);
    });
};

/**
 * Signs out a users
 */
export const signout = () => {
  return auth
    .signOut()
    .then(() => {})
    .catch((error) => {
      throw new Error(error.message);
    });
};
