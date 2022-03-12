// import * as PdfKit from "pdfkit";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { randomUUID } from "crypto";
import { File } from "@google-cloud/storage";
import { createAlgoliaObject, deleteAlgoliaObject } from "./algolia";

interface ApiError {
  code: number;
  error: string;
}

function isApiError(x: any): x is ApiError {
  return typeof x.code === "number";
}

// const getSignedUrl = (file: File) =>
//   file.getSignedUrl({
//     version: "v4",
//     action: "read",
//     expires: Date.now() + 24 * 60 * 60 * 1000,
//   });

const deleteFile = (file: File) => file.delete();

// const createAndUploadPdf = (file: File, data: any) =>
//   new Promise<void>((resolve, reject) => {
//     const doc = new PdfKit();
//     const writeStream = file.createWriteStream({
//       resumable: false,
//       contentType: "application/pdf",
//     });
//     writeStream.on("finish", () => resolve());
//     writeStream.on("error", (e: any) => reject(e));

//     doc.pipe(writeStream);

//     doc
//       .fontSize(22)
//       .font("Courier")
//       .text(data.title)
//       .fontSize(16)
//       .moveDown(1)
//       .text(data.author)
//       .moveDown(1);

//     data.body.map((t: any) =>
//       doc.moveDown(0.8).fontSize(17).font("Courier").text(t)
//     );

//     doc.end();
//   });

const getFileRef = async (id: string) => {
  return admin.storage().bucket().file(`scripts/${id}.pdf`);
};

// export const getPDFScript = functions.https.onCall(async (data, _context) => {
//   try {
//     functions.logger.info(data);
//     const file = await getFileRef(data.id);

//     const [exists] = await file.exists();
//     if (exists) {
//       const url = await getSignedUrl(file);
//       return { url };
//     }
//     throw Error("Not Found");
//   } catch (error) {
//     if (isApiError(error)) {
//       console.log(error);
//     }
//   }
// });

export const createScript = functions.firestore
  .document("scripts/{scriptId}")
  .onCreate(async (snap, context) => {
    try {
      const script = snap.data();
      script.objectID = context.params.scriptId;

      return createAlgoliaObject("scripts", script);
    } catch (error) {
      if (isApiError(error)) {
        console.log(error);
      }
    }
  });

export const deleteScript = functions.firestore
  .document("scripts/{scriptId}")
  .onDelete(async (_snap, context) => {
    try {
      const file = await getFileRef(context.params.scriptId);
      const [exists] = await file.exists();
      if (exists) {
        await deleteFile(file);
      }

      return deleteAlgoliaObject("scripts", context.params.scriptId);
    } catch (error) {
      if (isApiError(error)) {
        console.log(error);
      }
    }
  });
