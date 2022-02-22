import { atom } from "recoil";

type AtomObject = {
  email: null | string;
  displayName: null | string;
  photoURL: null | string;
  uid: null | string;
  auth: boolean;
  loading: boolean;
};

export const userState = atom<AtomObject>({
  key: "user",
  default: {
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
    auth: false,
    loading: true,
  },
});
