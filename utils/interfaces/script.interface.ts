export interface IScript {
  id: string;
  objectID?: string;
  title: string;
  description: string[];
  userId: string;
  posterURL?: string;
  scriptURL: string;
  category: string;
  author: string;
  date: firebase.default.firestore.Timestamp;
  user: {
    id?: string;
    photoURL: string;
    displayName: string;
    description?: string;
  };
}
