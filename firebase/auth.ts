import { googleProvider, auth } from "./config";

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
