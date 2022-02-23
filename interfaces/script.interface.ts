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
    id?: string;
    photoURL: string;
    displayName: string;
    description?: string;
  };
}
