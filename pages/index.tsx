import type { NextPage } from "next";
import Link from "next/link";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import ScriptCard from "../components/ScriptCard";

const Home: NextPage = () => {
  return (
    <Layout>
      <CategoryList />
      <div className="max-w-[90rem] m-auto">
        <div className="flex flex-1">
          <div className="p-16 px-10 flex-1">
            <img
              src="/logo.png"
              className="h-32 mr-5 w-auto"
              alt="headerImages"
            />
            <h1 className="my-4 text-lg">
              Your one stop marketplace to find scripts of all types and genres
            </h1>
            <h1 className="text-gray-800 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h1>
            <Link href="/signin" passHref>
              <button className="my-10 px-5 py-3 rounded-md bg-[#36395A]  hover:bg-slate-800 text-white font-normal uppercase focus:outline-none">
                Get Started
              </button>
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            <img
              src="/images/pattern2.jpg"
              className="h-full w-full object-cover"
              alt="headerImages"
            />
          </div>
        </div>
        <div className="p-2">
          <h1 className="ml-2 font-bold text-lg text-slate-600">TOP RATED</h1>
          <div className="flex justify-center flex-col items-center  mx-0 my-2 sm:my-5">
            <div className="mb-5 w-full px-2 grid gap-x-2 gap-y-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
              <ScriptCard />
              <ScriptCard />
              <ScriptCard />
              <ScriptCard />
              <ScriptCard />
              <ScriptCard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
