import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as serviceAccount from "./script-room-firebase-adminsdk-u2n71-8f5cd370f1.json";

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   storageBucket: "script-room.appspot.com",
// });

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

module.exports = { ALGOLIA_ID, ALGOLIA_ADMIN_KEY}