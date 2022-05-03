import Head from "next/head";
import CategoryList from "../../../components/CategoryList";
import Layout from "../../../components/Layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { scriptById } from "../../../firebase/scripts";
import { ParsedUrlQuery } from "querystring";
import { IScript } from "../../../interfaces/script.interface";
import { useRouter } from "next/router";
import { EyeIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import * as admin from "firebase-admin";
import { getCategoryColor } from "../../../utils/getCategoryColor";
import CommentCard from "../../../components/CommentCard";
import { createComment } from "../../../firebase/comment";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/user";
import { useState } from "react";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IScriptInfo {
  script: IScript;
}

const ScriptInfo: NextPage<IScriptInfo> = ({ script }) => {
  const { uid } = useRecoilValue(userState);
  const {
    query: { id },
    isFallback,
  } = useRouter();

  const [comment, setComment] = useState<string>("");

  const viewPdf = async () => {
    return window.open(script.scriptURL, "_blank");
  };
  if (isFallback) {
    return <div>Loading...</div>;
  }

  const addComment = async (e: any) => {
    e.preventDefault();
    try {
      if (uid) {
        await createComment(uid, id as string, comment);
        setComment("");
        alert("Comment Sent");
      }
    } catch (error) {
      alert(error)
    }
  };
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
              src={script?.posterURL ?? `https://source.unsplash.com/random`}
            />
            <div
              className={`w-full h-2 rounded-b-md ${getCategoryColor(
                script.category
              )} `}
            ></div>
            <div className="flex justify-between w-full items-center my-3">
              <h1 className="font-bold text-2xl text-[#36395A]">
                {script?.title}
              </h1>
              <button
                onClick={viewPdf}
                className="flex px-6 py-3 rounded-md bg-[#36395A]  hover:bg-slate-800 text-white text-sm font-normal uppercase focus:outline-none"
              >
                <EyeIcon width={20} height={20} className="mr-1" /> View
              </button>
            </div>
            <div>
              <h1 className="font-medium">Description</h1>
              {script?.description?.map((body, index) => (
                <p
                  key={index}
                  className="text-gray-600 text-sm my-1 pt-[2px] text-justify"
                >
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
            <div className="bg-neutral-100 my-5 rounded-md p-3">
              <h1 className="font-semibold text-gray text-sm mb-3">Comments</h1>
              <div className="max-h-80 overflow-auto">
                <CommentCard />
                <CommentCard />
                <CommentCard />
                <CommentCard />
              </div>
              <form className="w-full max-w-sm" onSubmit={addComment}>
                <div className="flex items-center pt-2 pb-1">
                  <input
                    className="bg-white rounded-md appearance-none border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Write a Comment..."
                    aria-label="Full name"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-md"
                    type="submit"
                  >
                    <PaperAirplaneIcon
                      width={18}
                      height={18}
                      className="rotate-45"
                    />
                  </button>
                </div>
              </form>
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
