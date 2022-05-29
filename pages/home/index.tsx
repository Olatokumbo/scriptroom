import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import CategoryList from "../../components/CategoryList";
import Layout from "../../components/Layout";
import ScriptCard from "../../components/ScriptCard";
import { Slider } from "../../components/Slider";
import { listScripts, nextListScript } from "../../firebase/scripts";
import useScripts from "../../hooks/useScripts";
import { createClient } from "contentful";

interface IHome {
  data: any[];
}
const Home: NextPage<IHome> = ({ data }) => {
  const { loading, scripts, last, next } = useScripts(
    listScripts,
    undefined,
    undefined,
    nextListScript
  );
  return (
    <>
      <Head>
        <title> Home | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList />
        <div className="max-w-7xl px-4 md:px-3 py-3 m-auto flex flex-col justify-center items-center">
          <Slider images={data} />
          <div className="pt-8 pb-4">
            <h1 className="font-bold text-lg text-slate-600">LATEST</h1>
            <div className="flex justify-center flex-col items-center mx-0 my-2 sm:my-5">
              {loading ? (
                "Loading...."
              ) : scripts.length == 0 ? (
                <h1 className="m-auto text-2xl">No Scripts Available</h1>
              ) : (
                <div className="mb-5 w-full grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                  {scripts.map((script, index) => (
                    <ScriptCard key={script.id} script={script} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            disabled={!last}
            onClick={next}
            className="text-[#36395A] border border-[#36395A] hover:bg-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
            Show More
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59"
  );
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });
  const response = await client.getEntries({
    content_type: "header",
  });
  return {
    props: {
      data: response.items,
    },
  };
};
