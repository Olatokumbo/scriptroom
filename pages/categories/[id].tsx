import Head from "next/head";
import Image from "next/image";
import CategoryList from "../../components/CategoryList";
import fs from "fs";
import path from "path";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Navbar from "../../components/Navbar";
import ScriptCard from "../../components/ScriptCard";
import Layout from "../../components/Layout";
import useScripts from "../../hooks/useScripts";
import { scriptsByCategory } from "../../firebase/scripts";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Category = ({
  category,
}: {
  category: { title: string; photoURL: string; color: string };
}) => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, scripts } = useScripts(scriptsByCategory, id as string);

  return (
    <>
      <Head>
        <title>{category.title} | ScriptRoom</title>
      </Head>
      <Layout>
        <CategoryList id={id as string} />
        <div className="max-w-7xl m-auto">
          <div className="flex p-3">
            <div
              className={
                "mr-2 rounded-md hidden sm:block flex-1 " + category.color
              }
            ></div>
            <div className="w-full relative overflow-hidden flex-5 rounded-md">
              <div className="opacity-50 bg-gray-900 absolute left-0 right-0 top-0 bottom-0 rounded-md"></div>
              <div className="absolute p-10 flex h-full w-full">
                <div className="flex-1 flex flex-col justify-center items-start">
                  <h1 className="text-white text-3xl font-semibold">
                    {category.title}
                  </h1>
                </div>
                <div className="flex-none md:flex-1"></div>
              </div>
              <div className="flex-1 relative -z-1 h-40">
                <Image
                  src={category.photoURL}
                  className="object-cover"
                  layout="fill"
                  loading="eager"
                  crossOrigin="anonymous"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="p-2">
            <h1 className="ml-2 font-bold text-lg text-slate-600">TOP RATED</h1>
            <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
              {loading ? (
                "Loading...."
              ) : scripts.length == 0 ? (
                <h1 className="m-auto text-2xl">No Scripts Found Here</h1>
              ) : (
                <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                  {scripts.map((script) => (
                    <ScriptCard key={script.id} script={script} />
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

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), "utils", "category.json");
  let file = fs.readFileSync(filePath, "utf-8");
  let fileData: [] = JSON.parse(file);
  let paths = fileData.map((data: { id: string }) => ({
    params: { id: data.id },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const filePath = path.join(process.cwd(), "utils", "category.json");
  let file = fs.readFileSync(filePath, "utf-8");
  let fileData: [] = JSON.parse(file);
  const category = fileData.filter((data: { id: string }) => data.id === id)[0];
  return {
    props: {
      category,
    },
  };
};
