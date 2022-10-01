import * as admin from "firebase-admin";
import * as serviceAccount from "../script-room-firebase-adminsdk-u2n71-8f5cd370f1.json";
import { newUser } from "./services/user";
import { createScript, deleteScript, updateScript } from "./services/script";
import { createStripeCheckout } from "./services/stripe";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "script-room.appspot.com",
});

export {
  newUser,
  createScript,
  deleteScript,
  updateScript,
  createStripeCheckout,
};
