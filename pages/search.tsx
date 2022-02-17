import { useRouter } from "next/router";
import CategoryList from "../components/CategoryList";
import Layout from "../components/Layout";

const Search = () => {
  const {
    query: { keyword },
  } = useRouter();

  return (
    <Layout>
      <CategoryList />
      <div className="max-w-[90rem] m-auto ">
        <div className="p-3 w-full h-48 flex flex-col justify-center">
          <h1 className="text-2xl font-medium text-center">
            { `Search for ${keyword}`} 
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
