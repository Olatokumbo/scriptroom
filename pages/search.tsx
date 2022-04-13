import { useRouter } from "next/router";
import CategoryList from "../components/CategoryList";
import Layout from "../components/Layout";
import ScriptCard from "../components/ScriptCard";
import useAlgoliaSearch from "../hooks/useAlgoliaSearch";

const Search = () => {
  const {
    query: { keyword },
  } = useRouter();
  const { loading, results, notFound } = useAlgoliaSearch(
    "scripts",
    keyword as string
  );

  return (
    <Layout>
      <CategoryList />
      <div className="max-w-[90rem] m-auto ">
        <div className="p-3 h-full w-full flex flex-col justify-center">
          <div className="my-10 m-auto flex items-center">
            <h1 className="text-2xl font-medium mr-2">
              Search for
            </h1>
            <h1 className="text-2xl font-bold text-zinc-600">{`${keyword}`}</h1>
          </div>
          {loading ? (
            <h1 className="m-auto text-2xl">Loading....</h1>
          ) : !notFound ? (
            <div>
              <h1 className="ml-2 font-bold text-lg text-slate-600">RESULTS</h1>
              <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
                <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
                  {results.map((script, index) => (
                    <ScriptCard key={script.objectID} script={script} index={index}/>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h1 className="m-auto text-2xl">Not Found</h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
