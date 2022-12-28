import Head from "next/head";
import CategoryList from "../../../components/CategoryList";
import Layout from "../../../components/Layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { scriptById } from "../../../firebase/scripts";
import { ParsedUrlQuery } from "querystring";
import { IScript } from "../../../interfaces/script.interface";
import { useRouter } from "next/router";
import { EyeIcon } from "@heroicons/react/outline";
import * as admin from "firebase-admin";
import { getCategoryColor } from "../../../utils/getCategoryColor";
import Comments from "../../../components/Comments";
import { PencilIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/user";
import Image from "next/image";
import getCategory from "../../../utils/getCategory";
import firebase from "../../../firebase/config";
import getStripe from "../../../utils/getStripe";
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
  const { uid, auth } = useRecoilValue(userState);

  const viewPdf = async () => {
    if (!auth) {
      alert("Please create an account to view this script");
      return;
    }
    return window.open(script.scriptURL, "_blank");
  };
  if (isFallback) {
    return <div>Loading...</div>;
  }

  // const checkout = async () => {
  //   const stripe = await getStripe();
  //   const createStripeCheckout = firebase
  //     .functions()
  //     .httpsCallable("createStripeCheckout");

  //   const origin =
  //     process.env.NODE_ENV === "production"
  //       ? "https://scriptroom.vercel.app"
  //       : "http://localhost:3000";

  //   createStripeCheckout({
  //     origin,
  //     title: script.title,
  //     price: 5,
  //   }).then(async (response) => {
  //     console.log(response);
  //     const { error } = await stripe!.redirectToCheckout({
  //       sessionId: response.data.id,
  //     });
  //   });
  // };

  return (
    <>
      <Head>
        <title>{script.title} | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList />
        <div className="flex p-3 flex-col md:flex-row max-w-6xl m-auto">
          <div className="flex-2 bg-neutral-100 p-3 md:p-8 m-0 md:m-5 rounded-md h-full">
            <img
              alt={script.title}
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
              <div className="flex">
                {/* <button onClick={checkout}>PAY UP</button> */}
                {uid === script.user.id && (
                  <Link href={`/scripts/${id}/edit`} passHref>
                    <div className=" group p-3 ml-0 xs:mr-2 rounded-full bg-gray-300 group-hover:bg-gray-400 hover:bg-gray-500  hover:cursor-pointer bg-opacity-60 transition ease-in-out">
                      <PencilIcon
                        width={25}
                        height={25}
                        className="text-slate-800 group-hover:text-white"
                      ></PencilIcon>
                    </div>
                  </Link>
                )}
                <button
                  onClick={viewPdf}
                  className="items-center flex px-6 py-3 rounded-md bg-[#36395A]  hover:bg-slate-800 text-white text-sm font-normal uppercase focus:outline-none"
                >
                  <EyeIcon width={20} height={20} className="mr-1" /> View
                </button>
              </div>
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
            <div className="bg-neutral-100 mt-5 mb-2 rounded-md p-3 h-fit flex items-baseline">
              <h1 className="font-semibold text-gray-600 mr-1">Author:</h1>
              <h1 className="font-semibold text-[#36395A]">{script.author}</h1>
            </div>
            <div className="bg-neutral-100 rounded-md p-3 h-fit flex items-baseline">
              <h1 className="font-semibold text-gray-600 mr-1">Category:</h1>
              <h1 className="font-semibold text-[#36395A]">
                {getCategory(script.category)}
              </h1>
            </div>
            <div className="bg-neutral-100 my-2 rounded-md p-3 h-fit">
              <h1 className="font-semibold text-[#36395A]">Posted By</h1>
              <Link href={`/profile/${script.user.id}`} passHref>
                <div className="flex flex-col items-center my-2 hover:cursor-pointer">
                  <div className="bg-slate-300 p-2 rounded-full flex items-center">
                    <Image
                      width={80}
                      height={80}
                      layout="fixed"
                      objectFit="cover"
                      alt={script.user.displayName}
                      src={script.user.photoURL}
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  </div>
                  <h1 className="font-medium">{script.user.displayName}</h1>
                </div>
              </Link>
              <p className="text-gray-600 text-xs my-1">
                {script.user.description && script.user.description}
              </p>
            </div>
            <Comments scriptId={id as string} />
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
