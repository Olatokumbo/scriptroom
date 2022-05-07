import { NextPage } from "next";
import Head from "next/head";
import CategoryList from "../../components/CategoryList";
import Layout from "../../components/Layout";
import ScriptCard from "../../components/ScriptCard";
import Slider from "../../components/Slider";
import { listScripts } from "../../firebase/scripts";
import useScripts from "../../hooks/useScripts";

const Home: NextPage = () => {
  const { loading, scripts } = useScripts(listScripts);
  return (
    <>
      <Head>
        <title> Home | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList />
        <div className="max-w-7xl px-4 md:px-3 py-3 m-auto">
          <Slider />
          <div className="pt-8 pb-4">
            <h1 className="font-bold text-lg text-slate-600">LATEST</h1>
            <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
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
        </div>
      </Layout>
    </>
  );
};

export default Home;
