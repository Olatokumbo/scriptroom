import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/v1/auth";
import * as PdfKit from "pdfkit";
// import { randomUUID } from "crypto";
import { File } from "@google-cloud/storage";
import * as serviceAccount from "../script-room-firebase-adminsdk-u2n71-8f5cd370f1.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const getSignedUrl = (file: File) =>
  file.getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 24 * 60 * 60 * 1000,
  });

const createAndUploadPdf = (file: File) =>
  new Promise<void>((resolve, reject) => {
    const doc = new PdfKit();
    const writeStream = file.createWriteStream({
      resumable: false,
      contentType: "application/pdf",
    });
    writeStream.on("finish", () => resolve());
    writeStream.on("error", (e: any) => reject(e));

    doc.pipe(writeStream);

    doc
      .fontSize(24)
      .font("Courier")
      .text("Script")
      .fontSize(16)
      .moveDown(2)
      .text("This is your script");

    doc.end();
  });

const getFileRef = async () => {
  return admin.storage().bucket().file(`scripts/script-${123}.pdf`);
};

export const getPdfUrl = functions.region("us-central1").https.onCall(async (data, context) => {
  // try {

  console.log(data);
  functions.logger.info(data);
  const file = await getFileRef();

  const [exists] = await file.exists();
  if (exists) {
    const url = await getSignedUrl(file);
    return { url };
  }

  await createAndUploadPdf(file);
  const url = await getSignedUrl(file);
  return { url };
  // } catch (error) {
  //   console.log(error);
  //   functions.logger.error(error);
  // }
});

export const newUser = functions.auth.user().onCreate((user) => {
  return addUser(user);
});

const addUser = (user: UserRecord) => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .create({
      email: user.email,
      displayName: user.email?.split("@")[0],
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      joined: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => functions.logger.info("New User has been Added"))
    .catch((err) => Error(err.message));
};
