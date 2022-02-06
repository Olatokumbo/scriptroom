import { atom } from "recoil";

type AtomObject = {
  email: null | string;
  photoURL: null | string;
  uid: null | string;
  auth: boolean;
};

export const userState = atom<AtomObject>({
  key: "user",
  default: {
    email: null,
    photoURL: null,
    uid: null,
    auth: false,
  },
});
