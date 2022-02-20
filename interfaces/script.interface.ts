export interface IScript {
  id: string;
  title: string;
  description: string[];
  userId: string;
  posterURL: string;
  category: string;
  created: firebase.default.firestore.Timestamp;
}
