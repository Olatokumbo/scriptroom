// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";

type Data = {
  ids?: string[];
  message?: string;
};

//Middleware Guard
const verifySecret = (handler: any) => {
  //TODO: Will modify this
  return async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).send({ message: "No token provided" });
    }
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
      res.status(401).json({ message: "Invalid token" });
    }

    const token = headerToken.split(" ")[1];

    if (token === process.env.FIREBASE_PRIVATE_KEY_ID) {
      return handler(req, res);
    } else return res.json({ message: "Invalid Secret Id" });
  };
};

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/gm, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;
  if (method === "GET") {
    const collectionRef = admin.firestore().collection("scripts");

    const docs = await collectionRef.listDocuments();
    const ids = docs.map((doc) => {
      return doc.id;
    });

    res.status(200).json({ ids });
  }
}

export default verifySecret(handler);
