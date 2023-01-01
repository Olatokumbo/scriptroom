export type User = {
  email: string;
  displayName: string;
  emailVerified: boolean;
  phoneNumber: number;
  photoURL: string;
  joined: firebase.default.firestore.Timestamp;
  description: string;
  coverURL: string;
};
