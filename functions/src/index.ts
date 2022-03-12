import * as admin from "firebase-admin";
import * as serviceAccount from "../script-room-firebase-adminsdk-u2n71-8f5cd370f1.json";
import { newUser } from "./services/user";
import { createScript, deleteScript } from "./services/script";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "script-room.appspot.com",
});

export { newUser, createScript, deleteScript };
