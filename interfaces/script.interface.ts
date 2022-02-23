export interface IScript {
  id: string;
  title: string;
  description: string[];
  userId: string;
  posterURL?: string;
  scriptURL: string;
  category: string;
  date: firebase.default.firestore.Timestamp;
  user: {
    photoURL: string;
    displayName: string;
  };
}
