import Head from "next/head";
import CategoryList from "../../components/CategoryList";
import Layout from "../../components/Layout";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { scriptById } from "../../firebase/scripts";
import { ParsedUrlQuery } from "querystring";
import { IScript } from "../../interfaces/script.interface";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IScriptInfo {
  script: IScript;
}

const ScriptInfo: NextPage<IScriptInfo> = ({ script }) => {
  const viewPdf = () => {
    // const data = functions.httpsCallable("getPdfUrl");
    // data()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => console.log(e.message));
  };

  return (
    <>
      <Head>
        <title>Script | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList />
        <div className="flex p-3 flex-col md:flex-row max-w-6xl m-auto">
          <div className="flex-3 bg-neutral-50 p-3 md:p-8 m-0 md:m-5  rounded-md">
            <img
              className="h-32 object-cover w-full rounded-t-md"
              src={script?.posterURL}
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
          <div className="flex-2 bg-neutral-50 my-5 rounded-md p-5 h-fit">
            <h1 className="font-semibold text-[#36395A]">About the Author</h1>
            <Link href="/profile/123">
              <div className="flex flex-col items-center my-2">
                <img
                  src="/images/profile.jpg"
                  className="w-20 h-20 object-cover rounded-full"
                />
                <h1 className="font-medium">david0</h1>
              </div>
            </Link>
            <p className="text-gray-600 text-sm my-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ScriptInfo;

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  };
};
