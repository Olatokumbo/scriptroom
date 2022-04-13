import Head from "next/head";
import CategoryList from "../../../components/CategoryList";
import Layout from "../../../components/Layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { scriptById } from "../../../firebase/scripts";
import { ParsedUrlQuery } from "querystring";
import { IScript } from "../../../interfaces/script.interface";
import { useRouter } from "next/router";
import scripts from "../../api/scripts";
import axios from "axios";
import * as admin from "firebase-admin";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IScriptInfo {
  script: IScript;
}

const ScriptInfo: NextPage<IScriptInfo> = ({ script }) => {
  const {
    query: { id },
    isFallback,
  } = useRouter();

  const viewPdf = async () => {
    return window.open(script.scriptURL, "_blank");
  };
  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Script | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList />
        <div className="flex p-3 flex-col md:flex-row max-w-6xl m-auto">
          <div className="flex-2 bg-neutral-100 p-3 md:p-8 m-0 md:m-5  rounded-md">
            <img
              className="h-32 object-cover w-full rounded-t-md"
              src={
                script?.posterURL ?? `https://source.unsplash.com/random`
                // "https://firebasestorage.googleapis.com/v0/b/script-room.appspot.com/o/ab1310c11f5f280ace9523f896ac1d56.jpg?alt=media&token=b2a510f3-0b30-4909-99b5-463141175e5f"
              }
            />
            <div className="flex justify-between w-full items-center my-3">
              <h1 className="font-bold text-2xl text-[#36395A]">
                {script?.title}
              </h1>
              <button
                onClick={viewPdf}
                className="px-6 py-2 rounded-md bg-[#36395A]  hover:bg-slate-800 text-white text-sm font-normal uppercase focus:outline-none"
              >
                View
              </button>
            </div>
            <div>
              <h1 className="font-medium">Description</h1>
              {script?.description?.map((body, index) => (
                <p key={index} className="text-gray-600 text-sm my-1">
                  {body}
                </p>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-neutral-100 my-5 rounded-md p-5 h-fit flex items-baseline">
              <h1 className="font-semibold text-gray-600 mr-1">Author:</h1>
              <h1 className="font-semibold text-[#36395A]">{script.author}</h1>
            </div>
            <div className="bg-neutral-100 my-5 rounded-md p-5 h-fit">
              <h1 className="font-semibold text-[#36395A]">Posted By</h1>
              <Link href={`/profile/${script.user.id}`}>
                <div className="flex flex-col items-center my-2">
                  <img
                    src={script.user.photoURL}
                    className="w-20 h-20 object-cover rounded-full"
                  />
                  <h1 className="font-medium">{script.user.displayName}</h1>
                </div>
              </Link>
              <p className="text-gray-600 text-xs my-1">
                {script.user.description && script.user.description}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ScriptInfo;

export const getStaticPaths: GetStaticPaths = async () => {
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

  const collectionRef = admin.firestore().collection("scripts");

  const docs = await collectionRef.listDocuments();

  let paths = docs.map((doc: any) => ({ params: { id: doc.id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let script;

  const { id } = context.params as IParams;
  try {
    script = await scriptById(id);
    script = JSON.parse(script);
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      script,
    },
    revalidate: 1,
  };
};

// const d = await scripts()
// const scripts = await axios.get("/api/scripts", {
//   headers: {
//     Authorization: `Bearer ${process.env.FIREBASE_PRIVATE_KEY_ID}`,
//   },
// });

// const scriptsIds: string[] = await scripts.data.ids;
